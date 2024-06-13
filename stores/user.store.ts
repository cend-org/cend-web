import {useLocalStorage} from "@vueuse/core";

export const userStore = defineStore('user', () => {
    const RT = useLocalStorage('RT', 0)
    let A_LVL = useLocalStorage("A_LVL", 0)

    const type = computed(() => {
        switch (RT.value){
            case 0: return "étudiant"
            case 1: return "parent"
            case 2: return "tuteur"
            case 3: return "professeur"
            default:  return "étudiant"
        }
    })

    const configure = function (rt: number) {
        if (isNaN(RT.value)) RT.value = 0
        RT.value = rt
    }

    const createPassword = async (password: string) => {
        const { NewPassword: P } = await GqlNewPassword(
                {
                            password: {Hash: password}
                        }
                    )
        return P
    }

    const createProfile = async (name: string, lastname: string, lang: number, sex: number, birthdate: Date) =>{
        const {UpdateMyProfile: U} = await GqlUpdateMyProfile (
            {
                profile: 
                    {
                        Name: name, 
                        FamilyName: 
                        lastname, 
                        Lang: lang, 
                        Sex: sex, 
                        BirthDate: birthdate
                    }
                }
            )
        return U
    }

    const getAcademicLevels = async () => {
        const { AcademicLevels: A } = await GqlAcademicLevels();
        return A;
    }

    const setAcademicLevel = async (id: number) => {
       
        const { SetUserAcademicLevel: A } =  await GqlSetUserAcademicLevel({academicLevelId: id});
        A_LVL.value = id;
        return A;

    };

    const getAcademicSubject = async () => {
        const { AcademicCourses: AC } =  await GqlAcademicCourses({academicLevelId: A_LVL.value});
        return AC;

    };

    const setStudentAcademicSubject = async (courses: Array<any>) => {
        const { NewUserAcademicCourses: NA } =  await GqlNewUserAcademicCourses({courses: courses});
        return NA;

    };

    const setStudentCoursePreference = async (preference: boolean) => {
        const { UpdAcademicCoursePreference: CP } =  await GqlUpdAcademicCoursePreference({coursesPreferences: {IsOnline: preference}});
        return CP;

    };

    return {
        type,
        configure,
        createPassword,
        createProfile, 
        getAcademicLevels, 
        setAcademicLevel, 
        getAcademicSubject, 
        setStudentAcademicSubject, 
        setStudentCoursePreference
    }
})