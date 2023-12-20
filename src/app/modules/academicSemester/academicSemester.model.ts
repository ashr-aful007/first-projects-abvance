import { Schema, model } from 'mongoose'
import { Months, semesterCode, semesterName } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'

const acdemicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)


//check in DB semester Exist or not 
acdemicSemesterSchema.pre('save', async function(next){
      const isSemesterExists = await AcademicSemester.findOne({
           name: this.name,
           year: this.year
      })

      if(isSemesterExists){
          throw new Error('Semester is already exists')
      }
      next()
})





export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  acdemicSemesterSchema,
)
