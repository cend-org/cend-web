import { jwtDecode } from "jwt-decode";
import { LocalStorageGetItem } from "./local-storage";

export function IsAuthenticated(): boolean{
    let token = LocalStorageGetItem("AuthTkn");
    if(!token){
        return false;
    }
    var decodedToken = jwtDecode(token);
    const expToken = decodedToken.exp;
    if(expToken != null && expToken < Date.now()/1000){
        return false;
    }
    return true;
}