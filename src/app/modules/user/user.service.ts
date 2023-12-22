import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { Tuser } from './user.interface'
import { User } from './user.model'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { generateStudentId } from './user.utils'


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

     userData.id = generateStudentId(admissionSemester)
  //create a user
  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    payload.id = newUser.id //embedding
    payload.user = newUser._id //Reference to the user document
    //create a student with Reference with user ID
    const newStudent = await Student.create(payload)

    return newStudent
  }
}

export const UserService = {
  createUserIntoDB,
}
