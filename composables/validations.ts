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

    function CheckPasswordComplexity(password: string): number {
        const criteria = [
            { regex: /[a-z]/, weight: 20 }, // Lowercase letters
            { regex: /[A-Z]/, weight: 20 }, // Uppercase letters
            { regex: /\d/, weight: 20 },    // Numbers
            { regex: /[^a-zA-Z0-9]/, weight: 20 }, // Special characters
            { length: 8, weight: 20 }       // Minimum length of 8
        ];
    
        let score = 0;
    
        for (const criterion of criteria) {
            if (criterion.regex && criterion.regex.test(password)) {
                score += criterion.weight;
            } else if (criterion.length && password.length >= criterion.length) {
                score += criterion.weight;
            }
        }
    
        return score;
    }
    
    return {
        checkEmail, checkPasswords, joinWithHyphen, normalizeString, CheckPasswordComplexity
    };

}