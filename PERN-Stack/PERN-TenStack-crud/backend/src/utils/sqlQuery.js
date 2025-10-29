export const createRoleQuery = `
    CREATE TYPE role_type_enum AS ENUM ('Manager', 'Developer', 'Designer', 'QA', 'HR', 'Sales', 'Intern' 'Other');
`

export const createEmployeeTableQuery = `
    CREAT TABLE IF NOT EXISTS employee_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK (age > 17),
        role role_type_enum NOT NULL DEFAULT 'intern',
        salary DECIMAL(10, 2) CHECK (salary >= 0) DEFAULT 0.00 NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`

export const getAllEmployeesQuery = `SELECT * FROM employee_table ORDER BY id ASC`


