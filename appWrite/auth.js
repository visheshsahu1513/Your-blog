import {Client,Account, ID} from 'appwrite'
import config from '../config/config';

export class AuthService{
    client = new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite:: error logout");
        }
    }

}

const authService = new AuthService()

export default authService;