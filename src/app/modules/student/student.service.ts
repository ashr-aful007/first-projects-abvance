import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

//create student 
const createStudentIntoDB = async(student: Student) =>{
   const result = await StudentModel.create(student)
   return result
}

//get all student 
const getSllStudentsFromDb = async() =>{
   const result = await StudentModel.find()
   return result
}

//get single student
const getSingleStudentFromDB = async(id: string) =>{
   const result = await StudentModel.findOne({id})
   return result
}


export const StudentServices = {
     createStudentIntoDB,
     getSllStudentsFromDb,
     getSingleStudentFromDB
}