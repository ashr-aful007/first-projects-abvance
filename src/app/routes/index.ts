import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { studentRouts } from '../modules/student/student.route'
import { AcademicSemesterRouts } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultysRoutes } from '../modules/academicFaculty/academicFaculty.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/students',
    router: studentRouts,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRouts,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultysRoutes,
  },
  // {

  // },

]

// router.use('/user', UserRoutes);
// router.use('/students', studentRouts)

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
