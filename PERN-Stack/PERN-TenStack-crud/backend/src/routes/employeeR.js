import { Router } from "express";
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployeeById, deleteEmployeeById } from "../controller/employeeC.js";

const router = Router();

router.get("/", getAllEmployees)
router.get("/:id", getEmployeeById)
router.post("/", createEmployee)
router.put("/:id", updateEmployeeById)
router.delete("/:id", deleteEmployeeById)


export default router;