import { Request, Response } from "express"
import { StudentServices } from "./student.service"
import studentValidationSchema from "./student.joi.validation"



const createStudent = async(req: Request, res:Response) =>{
  try{

     const {student: studentData} = req.body

     const {error} = studentValidationSchema.validate(studentData)    
     
     //send message for error 
     if(error){
      res.status(200).json({
        success: false,
        message: 'something went wrong',
        error: error.details
       })
     }
     const result = await StudentServices.createStudentIntoDB(studentData)
     //send success message 
     res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
     })
  }catch(error){
   res.status(200).json({
      success: false,
      message: 'something went wrong',
      data: error,
 })
  }
}


const getAllStudents = async(req:Request , res:Response) =>{
   try{
      const result = await StudentServices.getSllStudentsFromDb()
      res.status(200).json({
         success: true,
         message: 'Student are retrieved successfully',
         data: result,
    })
   }catch(err){
      console.log(err);
   }
}

const getSingleStudent = async(req:Request, res:Response) =>{
    try{
      const {studentId} = req.params
      const result = await StudentServices.getSingleStudentFromDB(studentId)

      res.status(200).json({
         success: true,
         message: 'Studnet is retrieved succesfully',
         data: result,
      })
    }catch(err){
      console.log(err);
    }
}

export const StudentControllers ={
     createStudent,
     getAllStudents,
     getSingleStudent
}