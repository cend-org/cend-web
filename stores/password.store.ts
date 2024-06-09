import { environment } from "~/scripts/environment";
import { LocalStorageGetItem } from "~/scripts/local-storage";

export const passwordStore = defineStore('password', () => {

    const setPassword = async (_password: string) => {
    useGqlToken({
        token: `${LocalStorageGetItem(environment.auth_token)}`,
        config: {
            type: 'Bearer',
            name: 'Authorization'
        }
    });
        const { NewPassword: password } =  await GqlNewPassword({password:{Hash: _password}});
    }
    return {
        setPassword
}})