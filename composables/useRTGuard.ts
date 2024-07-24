import { useLocalStorage } from "@vueuse/core"

export const useRTGuard = () => {
    function apply() {
        const route = useRoute()
        const rt = <string>route.query['RT']
        const RT = useLocalStorage("RT", 0)


        RT.value = parseInt(rt);
        if (!route.query['RT'] || isNaN(parseInt(rt))) {
            // return to dashboard
            navigateTo("/")
        }
        if (![0,1,2,3].includes(parseInt(rt))){
            navigateTo("/")
        }

        const usr = userStore();
        usr.configure(parseInt(<string>route.query['RT']))
    }

    return {
        apply
    }
}