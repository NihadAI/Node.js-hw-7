import axios from "axios"

export default class UsersService {
    static async register(email: string, password: string, confirmPassword: string) {
        try {
            const response = await axios.post(`http://localhost:8000/auth/register`, {
                email,
                password,
                confirmPassword
              }, 
              {
                withCredentials: true, 
              });
         
            return response
        } catch (error) {
            throw error
        }
    }
    static async login(email: string, password: string) {
        try {
            const response = await axios.post(`http://localhost:8000/auth/login`, {
                email,
                password,
              }, 
              {
                withCredentials: true, 
              });

            return response
        } catch (error) {
            throw error
        }
    }
}