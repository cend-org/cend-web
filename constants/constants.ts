import type { CourseType } from "~/scripts/entities/course-type";
import type { Langue } from "~/scripts/entities/langue";
import type { Sex } from "~/scripts/entities/sex"

export const signupComponent = [
    {
        title: 'Étudiant',
        href: '/authentications/register/student/email',
        description: 'Créez un compte étudiant pour accéder à des tuteurs professionels.'
    },
    {
        title: 'Parent',
        href: '/authentications/register/parent/email',
        description: 'Créez un compte parent pour suivre et soutenir la progression de votre enfant.'
    },
    {
        title: 'Tuteur',
        href: '/authentications/register/tutor/email',
        description: 'Devenez tuteur et aidez les étudiants à réussir.'
    },
    {
        title: 'Professeur',
        href: '/authentications/register/teacher/email',
        description: 'Enregistrez-vous en tant que professeur pour soutenir la progression de vos élèves.'
    },
]

export const loginComponent = [
    {
        title: 'Étudiant',
        href: '/authentications/login?label=student',
        description: 'Accédez à votre espace étudiant en vous connectant ici.'
    },
    {
        title: 'Parent',
        href: '/authentications/login?label=parent',
        description: 'Connectez-vous à votre compte parent pour suivre la progression de votre enfant.'
    },
    {
        title: 'Tuteur',
        href: '/authentications/login?label=tutor',
        description: 'Connectez-vous à votre compte tuteur pour gérer vos cours.'
    },
    {
        title: 'Professeur',
        href: '/authentications/login?label=teacher',
        description: 'Identifiez-vous en tant que professeur pour suivre vos élèves.'
    },
]

export const aboutComponent  = [
    {
        title: 'Qui sommes-nous ?',
        href: '/static/about#section-1',
        description: "Découvrez l'histoire et l'équipe derrière CEND."
    },
    {
        title: 'Notre mission',
        href: '/static/about#section-2',
        description: 'Apprenez notre engagement et nos objectifs pour l\'avenir.'
    },
    {
        title: 'Les points forts de CEND',
        href: '/static/about#section-3',
        description: 'Explorez les avantages et les atouts uniques de CEND.'
    },
    {
        title: 'Comment ça marche ?',
        href: '/static/about#section-4',
        description: 'Comprenez le fonctionnement de nos services en quelques étapes simples.'
    },
];

export const sexComponent: Array<Sex> = [
    {
        label: "Homme", 
        value: "0"
    }, 
    {
        label: "Femme", 
        value: "1"
    }, 
    {
        label: "Autre", 
        value: "2"
    }
];

export const langueComponent: Array<Langue> = [
    {
        label: "Français CA", 
        value: "0", 
        default: 'par défaut',

    }, 
    {
        label: "Français FR", 
        value: "1", 
        default: '',
    }, 
    {
        label: "Anglais EN", 
        value: "2", 
        default: '',
    }
];

export const studentTypeComponent: Array<CourseType> = [
    {
        label: "En ligne", 
        value: true, 
        description: 'Economique, rapide, certains d\'avoir le meilleur tuteur pour vous',

    }, 
    {
        label: "Présentiel", 
        value: false, 
        description: "Option prémium, séléction plus limitee de candidat"
    }, 
]