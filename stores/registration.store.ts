import {registrationFlow} from "~/constants/registration";
import {useLocalStorage} from "@vueuse/core";

export const registrationStore = defineStore('registration', () => {

    const RT = useLocalStorage("RT", -1)
    const AP = useLocalStorage("AP", 0)
    const cache = useLocalStorage("registration-cache",0)

    const activePage = computed(() => {
        return AP.value
    })

    const next = function () {
        AP.value += 1
    }

    const compos = computed(()=>{
        const flow = registrationFlow[RT.value]

        if (flow.length <= AP.value) {
            navigateTo("/")
        }

        return flow[AP.value]
    })

    const setCache = (val: number) => {
        if (val > cache.value ){
            cache.value = val
        }
    }

    const configure = function (rt: number) {
        RT.value = rt
    }

    return {
        configure,
        activePage,
        next,
        compos,
        setCache,
        cache,
    }
})