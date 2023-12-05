import { Request, Response } from "express"
import { StudentServices } from "./student.service"


const createStudent = async(req: Request, res:Response) =>{
  try{
     const {student: studentData} = req.body
     const result = await StudentServices.createStudentIntoDB(studentData)
     res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
     })
  }catch(error){
     console.log(error);
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