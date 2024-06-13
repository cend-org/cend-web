export const useRTGuard = () => {
    function apply() {
        const route = useRoute()
        const usr = userStore()

        const rt = <string>route.query['RT']

        if (!route.query['RT'] || isNaN(parseInt(rt))) {
            // return to dashboard
            console.log("ATO VE?");
            navigateTo("/")
        }

        if (![0,1,2,3].includes(parseInt(rt))){
            navigateTo("/")
        }

        usr.configure(parseInt(<string>route.query['RT']))
    }

    return {
        apply
    }
}