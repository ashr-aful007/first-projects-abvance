import { UserService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

//create student with embed and reffarancing
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student:studentData } = req.body

  //   const zodparseData = studentValidationSchema.parse(studentData)
  const result = await UserService.createUserIntoDB(password, studentData)

  //send success message
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
})

export const userControllers = {
  createStudent,
}
