import express from "express";
import { getstudentdetails, student_details_verification, studentregistration } from "../controllers/student.controller.js";

const router=express.Router();

router.post("/studentregistration",studentregistration);

router.post("/studentdetailsverification",student_details_verification);

router.post("/getstudentdetails",getstudentdetails);

export default router;