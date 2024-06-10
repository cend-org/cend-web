import {LocalStorageGetItem, LocalStorageremoveItem, LocalStorageSetItem} from "~/scripts/local-storage";
import {environment} from "~/scripts/environment";
import {jwtDecode} from "jwt-decode";

export const authenticationStore = defineStore('authentication', () => {
    const status = ref<Boolean>(false)

    const connected = computed((): Boolean => {
        let token = LocalStorageGetItem(environment.auth_token)

        if (!token || token === "") status.value = false

        if (status.value ){
            try {
                const decodedToken = jwtDecode(token!);
                const expToken = decodedToken.exp;
                if (expToken != null && expToken < Date.now() / 1000) {
                    return false;
                }
            } catch (e) {
                console.log(token)
                console.log(e)
            }
        }

        return status.value
    })

    const authenticate = async (email: string) => {
        const { NewStudent: student } =  await GqlNewStudent({email: email})
        LocalStorageSetItem(environment.auth_token, student?.T);
        status.value = true
    }

    const logout = () => {
        LocalStorageremoveItem(environment.auth_token)
        status.value = false
    }

    const updateProfile = async(name: string, familyname: string) =>{
        const { UpdateMyProfile: profile } =  await GqlUpdateMyProfile({profile: {Name: name, FamilyName: familyname}});
    }

    return {
        status,
        connected,
        authenticate,
        logout,
        updateProfile,
    }
})