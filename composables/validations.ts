export function useValidation() {
    function checkEmail(email: string | undefined): boolean {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email){
            return false;
        }
        return re.test(email);
    }

    function checkPasswords(pass: string | undefined, passConfirm: string | undefined): boolean{
        if (!pass || !passConfirm){
            return false;
        }
        if(!pass.trim() || !passConfirm.trim()){
            return false;
        }
        if(pass != passConfirm){
            return false;
        }
        return true;
    }

    return {
        checkEmail, checkPasswords
    };

}