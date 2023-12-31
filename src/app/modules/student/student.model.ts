/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface'
import config from '../../config'


const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, 'FirstName can not be more than 20 characters'],
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
      return firstNameStr === value
    },
    message: '{VALUE} is not in capitalize format',
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
    trim: true,
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
    trim: true,
  },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  password: {
    type: String,
    maxlength: [20, 'password can not be more then 20'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender field can only be one of the following: 'male', 'female', or 'other'",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddres: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddres: {
    type: String,
    required: [true, 'Permanent Address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
    trim: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian details are required'],
    trim: true,
  },
  admissionSemester:{
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester'
  },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})



// pre save middleware/ hook : will work on create()  save()

studentSchema.pre('save', async function (next) {
  try {

    const user = this

    // Check if the password is present and not empty
    if (!user.password) {
      throw new Error('Password is required.');
    }

    // Check if config.bcrypt_salt_rounds is a valid number
    const saltRounds = Number(config.bcrypt_salt_rounds);
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error('Invalid bcrypt salt rounds configuration.');
    }

    // Hash the password and save it into DB
    user.password = await bcrypt.hash(user.password, saltRounds);

    next();
  } catch (error: any) {
    // Handle the error
    next(error);
  }
});

//post save middleware /hook
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

//Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
//middleware for findOne
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
//middleware for aggregate
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
