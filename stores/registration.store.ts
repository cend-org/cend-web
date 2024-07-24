import {registrationFlow} from "~/constants/registration";
import {useLocalStorage} from "@vueuse/core";

export const registrationStore = defineStore('registration', () => {
    const usr = userStore();
    let RT = useLocalStorage("RT", 0)
    const AP = useLocalStorage("AP", 0)
    const cache = useLocalStorage("registration-cache", 0)
    const route = useRoute();


    const activePage = computed(() => {
        return AP.value
    })

    const next = function () {
        AP.value += 1
    }

    const compos = computed(()=>{
        
        
        if (isNaN(RT.value) || RT.value == undefined) {
            navigateTo("/")
            return registrationFlow[0][0]
        }
        else{
            RT.value =  parseInt(<string>route.query['RT'])
            const flow = registrationFlow[RT.value]
            if (flow.length <= AP.value){
                return navigateTo("/")
            }
            return flow[AP.value]
        } 
    })

    const setCache = (val: number) => {
        if (val > cache.value ){
            cache.value = val
        }
    }

    return {
        activePage,
        next,
        compos,
        setCache,
        cache,
    }
})