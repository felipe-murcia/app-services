import { api } from "../configs/api";
import { IService } from '../interface/IService';

export class FinanceService {

    private apiURL = "";
 
    public async post(data:IService) {
        try {
            const response = await api.post<IService>(`${this.apiURL}`, data)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async get( serviceUrl:string) {
        try {
            const response = await api.get<IService[]>(`${serviceUrl}`)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete( id:string) {
        try {
            console.log(id)
            const response = await api.delete(`/${id}`)
            return await response.data            
        } catch (error) {
            throw error;
        }
    }
    
}