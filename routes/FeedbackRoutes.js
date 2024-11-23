import {
  createAdmin,
  createTeacher,
  createStudent,
  getAllUsers,
} from "../controllers/userController.js";
import {
  createSubject,
  getSubject,
} from "../controllers/SubjectController.js";
import {
  createPractical,
  getAllPractical,
} from "../controllers/PracticalController.js";
import { EnrollPractical } from "../controllers/EnrollController.js";
import express from "express";
import { isAdmin } from "../middleware/Middleware.js";
import { isTeacher } from "../middleware/Middleware.js";



const router = express.Router();

router.post("/admin/create", createAdmin);
router.post("/Teacher/create", createTeacher);
router.post("/student/create", createStudent);
router.post("/subejct/create", isAdmin, createSubject);
router.post("/practical/create",isTeacher, createPractical);
router.post("/enroll/add", EnrollPractical);
router.get("/user/get", getAllUsers);
router.get("/subject/get", getSubject);

export default router;
