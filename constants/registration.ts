import {
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
    PagesAuthParentStudent


} from "#components";
import type {ComponentOptionsMixin, DefineComponent, PublicProps} from "@vue/runtime-core";

interface IRegistrationFlow {
 component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {} >,
}

export const registrationFlow: Array<Array<IRegistrationFlow>> = [
    [
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
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
        {component:  PagesAuthParentStudent},
        
    ], // for parent
    [
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