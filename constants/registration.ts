import {
    PagesAuthEmail, PagesAuthPassword

} from "#components";
import type {ComponentOptionsMixin, DefineComponent, PublicProps} from "@vue/runtime-core";

interface IRegistrationFlow {
 component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {} >,
}

export const registrationFlow: Array<Array<IRegistrationFlow>> = [
    [
        {component: PagesAuthEmail},
        {component:  PagesAuthPassword}
    ], // for student
    [
        {component: PagesAuthEmail}
    ], // for parent
    [
        {component: PagesAuthEmail}
    ], // for tutor
    [
        {component: PagesAuthEmail}
    ], // for teacher or professor
]