import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'
// import studentValidationSchema from './stidemt.zod.validation'

const getAllStudents = catchAsync(async (req, res, next) => {
  //get student
  const result = await StudentServices.getSllStudentsFromDb()

  res.status(200).json({
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  })
})

//get single user from DB
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)

  res.status(200).json({
    success: true,
    message: 'Studnet is retrieved succesfully',
    data: result,
  })
})

//delete student
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  res.status(200).json({
    success: true,
    message: 'Student is deleted successfuly',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
