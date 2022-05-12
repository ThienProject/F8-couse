// Nhận action và xử lý
const init = {
    cars : ['BWN']
}

export default function reducer(state = init,action, args){
    switch(action){
        case 'CREATE':
            break;
        default : return state;
    }
}