import { useEventListener, useLocalStorage } from "@vueuse/core";
import { registrationFlow } from "~/constants/registration";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = authenticationStore()


    // if(from.fullPath === "/" && to.fullPath === "/" && authStore.connected){
    //     return abortNavigation();
    // }

    // if(from.fullPath.startsWith("/app/dashboard") && to.fullPath === "/" && authStore.connected){
    //     return abortNavigation();
    // }

    // if(from.fullPath.startsWith("/") && to.fullPath === "/app/dashboard" && !authStore.connected){
    //     return navigateTo("/") ;
    // }
})