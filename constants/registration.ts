import {
    PagesAuthEmail, 
    PagesAuthPassword, 
    PagesAuthProfie, 
    PagesAuthAcademicSchool, 
    PagesAuthAcademicSubject, 
    PagesAuthCoursePreference, 
    PagesAuthDisponibility,

} from "#components";
import type {ComponentOptionsMixin, DefineComponent, PublicProps} from "@vue/runtime-core";

interface IRegistrationFlow {
 component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {} >,
}

export const registrationFlow: Array<Array<IRegistrationFlow>> = [
    [
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
        {component: PagesAuthAcademicSchool},
        {component: PagesAuthAcademicSubject}, 
        {component: PagesAuthCoursePreference},
        {component: PagesAuthDisponibility}
    ], // for student
    [
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
    ], // for parent
    [
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
    ], // for tutor
    [
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword},
        {component:  PagesAuthProfie},
    ], // for teacher or professor
]