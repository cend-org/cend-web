import {
    PagesStudentAbout,
    PagesStudentAcademicCourse,
    PagesStudentAcademicLevel, PagesStudentCoursePreference, PagesStudentDisponibility,
    PagesStudentEmail,
    PagesStudentPassword
} from "#components";
import type {ComponentOptionsMixin, DefineComponent, PublicProps} from "@vue/runtime-core";

interface IRegistrationFlow {
 component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {} >,
}

export const registrationFlow: Array<Array<IRegistrationFlow>> = [
    [
        {component: PagesStudentEmail},
        {component: PagesStudentPassword},
        {component: PagesStudentAbout},
        {component: PagesStudentAcademicLevel},
        {component: PagesStudentAcademicCourse},
        {component: PagesStudentCoursePreference},
        {component: PagesStudentDisponibility},
    ],
]