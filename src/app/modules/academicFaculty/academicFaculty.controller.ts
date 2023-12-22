import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.Service";




const createAcademicFaculty = catchAsync(async(req, res) =>{

        const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
          req.body
        )
        
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic Faculty is created successfuly',
          data: result
        })
})


const getAllAcademicFacultys = catchAsync(async(req, res) =>{
     const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'All Academic faculty retrive successfuly',
          data: result
        })
})


const getSingleAcademicFaculty = catchAsync(async(req, res) =>{

       const {facultyId} = req.params

      const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)

      sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic semsters are retrived successfully',
          data: result
      })
})


const updateAcademicFaculty = catchAsync(async(req, res) =>{
       const {facultyId} = req.params
       const facultyData = req.body


       const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, facultyData)

       sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic semsters are retrived successfully',
          data: result
      })
})



export const AcademicFacultyControllers = {
     createAcademicFaculty,
     getAllAcademicFacultys,
     getSingleAcademicFaculty,
     updateAcademicFaculty
}