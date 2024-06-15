import { useLocalStorage } from "@vueuse/core";
import { environment } from "~/scripts/environment";

export const userStore = defineStore('user', () => {
    const authStore = authenticationStore();
    const RT = useLocalStorage('RT', 0)
    let A_LVL = useLocalStorage("A_LVL", 0)
    let A_LVL_NAME = useLocalStorage('A_LVL_NAME', '')
    let A_SUBJ = useLocalStorage('A_SUBJ', '')
    let TUT = useLocalStorage("TUT", '')
    let PRF_STD = useLocalStorage('PRF_STD', false);

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
        if (RT.value == 0 || RT.value == 1) { //cas Etudiant
            const { SetUserAcademicLevel: A } = await GqlSetUserAcademicLevel({ academicLevelId: id });
            A_LVL.value = id;
            A_LVL_NAME.value = level.value.Id;
            return A;
        }

        if (RT.value == 2 || RT.value == 3) { //cas Tuteur
            const { NewUserAcademicLevels: A } = await GqlNewUserAcademicLevels({ academicLevelIds: id });
            A_LVL.value = id;
            A_LVL_NAME.value = level.join(', ');
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
            const { NewStudentAcademicCoursesByParent: NA } = await GqlNewStudentAcademicCoursesByParent({ courses: courses, studentId: studentId });
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
            const { UpdStudentAcademicCoursesPreferenceByParent: CP } = await GqlUpdStudentAcademicCoursesPreferenceByParent({ coursesPreferences: { IsOnline: preference }, studentId: studentId });
            return CP;

        } else {
            const { UpdAcademicCoursePreference: CP } = await GqlUpdAcademicCoursePreference({ coursesPreferences: { IsOnline: preference } });
            return CP;
        }


    };

    const createStudentDisponibility = async (date: Date) => {
        const { NewUserAppointment: DISPO } = await GqlNewUserAppointment({ availability: { Availability: date } });
        return DISPO;

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

    const acceptTutorStudent = async () => {
        const { NewStudentTutor: RES } = await GqlNewStudentTutor({ tutorId: parseInt(TUT.value) });
        return RES;
    };
    const getProfileImage = async () => {
        const { UserProfileImage: PRI } = await GqlUserProfileImage({ tutorId: parseInt(TUT.value) });
        return PRI;
    };
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
        createStudentDisponibility,
        getSuggestedTutor,
        getNewSuggestedTutor,
        acceptTutorStudent,
        getProfileImage,
        getProfileVideo,
        uploadFile,
        createProfileDescription, 
        searchStudent, 
        selectStudent, 
        hasSelectedStudent
    }
})