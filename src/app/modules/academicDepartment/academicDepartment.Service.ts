import { AcademicDepartment } from "./academicDepartment.Model"
import { TAcademicDepartment } from "./academicDepartment.interface"




//this route for create Faculty
const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) =>{

      const result = await AcademicDepartment.create(payload)
      return result
}

//this route for find faculty
const getAllDepartmentFromDB = async() =>{
      const result = await AcademicDepartment.find().populate('academicfaculty')
      return result
}

//this route for find single faculty
const getSingleDepartmentFromDB = async(id: string) =>{
      const result = await AcademicDepartment.findById(id).populate('academicfaculty');
      return result
}

//this route for update single faculty
const updateDepartmentIntoDB = async(id: string, payload: Partial<TAcademicDepartment>) =>{
     const result = await AcademicDepartment.findByIdAndUpdate({_id:
           id}, payload, {
               new: true
           })
           return result
}



export const AcademicDepartmentServices = {
     createAcademicDepartmentIntoDB,
      getAllDepartmentFromDB,
      getSingleDepartmentFromDB,
      updateDepartmentIntoDB

}