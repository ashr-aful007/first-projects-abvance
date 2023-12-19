import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemsterValidations } from './academicSemester.validation'


const router = express.Router()


router.post('/create-academic-semester',
     validateRequest(AcademicSemsterValidations
                      .createAcademicSemesterValidation),
 AcademicSemesterControllers.createAcademicSemester)







export const AcademicSemesterRouts = router 