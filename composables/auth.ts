import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem } from '~/scripts/local-storage';
export const useAuthStore = defineStore('auth', () => {
    let connected = ref(false);
    function isAuthenticated(): boolean {
        let token = LocalStorageGetItem(environment.auth_token);
        if (token == null || token == '') {
            return false;
        }
        const decodedToken = jwtDecode(token);
        const expToken = decodedToken.exp;
        if (expToken != null && expToken < Date.now() / 1000) {
            return false;
        }

        return true;
    }

    function check() {
        let token = LocalStorageGetItem(environment.auth_token);
        if (token == null || token == '') {
            connected.value = false;
            return;
        }
        const decodedToken = jwtDecode(token);
        const expToken = decodedToken.exp;
        if (expToken != null && expToken < Date.now() / 1000) {
            connected.value = false;
            return;
        }

        connected.value = true;
    }

    return { isAuthenticated, check, connected }
})