import {environment} from "~/scripts/environment";
import {jwtDecode} from "jwt-decode";
import {useLocalStorage} from "@vueuse/core";

export const buttonManagerStore = defineStore('buttonManagerStore', () => {
     const route  = useRoute()

    const isAuthRoute = computed((): Boolean => {
        return route.path.startsWith("/app/auth/register")? true: false  
    })

    return {
        isAuthRoute,
    }
})