import { environment } from "~/scripts/environment";
import { LocalStorageGetItem } from "~/scripts/local-storage";

export const academicStore = defineStore('academic', () => {

    const getAcademicLevels = async () => {
        useGqlToken({
            token: `${LocalStorageGetItem(environment.auth_token)}`,
            config: {
                type: 'Bearer',
                name: 'Authorization'
            }
        });
        const { AcademicLevels: academicLevels } =  await GqlAcademicLevels();
        return academicLevels;

    }

    const setStudentAcademicLevels = async (id: number) => {
        useGqlToken({
            token: `${LocalStorageGetItem(environment.auth_token)}`,
            config: {
                type: 'Bearer',
                name: 'Authorization'
            }
        });
        const { SetUserAcademicLevel: academicLevels } =  await GqlSetUserAcademicLevel({academicLevelId: id});
        return academicLevels;

    };

    const getAcademicCourse = async (id: number) => {
        useGqlToken({
            token: `${LocalStorageGetItem(environment.auth_token)}`,
            config: {
                type: 'Bearer',
                name: 'Authorization'
            }
        });
        const { AcademicCourses: academicCourses } =  await GqlAcademicCourses({academicLevelId: id});
        return academicCourses;

    }

    const setStudentAcademicCourse = async (ids: Array<any>) => {
        useGqlToken({
            token: `${LocalStorageGetItem(environment.auth_token)}`,
            config: {
                type: 'Bearer',
                name: 'Authorization'
            }
        });
        const { NewUserAcademicCourses: academicCourses } =  await GqlNewUserAcademicCourses({courses: ids});
        return academicCourses;

    }
    return {
        getAcademicLevels, 
        setStudentAcademicLevels,
        getAcademicCourse, 
        setStudentAcademicCourse
}})