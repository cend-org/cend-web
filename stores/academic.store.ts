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
    return {
        getAcademicLevels
}})