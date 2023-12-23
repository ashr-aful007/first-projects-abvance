import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.Service";





const careateAcademicDepartment = catchAsync(async(req, res) =>{

        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
          req.body
        )
        
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic Department is created successfuly',
          data: result
        })
})


const getAllDepartments = catchAsync(async(req, res) =>{
     const result = await AcademicDepartmentServices.getAllDepartmentFromDB()

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'All Academic Department retrive successfuly',
          data: result
        })
})


const getSingleDepartment = catchAsync(async(req, res) =>{

       const {departmentId} = req.params

      const result = await AcademicDepartmentServices.getSingleDepartmentFromDB(departmentId)

      sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic Department is retrived successfully',
          data: result
      })
})


const updateDepartment = catchAsync(async(req, res) =>{
       const {departmentId} = req.params
       const facultyData = req.body


       const result = await AcademicDepartmentServices.updateDepartmentIntoDB(departmentId, facultyData)

       sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic Department retrived successfully',
          data: result
      })
})



export const AcademicDepartmentControllers = {
      careateAcademicDepartment,
      getAllDepartments,
      getSingleDepartment,
      updateDepartment
}