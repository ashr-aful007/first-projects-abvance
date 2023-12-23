import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartmentValidation';
import { AcademicDepartmentControllers } from './academicDepartment.controllar';


const router = express.Router()


router.post('/create-department',
    validateRequest(AcademicDepartmentValidation
     .createAcademicDepartmentValidationSchema),
     AcademicDepartmentControllers.careateAcademicDepartment
)


router.get('/all-department', 
     validateRequest(AcademicDepartmentValidation
          .createAcademicDepartmentValidationSchema),
          AcademicDepartmentControllers.getAllDepartments
)


router.get('/:departmentId', 
   validateRequest(AcademicDepartmentValidation
     .createAcademicDepartmentValidationSchema),
     AcademicDepartmentControllers.getSingleDepartment
)


router.patch('/:departmentId',
    validateRequest(AcademicDepartmentValidation
     .updateAcademicDepartmentValidationSchema),
     AcademicDepartmentControllers.updateDepartment
)