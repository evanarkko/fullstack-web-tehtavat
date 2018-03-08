const defaultMessage = ""

const reducer = (state = defaultMessage, action) => {
    switch(action.type){
        case 'NEW':
            return action.content
        default:
            return state
    }
}

export const notificationAdd = (content) => {
    return{
        type: 'NEW',
        content
    }
}

export default reducer