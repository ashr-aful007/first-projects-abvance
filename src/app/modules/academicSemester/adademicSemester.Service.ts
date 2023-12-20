
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

     
     //this block of code check semester name and code are same or not 
     if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
            throw new Error('Invalid Semester Code')
     }

  const result = await AcademicSemester.create(payload)
  return result
}


const getAllAcademicSemester = async() =>{
      const result = await AcademicSemester.find()
      return result
}


const getSingleSemester = async(_id: string) =>{
     const result = await AcademicSemester.findById(_id)
     return result
}






export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getSingleSemester
}
