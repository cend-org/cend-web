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
    function joinWithHyphen(str1: string, str2: string): string {
        if (!str1 && !str2) {
          return '';
        }
        if (!str1) {
          return str2;
        }
        if (!str2) {
          return str1;
        }
        return `${str1}-${str2}`;
      }
      function normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }
    return {
        checkEmail, checkPasswords, joinWithHyphen, normalizeString
    };

}