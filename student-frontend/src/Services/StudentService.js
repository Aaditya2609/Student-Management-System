import axios from "axios";
const BACKEND_LINK="http://localhost:8080/student"

class StudentService
{
    addStudent(student)
    {
        return axios.post(BACKEND_LINK+"/register",student);
    }

    updateStudent(id,student)
    {
        return axios.put(BACKEND_LINK+"/update/"+id,student);
    }

    updateSemResult(id,sem,result)
    {
        return axios.put(BACKEND_LINK+"/updateSemResult/"+id+"/"+sem+"/"+result);
    }
    
    getById(id)
    {
        return axios.get(BACKEND_LINK+"/search/"+id);
    }

    getByName(name)
    {
        return axios.get(BACKEND_LINK+"/searchByName/"+name);
    }

    getBySemester(semester)
    {
        return axios.get(BACKEND_LINK+"/searchBySemester/"+semester);
    }

    deleteById(id)
    {
        return axios.delete(BACKEND_LINK+"/delete/"+id);
    }
}
export default new StudentService();