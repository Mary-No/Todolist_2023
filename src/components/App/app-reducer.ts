import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {setIsLoggedInAC} from "../../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, получили настройки и т.д.)
    isInitialized: boolean
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value}) as const
//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(res => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }
        dispatch(setAppInitializedAC(true))
        })
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>


type ActionsType = SetAppStatusActionType | SetAppErrorActionType | ReturnType<typeof setAppInitializedAC>