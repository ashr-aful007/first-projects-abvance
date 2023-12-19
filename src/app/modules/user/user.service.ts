import { NextFunction } from 'express'
import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { Tuser } from './user.interface'
import { User } from './user.model'

//create student
const createUserIntoDB = async (password: string, studentData: TStudent) => {
  //set student role
  const userData: Partial<Tuser> = {}

  //if password is not given, use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'

  //set manually generated id
  userData.id = '202010098'

  //create a user
  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id //embedding
    studentData.user = newUser._id //Reference to the user document

    const newStudent = await Student.create(studentData)

    return newStudent
  }
}

export const UserService = {
  createUserIntoDB,
}
