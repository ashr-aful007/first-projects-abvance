import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, Username } from './student/student.interface';


const userNameSchema = new Schema<Username>({

          firstName:{
               type: String,
               required: true,
          },
          middleName: {
               type: String,
          },
          lastName: {
               type: String,
               required: true,
          }
})

const guardianSchema = new Schema<Guardian>({
     fatherOccupation:{
          type: String,
          required: true
     },
     fatherContactNo:{
          type: String,
          required: true
     },
     motherName:{
          type: String,
          required: true
     },
     motherOccupation:{
          type: String,
          required: true
     },
     motherContactNo:{
          type: String,
          required: true
     },
     fatherName: {
          type: String,
          required: true
     }
})


const localGuardianSchema = new Schema<LocalGuardian>(
     {
          name:{
               type: String,
               required: true
          },
          occupation:{
               type: String,
               required: true
          },
          contactNo:{
               type: String,
               required: true
          },
          address:{
               type: String,
               required: true
          }
     }
)

const studentSchema = new Schema<Student>({
     id:{type: String},
     name: userNameSchema ,
     gender: ["male","female"],
     dateOfBirth: {
          type: String
     },
     email: {
          type: String, required: true
     },
     contactNo: {
          type: String, required: true
     },
     bloodGroup: ["A+", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
     presentAddres: {
          type: String, required: true
     },
     permanentAddres: {
          type: String, required: true
     },
     guardian: guardianSchema,
     localGuardian: localGuardianSchema,


});

export  const StudentModel = model<Student>('Student', studentSchema )