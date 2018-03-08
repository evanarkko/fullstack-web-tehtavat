const reducer = (state = "", action) => {
    switch(action.type){
        case 'FILTER':
            return action.content
        default:
            return state
    }
}

export const filterSet = (content) => {
    return{
        type: 'FILTER',
        content
    }
}

export default reducer