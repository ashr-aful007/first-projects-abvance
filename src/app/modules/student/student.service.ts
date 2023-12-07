import { Student } from '../student.model'
import { TStudent } from './student.interface'



//create student
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) //static method
if( await Student.isUserExists(studentData.id)){
   throw new Error('User already exists!')
}

 const student = new Student(studentData) //create an instance

  //check user exist or not
//   if (await student.isUserExists(studentData.id)) {
//     throw new Error('User already exists!')
//   }

  const result = await student.save() //built in instance method
  return result
}

//get all student
const getSllStudentsFromDb = async () => {
  const result = await Student.find()
  return result
}

//get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
  return result
}

//delete student from db
const deleteStudentFromDB = async(id: string) =>{
   const result = await Student.updateOne({id}, {isDeleted: true});
   return result;
}



export const StudentServices = {
  createStudentIntoDB,
  getSllStudentsFromDb,
  getSingleStudentFromDB,
  deleteStudentFromDB
}
