import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { LocalStorageGetItem } from '~/scripts/local-storage';
export const useAuthStore = defineStore('auth', ()=> {

    let isAuthenticated = computed(() => {
        // let token = LocalStorageGetItem("AuthTkn");
        // if(!token){
        //     return false;
        // }
        // var decodedToken = jwtDecode(token);
        // const expToken = decodedToken.exp;
        // if(expToken != null && expToken < Date.now()/1000){
        //     return false;
        // }
        
        return false;
    })
    return { isAuthenticated }
  })