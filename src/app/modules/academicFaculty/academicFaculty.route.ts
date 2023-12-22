import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicValidation';


const router = express.Router();



router.post('/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty
)

router.get('/get-all-faculty', 
    validateRequest(AcademicFacultyValidation
    .createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.getAllAcademicFacultys
)

router.get('/:facultyId', 
        AcademicFacultyControllers.getSingleAcademicFaculty
)

router.put('/:facultyId',
     validateRequest(AcademicFacultyValidation
    .updateAcademicFacultyValidationSchema),
     AcademicFacultyControllers.updateAcademicFaculty
    )


export const AcademicFacultysRoutes = router;