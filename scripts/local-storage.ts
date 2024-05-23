export function LocalStorageGetItem(item: any) {
    if (process.client) {
        return localStorage.getItem(item)
    } else {
        return undefined
    }
}

export function LocalStorageSetItem(item: any, value: any) {
    if (process.client) {
        localStorage.setItem(item, value)

        return true
    } else {
        return false
    }
}
export function LocalStorageremoveItem(item: any) {
    if (process.client) {
        localStorage.removeItem(item)
        return true
    } else {
        return false
    }
}