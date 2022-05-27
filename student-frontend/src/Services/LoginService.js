import axios from "axios";
const BACKEND_LINK="http://localhost:8080/admin"

class LoginService
{
    findAdmin(username)
    {
        return axios.get(BACKEND_LINK+"/findAdmin/"+username);
    }

    changePassword(adminId,oldP,newP)
    {
        return axios.put(BACKEND_LINK+"/changePassword/"+adminId+"/"+oldP+"/"+newP);
    }
}
export default new LoginService();