import create from 'zustand'
import { addJWT, removeJWT } from '../FetchService/FetchService.js'

import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

const storedUser = localStorage.getItem('user');

if (storedUser) {
    addJWT(JSON.parse(storedUser).token)
}

const makeEmptyUser = () => ({
    logged: false,
    username: null,
    id: null,
    level: 0,
    token: null
})

export const useStore = create(devtools(subscribeWithSelector(set => ({
    Alerts: [],
    User: storedUser ? JSON.parse(storedUser) : makeEmptyUser(),
    AddAlert: (content, type = "info") =>
        set(state => ({ Alerts: [...state.Alerts, { content: content, type: type, key: Math.random() }] })),
    RemoveAlert: () =>
        set(state => state.Alerts.length > 0 ? { Alerts: state.Alerts.slice(1) } : { Alerts: [] }),
    LogIn: (data) =>
        set({ User: { logged: true, username: data.username, id: data.id, level: data.level, token: data.token } }),
    LogOut: () =>
        set({ User: makeEmptyUser() })
}))))

export function useUser() { // helper hook
    const user = useStore(state => state.User)
    const LogIn = useStore(state => state.LogIn)
    const LogOut = useStore(state => state.LogOut)

    return {
        user: user,
        isLogged: user.logged,
        isAdmin: user.logged && user.level >= 2,
        LoginUser: LogIn,
        LogOut: LogOut
    }
}

let timeout = null

useStore.subscribe(state => state.Alerts,
    Alerts => {
        console.log(Alerts)
        if (Alerts.length > 0 && timeout === null) {
            timeout = setTimeout(() => { timeout = null; useStore.getState().RemoveAlert(); }, 3000)
        }

        if (Alerts.length === 0 && timeout != null) {
            clearTimeout(timeout)
        }
    }
)

useStore.subscribe(state => state.User,
    User => {
        if (User.logged) {
            addJWT(User.token)
            localStorage.setItem('user', JSON.stringify(User))
            useStore.getState().AddAlert('logged in')
        }
        else {
            removeJWT()
            localStorage.setItem('user', JSON.stringify(makeEmptyUser()))
            useStore.getState().AddAlert('logged out')
        }
    })
