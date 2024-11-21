import axios from 'axios';

class UserService{
    static BASE_URL = 'http://localhost:8082';

    static async login(email, password){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
                email,
                password
            });
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async userRegister(userData){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/userRegister`, userData);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


    static async getAllUsers(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/adminowner/get-all-users`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


    
    static async getMyProfile(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/anyuser/getMyProfile`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/anyuser/get-user/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/adminowner/delete/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/anyuser/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    

    static logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
     
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token');
        return !!token;
    }

    
    static isUser(){
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static userType(){
        const role = localStorage.getItem('role');
        return role;
    }


   
}

export default UserService;