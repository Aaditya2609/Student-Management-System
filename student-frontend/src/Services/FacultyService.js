import axios from "axios";
const BACKEND_LINK="http://localhost:8080/faculty"

class FacultyService
{
    addFaculty(faculty)
    {
        return axios.post(BACKEND_LINK+"/addFaculty",faculty);
    }
    findFaculty(id)
    {
        return axios.get(BACKEND_LINK+"/findFaculty/"+id);
    }
    enrollStudent(facultyId,studentId)
    {
        return axios.put(BACKEND_LINK+"/enroll/"+facultyId+"/"+studentId);
    }
    changePassword(facultyId,oldP,newP)
    {
        return axios.put(BACKEND_LINK+"/changePassword/"+facultyId+"/"+oldP+"/"+newP);
    }

}
export default new FacultyService();