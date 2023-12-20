import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './adademicSemester.Service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  })
})


//get all semester 
const getAllAcadmicSemesterForAdmin = catchAsync(async(req, res) =>{

        const result = await AcademicSemesterServices.getAllAcademicSemester()
        
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'here All academic semester',
          data: result,
        })
})


//get single semester 
const getSingleSemester = catchAsync(async(req, res) =>{

        const {userId} = req.params

      const result = await AcademicSemesterServices.getSingleSemester(userId)

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester data',
        data: result,
      })
})


//updte semester 
const updateSemesterInfo = catchAsync(async(req, res) =>{
      const {userId} = req.params
      const semesterData = req.body
     const result = await AcademicSemesterServices.updateSemesterData(userId, semesterData);

     sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester ware update successfuly',
      data: result,
    })

})




export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcadmicSemesterForAdmin,
  getSingleSemester,
  updateSemesterInfo
}