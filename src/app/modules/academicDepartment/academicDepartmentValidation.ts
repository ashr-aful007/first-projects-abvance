import{z} from 'zod'


const createAcademicDepartmentValidationSchema = z.object({
      body: z.object({
          name: z.string({
               invalid_type_error: 'Department name must be string',
               required_error: 'Name is required'
          }),
          academicfaculty: z.string({
               invalid_type_error: 'Department id must be string',
               required_error: 'Academic Department is requried'
          })
      })
})

const updateAcademicDepartmentValidationSchema = z.object({
      body: z.object({
          name: z.string({
               invalid_type_error: 'Department name must be string',
               required_error: 'Name is required'
          }).optional(),
          academicfaculty: z.string({
               invalid_type_error: 'Department id must be string',
               required_error: 'Academic Department is requried'
          }).optional()
      })
})


export const AcademicDepartmentValidation = {
     createAcademicDepartmentValidationSchema,
     updateAcademicDepartmentValidationSchema,

}