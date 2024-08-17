import {
    PagesAuthLanguage,
    PagesAuthList,
    PagesAuthEmail, 
    PagesAuthPassword, 
    PagesAuthProfie, 
    PagesAuthAcademicSchool, 
    PagesAuthAcademicSubject, 
    PagesAuthCoursePreference, 
    PagesAuthDisponibility,
    PagesAuthSuggestedTutor,
    PagesAuthCongratulation,
    PagesAuthTutorAcademicSchool,
    PagesAuthTutorAcademicSubject,
    PagesAuthTutorUploadCv,
    PagesAuthTutorUploadPhoto,
    PagesAuthTutorDescriptionProfile,
    PagesAuthTutorUploadVideo,
    PagesAuthTutorCoursePreference,
    PagesAuthTutorRenumeration, 
    PagesAuthTutorConfirmation,
    PagesAuthProfessorUploadPhoto,
    PagesAuthProfessorAcademicSubject,
    PagesAuthProfessorAcademicSchool,
    PagesAuthProfessorSearchStudent,
    PagesAuthProfessorConfirmation,
    PagesAuthParentStudent,
    PagesAuthParentLanguage,
    PagesAuthParentAcademicSchool,
    PagesAuthParentAcademicSubject,
    PagesAuthParentCoursePreference,
    PagesAuthParentDisponibility,
    PagesAuthParentSuggestedTutor,
    PagesAuthParentCongratulation


} from "#components";
import type {ComponentOptionsMixin, DefineComponent, PublicProps} from "@vue/runtime-core";

interface IRegistrationFlow {
 component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {} >,
}

export const registrationFlow: Array<Array<IRegistrationFlow>> = [
    [
        {component: PagesAuthLanguage},
        {component:PagesAuthList},
        {component: PagesAuthEmail},
        {component: PagesAuthPassword},
        {component: PagesAuthProfie},
        {component: PagesAuthAcademicSchool},
        {component: PagesAuthAcademicSubject}, 
        {component: PagesAuthCoursePreference},
        {component: PagesAuthDisponibility},
        {component: PagesAuthSuggestedTutor}, 
        {component: PagesAuthCongratulation}
    ], // for student
    [
        {component: PagesAuthLanguage},
        {component:PagesAuthList},
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
        {component:  PagesAuthParentStudent},
        {component:  PagesAuthParentLanguage},
        {component:  PagesAuthParentAcademicSchool},
        {component:  PagesAuthParentAcademicSubject},
        {component:  PagesAuthParentCoursePreference},
        {component:  PagesAuthParentDisponibility},
        {component:  PagesAuthParentSuggestedTutor},
        {component:  PagesAuthParentCongratulation},
        
    ], // for parent
    [
        {component: PagesAuthLanguage},
        {component:PagesAuthList},
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
        {component: PagesAuthTutorAcademicSchool}, 
        {component: PagesAuthTutorAcademicSubject}, 
        {component: PagesAuthTutorUploadPhoto},
        {component: PagesAuthTutorUploadCv},
        {component: PagesAuthTutorDescriptionProfile},
        {component: PagesAuthTutorUploadVideo},
        {component: PagesAuthTutorCoursePreference}, 
        {component: PagesAuthTutorRenumeration},
        {component: PagesAuthTutorConfirmation},
        
    ], // for tutor
    [
        {component: PagesAuthLanguage},
        {component:PagesAuthList},
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
        {component: PagesAuthProfessorAcademicSchool}, 
        {component: PagesAuthProfessorAcademicSubject}, 
        {component: PagesAuthProfessorUploadPhoto},
        {component: PagesAuthProfessorSearchStudent},
        {component: PagesAuthProfessorConfirmation},
    ], // for teacher or professor
]