import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { studentRouts } from '../modules/student/student.route'
import { AcademicSemesterRouts } from '../modules/academicSemester/academicSemester.route'

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
]

// router.use('/user', UserRoutes);
// router.use('/students', studentRouts)

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
