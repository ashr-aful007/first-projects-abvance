import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

  // yer semesterCode 4 digits number
 export const generateStudentId = (payload: TAcademicSemester | null) =>{
        const currentId = (0).toString()
        let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

        incrementId = `${payload?.year}${payload?.code}${incrementId}`;

        return incrementId;
}