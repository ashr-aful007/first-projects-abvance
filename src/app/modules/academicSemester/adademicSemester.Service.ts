
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSemesterData = async(_id: string, payload: TAcademicSemester) =>{

      if(   payload.name &&
            payload.code &&
            academicSemesterNameCodeMapper[payload.name] !== payload.code)
            {
            throw new Error('Invalid Semester Code')
       }

      const result = await AcademicSemester.findByIdAndUpdate(_id, payload, {new: true})
      return result
}






export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getSingleSemester,
  updateSemesterData
}
