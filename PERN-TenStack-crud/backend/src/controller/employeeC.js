import { query } from '../config/connectDB.js';
import { createRoleQuery, createEmployeeTableQuery, getAllEmployeesQuery } from '../utils/sqlQuery.js';

// 📤 Helper functions for standardized responses
const responWithMessage = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({ success, message, data });
};

const responWithError = (res, statusCode, message, error = null, contrName = null, data = null) => {
  console.error(`❌ ${contrName ? contrName : "Internal Server Error"} error:`, error?.message || error);
  return res.status(statusCode).json({ success: false, message, error: error?.message || error });
};



// ==========================
// 1️⃣ Get all employees
// ==========================
export const getAllEmployees = async (req, res) => {
  try {
    // ✅ Check if table exists (create if not)
    const checkTable = await query(`SELECT to_regclass('employee_table')`);
    if (!checkTable.rows[0].to_regclass) {
      await query(createRoleQuery);
      await query(createEmployeeTableQuery);
    }

    // ✅ Fetch all employees
    const { rows } = await query(getAllEmployeesQuery);
    responWithMessage(res, 200, true, 'Employees retrieved successfully', rows);
  } catch (error) {
    responWithError(res, 500, 'Failed to retrieve employees', error, 'getAllEmployees');
  }
};



// ==========================
// 2️⃣ Get single employee by ID
// ==========================
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await query(`SELECT * FROM employee_table WHERE id = $1`, [id]);
    if (rows.length === 0) {
      return responWithError(res, 404, 'Employee not found', new Error('Not found'), 'getEmployeeById');
    }

    responWithMessage(res, 200, true, 'Employee retrieved successfully', rows[0]);
  } catch (error) {
    responWithError(res, 500, 'Failed to retrieve employee', error, 'getEmployeeById');
  }
};



// ==========================
// 3️⃣ Create new employee
// ==========================
export const createEmployee = async (req, res) => {
  try {
    const { name, email, age, role, salary } = req.body;

    // ✅ Validate fields
    if (!name || !email || !age || !role || !salary) {
      const msg = `${!name ? 'Name' : ''}${!email ? ' Email' : ''}${!age ? ' Age' : ''}${!role ? ' Role' : ''}${!salary ? ' Salary' : ''} field(s) missing`;
      return responWithError(res, 400, msg, new Error(msg), 'createEmployee');
    }

    // ✅ Insert new record
    const newEmployeeQuery = `
      INSERT INTO employee_table (name, email, age, role, salary)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, email, age, role, salary];
    const { rows } = await query(newEmployeeQuery, values);

    responWithMessage(res, 201, true, 'Employee created successfully', rows[0]);
  } catch (error) {
    responWithError(res, 500, 'Failed to create employee', error, 'createEmployee');
  }
};



// ==========================
// 4️⃣ Update employee by ID
// ==========================
export const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;

    // ✅ Check if employee exists
    const { rows: existing } = await query(`SELECT * FROM employee_table WHERE id = $1`, [id]);
    if (existing.length === 0) {
      return responWithError(res, 404, 'Employee not found', new Error('Not found'), 'updateEmployeeById');
    }

    // ✅ Update fields dynamically (only provided ones)
    const updated = await query(
      `
      UPDATE employee_table
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          age = COALESCE($3, age),
          role = COALESCE($4, role),
          salary = COALESCE($5, salary),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [name, email, age, role, salary, id]
    );

    responWithMessage(res, 200, true, 'Employee updated successfully', updated.rows[0]);
  } catch (error) {
    responWithError(res, 500, 'Failed to update employee', error, 'updateEmployeeById');
  }
};



// ==========================
// 5️⃣ Delete employee by ID
// ==========================
export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: existing } = await query(`SELECT * FROM employee_table WHERE id = $1`, [id]);
    if (existing.length === 0) {
      return responWithError(res, 404, 'Employee not found', new Error('Not found'), 'deleteEmployeeById');
    }

    await query(`DELETE FROM employee_table WHERE id = $1`, [id]);
    responWithMessage(res, 200, true, 'Employee deleted successfully');
  } catch (error) {
    responWithError(res, 500, 'Failed to delete employee', error, 'deleteEmployeeById');
  }
};
