import { AcademicFaculty } from "./academicFaculty.Model";
import { TAcademicFaculty } from "./academicFaculty.interface";



//this route for create Faculty
const createAcademicFacultyIntoDB = async(payload: TAcademicFaculty) =>{
        const result = await AcademicFaculty.create(payload)
        return result
}
//this route for find faculty
const getAllAcademicFacultyFromDB = async() =>{
      const result = await AcademicFaculty.find()
      return result
}

//this route for find single faculty
const getSingleAcademicFacultyFromDB = async(id: string) =>{
      const result = await AcademicFaculty.findById(id);
      return result
}

//this route for update single faculty
const updateAcademicFacultyIntoDB = async(id: string, payload: Partial<TAcademicFaculty>) =>{
     const result = await AcademicFaculty.findByIdAndUpdate({_id:
           id}, payload, {
               new: true
           })
           return result
}



export const AcademicFacultyServices = {
     createAcademicFacultyIntoDB,
     getAllAcademicFacultyFromDB,
     getSingleAcademicFacultyFromDB,
     updateAcademicFacultyIntoDB



}