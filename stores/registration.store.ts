import {registrationFlow} from "~/constants/registration";

export const registrationStore = defineStore('registration', () => {
    const RT = ref<number>(-1) // RT for registration type ( -1 by default and then by user type )
    const AP = ref<number>(0) // AP for active registration page

    const cache = ref(0)

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
        cache.value = val
    }


    const configure = function (rt: number) {
        RT.value = rt
    }

    return {
        RT,
        configure,
        activePage,
        next,
        compos,
        setCache,
        cache,
    }
})