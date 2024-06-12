import {useLocalStorage} from "@vueuse/core";

export const userStore = defineStore('user', () => {
    const RT = useLocalStorage('RT', 0)

    const type = computed(() => {
        switch (RT.value){
            case 0: return "étudiant"
            case 1: return "parent"
            case 2: return "tuteur"
            case 3: return "professeur"
            default:  return "étudiant"
        }
    })

    const configure = function (rt: number) {
        if (isNaN(RT.value)) RT.value = 0
        RT.value = rt
    }

    const createPassword = async (password: string) => {
        const { NewPassword: P } = await GqlNewPassword(
                {
                            password: {Hash: password}
                        }
                    )
        return P
    }

    return {
        type,
        configure,
        createPassword,
    }
})