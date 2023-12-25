import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { Tuser } from './user.interface'
import { User } from './user.model'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'


//create student
const createUserIntoDB = async (password: string, payload: TStudent) => {
  //set student role
  const userData: Partial<Tuser> = {}

  //if password is not given, use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'





   //find academic semseter info 
   const admissionSemester: TAcademicSemester | null = await AcademicSemester.findById(payload.admissionSemester)


   const session = await mongoose.startSession()



   try{
    session.startTransaction()
    //set generated id 
    userData.id = await generateStudentId(admissionSemester)

    //create a user (transaction -1)
    const newUser = await User.create([userData], {session});  //array
  
    if (newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user')

    }

      payload.id = newUser[0].id //embedding
      payload.user = newUser[0]._id //Reference to the user document

      //create a student with Reference with user ID (transaction -2)
      const newStudent = await Student.create([payload], {session})

      if(!newStudent){
          throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student')
      }

      await session.commitTransaction()
      await session.endSession()
  
      return newStudent

   }catch(err){
      await session.abortTransaction();
      await session.endSession()
      throw new Error('Faild to create student')
   }




  }


export const UserService = {
  createUserIntoDB,
}
