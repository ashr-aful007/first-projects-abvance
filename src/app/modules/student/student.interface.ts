import { Model } from 'mongoose'
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
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddres: string
  permanentAddres: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'inActive'
}

export type StudentMethod = {
  isUserExists(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>

// schema.method('fullName', function fullName(): string {
//   return this.firstName + ' ' + this.lastName
// })
