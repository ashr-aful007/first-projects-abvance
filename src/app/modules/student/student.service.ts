import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'

//get all student
const getSllStudentsFromDb = async () => {
  const result = await Student.find()
  return result
}

//get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

//delete student from db
const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession()
  try{

      session.startTransaction()

    //delete student 
      const deleteStudent = await Student.findOneAndUpdate(
        {id},
        {isDeleted: true},
        {new: true, session},);      
         
        if(!deleteStudent){
            throw new AppError(httpStatus.BAD_REQUEST,'Faild to delete student')
        }

      //delete user 
       const deleteUser = await User.findOneAndUpdate(
         {id},
         {isDeleted: true},
         {new: true, session}
       );


       if(!deleteUser){
          throw new AppError(httpStatus.BAD_REQUEST,'Faild to delete user')
       }


       await session.commitTransaction()
       await session.endSession()

      return deleteStudent
  }catch(err){
      await session.abortTransaction()
      await session.endSession()
      throw new Error('Faild to delete user')
  }

}


const updateStudentIntoDB = async(id: string, payload: Partial<TStudent>) =>{
     const {name, guardian, localGuardian, ...remainingStudentData} = payload;

     const modifiedUpateData: Record<string, unknown> ={
        ...remainingStudentData
     }

     if(name && Object.keys(name).length){
       for(const [key, value] of Object.entries(name)){
         modifiedUpateData[`name.${key}`] = value;
         
       }
     }
     if(guardian && Object.keys(guardian).length){
       for(const [key, value] of Object.entries(guardian)){
         modifiedUpateData[`guardian.${key}`] = value;
         
       }
     }
     if(localGuardian && Object.keys(localGuardian).length){
       for(const [key, value] of Object.entries(localGuardian)){
         modifiedUpateData[`localGuardian.${key}`] = value;  
       }
     }

     /**
      * guardain: {
      *  fatherOccupation: "Teacher"
      *  
      *  fuardian.fatherOccupation = Teacher
      *  name.firstName = 
      *  
      * }
      */

     const result = await Student.findOneAndUpdate({id}, modifiedUpateData,
       {new: true, runValidators: true}
      );
     return result
}

export const StudentServices = {
  getSllStudentsFromDb,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
}
