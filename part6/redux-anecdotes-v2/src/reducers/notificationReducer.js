const defaultMessage = ""

const reducer = (state = defaultMessage, action) => {
    switch(action.type){
        case 'NEW':
            return action.content
        default:
            return state
    }
}

export const notificationAdd = (content, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'NEW',
            content
        })
        setTimeout(() => {
            dispatch({
                type: 'NEW',
                content:""
            })
        }, time * 1000)
    }
}

export default reducer