import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, Username } from './student/student.interface';
import validator from 'validator';

const userNameSchema = new Schema<Username>({
     firstName: {
         type: String,
         required: [true, 'First Name is required'],
         maxlength: [20, 'FirstName can not be more than 20 characters'],
         validate: function(value: string){
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
            return firstNameStr === value;
         },
         message: '{VALUE} is not in capitalize format',
     },
     middleName: {
         type: String,
         trim: true
     },
     lastName: {
         type: String,
         required: [true, 'Last Name is required'],
         validate:{
            validator: (value: string) =>validator.isAlpha(value),
            message: '{VALUE} is not valid'
         },
         trim: true
     },
 });
 
 const guardianSchema = new Schema<Guardian>({
     fatherOccupation: {
         type: String,
         required: [true, 'Father Occupation is required'],
         trim: true
     },
     fatherContactNo: {
         type: String,
         required: [true, 'Father Contact Number is required'],
     },
     motherName: {
         type: String,
         required: [true, 'Mother Name is required'],
         trim: true
     },
     motherOccupation: {
         type: String,
         required: [true, 'Mother Occupation is required'],
         trim: true
     },
     motherContactNo: {
         type: String,
         required: [true, 'Mother Contact Number is required'],
         trim: true
     },
     fatherName: {
         type: String,
         required: [true, 'Father Name is required'],
         trim: true
     },
 });
 
 const localGuardianSchema = new Schema<LocalGuardian>({
     name: {
         type: String,
         required: [true, 'Local Guardian Name is required'],
         trim: true
     },
     occupation: {
         type: String,
         required: [true, 'Local Guardian Occupation is required'],
         trim: true
     },
     contactNo: {
         type: String,
         required: [true, 'Local Guardian Contact Number is required'],
         trim: true
     },
     address: {
         type: String,
         required: [true, 'Local Guardian Address is required'],
         trim: true
     },
 });
 
 const studentSchema = new Schema<Student>({
     id: { type: String, unique: true },
     name: {
         type: userNameSchema,
         required: [true, 'Student Name is required'],
         trim: true
     },
     gender: {
         type: String,
         enum: {
             values: ['male', 'female', 'other'],
             message: "The gender field can only be one of the following: 'male', 'female', or 'other'",
         },
         required: [true, 'Gender is required'],
     },
     dateOfBirth: {
         type: String,
     },
     email: {
         type: String,
         required: [true, 'Email is required'],
         trim: true,
         unique: true,
         validate:{
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email type'
         }
     },
     contactNo: {
         type: String,
         required: [true, 'Contact Number is required'],
     },
     bloodGroup: {
         type: String,
         enum: ["A+", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
     },
     presentAddres: {
         type: String,
         required: [true, 'Present Address is required'],
     },
     permanentAddres: {
         type: String,
         required: [true, 'Permanent Address is required'],
         trim: true
     },
     guardian: {
         type: guardianSchema,
         required: [true, 'Guardian details are required'],
         trim: true
     },
     localGuardian: {
         type: localGuardianSchema,
         required: [true, 'Local Guardian details are required'],
         trim: true
     },
     profileImg: { type: String },
     isActive: {
         type: String,
         enum: ['active', 'blocked'],
         default: 'active',
     },
 });
 

export  const StudentModel = model<Student>('Student', studentSchema )