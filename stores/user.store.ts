import { useLocalStorage } from "@vueuse/core";
import { environment } from "~/scripts/environment";

export const userStore = defineStore('user', () => {
    const authStore = authenticationStore()

    const RT = useLocalStorage('RT', 0)

    let A_LVL = useLocalStorage("A_LVL", 0)

    let A_LVL_NAME = useLocalStorage('A_LVL_NAME', '')
    let A_SUBJ = useLocalStorage('A_SUBJ', '')
    let TUT = useLocalStorage("TUT", '')
    let TUT_NAME = useLocalStorage("TUT_NAME", '')
    let PRF_STD = useLocalStorage('PRF_STD', false);
    let STD_ID = useLocalStorage("STD_ID", 0);
    let AVAIL_DATA = useLocalStorage("AVAIL_DATA",  '');
    let HAS_TUT = useLocalStorage("HAS_TUT", false);



    const type = computed(() => {
        switch (RT.value) {
            case 0: return "étudiant"
            case 1: return "parent"
            case 2: return "tuteur"
            case 3: return "professeur"
            default: return "étudiant"
        }
    })


    const configure = function (rt: number) {
        if (isNaN(RT.value)) RT.value = 0
        RT.value = rt
    }

    const getCachedData = () =>{
        return {
            academicLevelId: A_LVL.value,
            studentId: STD_ID.value, 
            professorChoseStudent: PRF_STD.value, 
            academicLevelNames: A_LVL_NAME.value, 
            tutorName: TUT_NAME.value, 
            academicCourses: A_SUBJ.value, 
            hasTutor: HAS_TUT.value,
            date: AVAIL_DATA.value,
        }
    }

    const destroyCachedData = () =>{
        console.log("DESTROYING");
        let AP = useLocalStorage("AP", 0);
        A_LVL.value = 0;
        STD_ID.value = 0;
        PRF_STD.value = false;
        A_LVL_NAME.value = "";
        TUT_NAME.value = "";
        A_SUBJ.value = "";
        HAS_TUT.value = false;

    }
    const createPassword = async (password: string) => {
        const { NewPassword: P } = await GqlNewPassword(
            {
                password: { Hash: password }
            }
        )
        return P
    }

    const createProfile = async (name: string, lastname: string, lang: number, sex: number, birthdate: Date) => {
        const { UpdateMyProfile: U } = await GqlUpdateMyProfile(
            {
                profile:
                {
                    Name: name,
                    FamilyName: lastname,
                    Lang: lang,
                    Sex: sex,
                    BirthDate: birthdate,
                }
            }
        )
        return U
    }

    const createProfileDescription = async (profile: string, experience: string, motivation: string) => {
        const { UpdateMyProfile: U } = await GqlUpdateMyProfile(
            {
                profile:
                {
                    Profile: profile,
                    ExperienceDetail: experience,
                    AdditionalDescription: motivation
                }
            }
        )
        return U
    }

    const getAcademicLevels = async () => {
        const { AcademicLevels: A } = await GqlAcademicLevels();
        return A;
    }

    const setAcademicLevel = async (id: any, level?: any) => {
        console.log(id)
        if (RT.value == 0) { //cas Etudiant
            const { SetUserAcademicLevel: A } = await GqlSetUserAcademicLevel({ academicLevelId: id });
            A_LVL.value = id;
            A_LVL_NAME.value = level.Name;
            return A;
        }

        if (RT.value == 2 || RT.value == 3) { //cas Tuteur
            const { NewUserAcademicLevels: A } = await GqlNewUserAcademicLevels({ academicLevelIds: id });
            A_LVL.value = id;
            A_LVL_NAME.value = level.join(', ');
            return A;
        }

        if (RT.value == 1) { //cas Etudiant
            const { SetStudentAcademicLevelByParent: A } = await GqlSetStudentAcademicLevelByParent({academicLevelId: id, studentId: STD_ID.value});
            A_LVL.value = id;
            A_LVL_NAME.value = level.Name;
            return A;
        }
    };


    const getAcademicSubject = async () => {
        if (RT.value == 0 || RT.value == 1) {
            const { AcademicCourses: AC } = await GqlAcademicCourses({ academicLevelId: A_LVL.value });
            return AC;
        }
        if (RT.value == 2 || RT.value == 3) {
            const { MultipleLevelAcademicCourses: AC } = await GqlMultipleLevelAcademicCourses({ academicLevelId: A_LVL.value });
            return AC;
        }
    };

    const setAcademicSubject = async (courses: Array<any>, studentId?: any, courseNames?: Array<string>) => {

        if (RT.value == 1) {
            const { NewStudentAcademicCoursesByParent: NA } = await GqlNewStudentAcademicCoursesByParent({ courses: courses, studentId:  STD_ID.value });
            A_SUBJ.value = courseNames?.join(", ")
            return NA;
        } else {
            const { NewUserAcademicCourses: NA } = await GqlNewUserAcademicCourses({ courses: courses });
            A_SUBJ.value = courseNames?.join(", ")
            return NA;
        }
    };


    const setCoursePreference = async (preference: boolean, studentId?: any) => {
        if (RT.value == 1) {
            const { UpdStudentAcademicCoursesPreferenceByParent: CP } = await GqlUpdStudentAcademicCoursesPreferenceByParent({ coursesPreferences: { IsOnline: preference }, studentId: STD_ID.value });
            return CP;

        } else {
            const { UpdAcademicCoursePreference: CP } = await GqlUpdAcademicCoursePreference({ coursesPreferences: { IsOnline: preference } });
            return CP;
        }


    };

    const createDisponibility = async (date: Date) => {
        AVAIL_DATA.value = date.toDateString();
        if (RT.value == 1) {
            const { NewUserAppointmentByParent: DISPO } = await GqlNewUserAppointmentByParent({ availability: { Availability: date }, studentId: STD_ID.value });
            return DISPO;
        }else{
            const { NewUserAppointment: DISPO } = await GqlNewUserAppointment({ availability: { Availability: date } });
            return DISPO;
        }

    };

    const getSuggestedTutor = async () => {
        const { SuggestTutorToUser: TU } = await GqlSuggestTutorToUser();
        if (TU != null) {
            TUT.value = TU.Id;
        }
        return TU;
    };

    const getNewSuggestedTutor = async () => {
        const { SuggestOtherTutorToUser: TU } = await GqlSuggestOtherTutorToUser({ tutorId: parseInt(TUT.value) });
        if (TU != null) {
            TUT.value = TU.Id;
        }
        return TU;
    };

    const acceptTutor = async (tutor: any) => {
        TUT_NAME.value = `${tutor.Name} ${tutor.FamilyName}`
        HAS_TUT.value = true
        if (RT.value == 1) {
            const { NewStudentTutorByParent: RES } = await GqlNewStudentTutorByParent({ tutorId: parseInt(TUT.value), studentId: STD_ID.value });
            return RES;
        }else{
            const { NewStudentTutor: RES } = await GqlNewStudentTutor({ tutorId: parseInt(TUT.value) });
            return RES;
        }
        
    };
    const getProfileImage = async () => {
        const { UserProfileImage: PRI } = await GqlUserProfileImage({ tutorId: parseInt(TUT.value) });
        return PRI;
    };
    const getProfileImageThumb = async () =>{
        
        const { UserProfileImageThumb: PRI } = await GqlUserProfileImageThumb({ tutorId: parseInt(TUT.value) });
        return PRI;
    }

    const getProfileVideo = async () => {
        const { UserVideoPresentation: PRV } = await GqlUserVideoPresentation({ tutorId: parseInt(TUT.value) });
        return PRV;
    };

    const searchStudent = async (key: string) => {
        const { ProfessorStudent: STD } = await GqlProfessorStudent({name: key });
        return STD;
    };

    const selectStudent = async (id: any)=>{
        const { NewStudentProfessor: STD } = await GqlNewStudentProfessor({studentId: id});
        PRF_STD.value = true;
        return STD;
    }
    const hasSelectedStudent = async (): Promise<boolean> => {
        return PRF_STD.value;
    }

    const createStudent = async (firstname: string, lastname: string) =>{
        const { UserStudent: STD } = await GqlUserStudent({familyName: lastname, name: firstname});
        if(STD){
            STD_ID.value = parseInt(STD.Id);
        }
        
        return STD;
    }

    const createLanguage = async (lang: any) =>{
        const { UpdateStudentProfileByParent: STD } = await GqlUpdateStudentProfileByParent({profile:{Lang: lang.value}, studentId: STD_ID.value});
        return STD;
    }

    const uploadFile = async (formData: FormData) => {
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
            }
        };
        fetch(`${environment.api}${environment.upload_url}`, options);
    }
    return {
        RT,
        type,
        configure,
        createPassword,
        createProfile,
        getAcademicLevels,
        setAcademicLevel,
        getAcademicSubject,
        setAcademicSubject,
        setCoursePreference,
        createDisponibility,
        getSuggestedTutor,
        getNewSuggestedTutor,
        acceptTutor,
        getProfileImage,
        getProfileImageThumb,
        getProfileVideo,
        uploadFile,
        createProfileDescription, 
        searchStudent, 
        selectStudent, 
        hasSelectedStudent, 
        createStudent, 
        createLanguage, 
        getCachedData, 
        destroyCachedData
    }
})