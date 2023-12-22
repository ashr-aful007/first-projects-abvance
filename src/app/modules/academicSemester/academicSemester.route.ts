import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemsterValidations } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemsterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
)
//all semester
router.get('/getAll-semester', AcademicSemesterControllers.getAllAcadmicSemesterForAdmin)

//single semester 
router.get('/:userId', AcademicSemesterControllers.getSingleSemester)
//update semester 
router.patch('/:userId',
    validateRequest(AcademicSemsterValidations
      .updateAcademicSemesterValidationSchema),
 AcademicSemesterControllers.updateSemesterInfo)









export const AcademicSemesterRouts = router
