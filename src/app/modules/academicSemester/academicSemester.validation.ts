import {string, z} from 'zod'
import { Months, semesterCode, semesterName } from './academicSemester.constant'



const createAcademicSemesterValidation = z.object({
     body: z.object({
          name: z.enum([...semesterName] as [string, ...string[]]),
          year: z.string(),
          code: z.enum([...semesterCode] as [string, ...string[]]),
          startMonth: z.enum([...Months] as [string, ...string[]]),
          endMonth: z.enum([...Months] as [string, ...string[]]),
     })
})



export const AcademicSemsterValidations = {
     createAcademicSemesterValidation
}