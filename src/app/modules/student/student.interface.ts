import { Promise } from 'mongodb'
import { Model, Types } from 'mongoose'
//interface for student

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TUsername = {
  firstName: string
  middleName: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  name: TUsername
  user: Types.ObjectId
  password: string
  gender: 'male' | 'female'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddres: string
  permanentAddres: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isDeleted: boolean
}

//for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

//for creating instance

// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>
// }
// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>
// schema.method('fullName', function fullName(): string {
//   return this.firstName + ' ' + this.lastName
// })
