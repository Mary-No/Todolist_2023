import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../components/App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ClearTodoActionType, clearTodoDataAC} from "../../components/Todolist/todolists-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType =>{
    switch (action.type){
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
export const logoutTC = () => (dispatch: Dispatch<ActionType >) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodoDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

type InitialStateType = {
    isLoggedIn: boolean
}
type ActionType =
    ReturnType<typeof setIsLoggedInAC> |
    SetAppStatusActionType |
    SetAppErrorActionType |
    ClearTodoActionType