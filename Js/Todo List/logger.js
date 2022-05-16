export default function logger(reducer){
    return (prevState,action, args) => {
        console.group(action);
        console.log("prev state", prevState);
        console.log("args", args);
        const nextState = reducer(prevState, action, args);
        console.log("next state", nextState);
        
        console.groupEnd();
        return nextState
    }
}