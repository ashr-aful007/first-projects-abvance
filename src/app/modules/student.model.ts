import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUsername,
} from './student/student.interface'
import validator from 'validator'
import bcrypt from 'bcrypt';
import config from '../config';




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
  id: { type: String, unique: true },
   password: { type: String, required:[true, 'Password is required'],
               maxlength:[20, 'password can not be more then 20']},
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
    type: String,
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
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
     type: Boolean,
     default: false
  }
})


// pre save middleware/ hook : will work on create()  save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});


//post save middleware /hook
studentSchema.post('save', function(doc, next){
   doc.password=''
   next()
})

//Query Middleware
studentSchema.pre('find', function(next){
    this.find({isDeleted: {$ne: true}});
    next()
})
//middleware for findOne 
studentSchema.pre('findOne', function(next){
    this.find({isDeleted: {$ne: true}});
    next()
})
//middleware for aggregate 
studentSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
    next()
})


//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};


// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
