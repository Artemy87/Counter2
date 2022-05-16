export type StateType = {
    count: number
    startValue: number
    maxValue: number
    editMode: boolean
    editCounter: boolean
}

const initialState: StateType = {
    count: 1,
    startValue: 1,
    maxValue: 5,
    editMode: false,
    editCounter: false,
}

export const counterReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {
    switch (action.type) {
        case "SET-COUNTER":

                return {...state, count: state.count + 1}
        case 'SET-START-VALUE': {
            return {...state, startValue: action.start, count: action.start}
        }
        case 'SET-MAX-VALUE': {
            return {...state, maxValue: action.max}
        }
        case 'SET-EDIT-MODE': {
            return {...state, editMode: action.valueMode}
        }
        case 'SET-EDIT-COUNTER': {
            return {...state, editCounter: action.editCount}
        }
        case 'RESET': {
            return {...state, count: state.startValue}
        }

        default:
            return state;
    }
}

type ActionsTypes =
    ReturnType<typeof setCounterAC> |
    ReturnType<typeof setStartValueAC> |
    ReturnType<typeof setMaxValueAC> |
    ReturnType<typeof setEditModeAC> |
    ReturnType<typeof setEditCounterAC> |
    ReturnType<typeof resetAC>

export const setCounterAC = () => ({type: 'SET-COUNTER'}) as const;
export const setStartValueAC = (start: number) => {
    return {
        type: 'SET-START-VALUE',
        start
    } as const
}
export const setMaxValueAC = (max: number) => {
    return {
        type: 'SET-MAX-VALUE',
        max
    } as const
}
export const setEditModeAC = (valueMode: boolean) => {
    return {
        type: 'SET-EDIT-MODE',
        valueMode
    } as const
}
export const setEditCounterAC = (editCount: boolean) => {
    return {
        type: 'SET-EDIT-COUNTER',
        editCount
    } as const
}
export const resetAC = () => ({type: 'RESET'}) as const;