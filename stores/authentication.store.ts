import {environment} from "~/scripts/environment";
import {jwtDecode} from "jwt-decode";
import {useLocalStorage} from "@vueuse/core";

export const authenticationStore = defineStore('authentication', () => {
    const token = useLocalStorage(environment.auth_token, "")
    const status = ref<Boolean>(false)
    const RT = useLocalStorage("RT", 0)

    const connected = computed((): Boolean => {
        status.value = !(!token || token.value == "");

        if (status.value){
            try {
                const decodedToken = jwtDecode(token.value!);
                const expToken = decodedToken.exp;
                if (expToken != null && expToken < Date.now() / 1000) {
                    return false;
                }
                useGqlToken({
                    token: `${token}`,
                    config: {
                        type: 'Bearer',
                        name: 'Authorization'
                    }
                });
            } catch (e) {
                console.log(token)
                console.log(e)
            }
        }

        return status.value
    })

    const authenticate = async (email: string) => {
        const type = RT.value
        let Token : {T: string} | null | undefined
        switch (type){
            case 0:
                const { NewStudent: newStudent } =  await GqlNewStudent({email: email})
                Token = newStudent
                break
            case 1:
                const { NewParent: newParent } =  await GqlNewParent({email: email})
                Token = newParent
                break
            case 2:
                const { NewTutor: newTutor } =  await GqlNewTutor({email: email})
                Token = newTutor
                break
            case 3:
                const { NewProfessor: newProfessor } =  await GqlNewProfessor({email: email})
                Token = newProfessor
                break
        }

        token.value = Token?.T
        status.value = true
    }

    const login = async (email: string, password: string) => {
        const { Login } = await GqlLogin({email: email, password: password})
        token.value = Login?.T
        status.value = true
    }

    const logout = () => {
        token.value = null
        status.value = false
    }

    const updateProfile = async(name: string, familyname: string, sex: string, lang: string, birthDate: string) =>{
        const { UpdateMyProfile: profile } =  await GqlUpdateMyProfile({profile: {Name: name, FamilyName: familyname, Sex: parseInt(sex), Lang: parseInt(lang)}});
    }
    const setCoursePreference = async(_coursePreference: boolean) =>{
        const { UpdAcademicCoursePreference: coursePreference } =  await GqlUpdAcademicCoursePreference({coursesPreferences: {IsOnline: _coursePreference}});
    }

    return {
        status,
        connected,
        authenticate,
        logout,
        updateProfile,
        setCoursePreference,
        login,
    }
})