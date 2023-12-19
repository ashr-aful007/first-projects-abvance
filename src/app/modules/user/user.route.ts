import express from 'express'
import { userControllers } from './user.controller'
import { studentValidationSchema } from '../student/stidemt.zod.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

//student create route
router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userControllers.createStudent,
)

export const UserRoutes = router
