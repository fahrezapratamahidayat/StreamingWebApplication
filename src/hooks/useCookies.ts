import { cookies } from 'next/headers'

export function useCookies() {
    const cookiesStore = cookies()
    return cookiesStore.getAll()
}