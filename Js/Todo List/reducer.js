import stogare from './util/storage.js'
const init = {
    todos: stogare.get(),
    filter: 'all',
    filters: {
        all : ()=>true,
        active : todo => !todo.completed,
        completed : todo => todo.completed
    },
    editIndex : null,
   /*  todos: [
        {
            title: 'Learn F8',
            completed: false,
        },
        {
            title: 'Learn English',
            completed: true,
        }
    ] */
}

export default function reducer(state = init, action, agrs) {
        
     switch (action)
     {
         case 'add':
            const [title] = agrs;
             if(title){
                let newState = {
                    ...state,
                    todos : [...state.todos,
                        {   
                            title, 
                            completed : false
                        }
                          ]   
                        }
                stogare.set(newState.todos);
                return newState;
             }
             else return state;   
        case 'toggle'  :
             const [index] = agrs;
             const todo = state.todos[index];
             todo.completed = !todo.completed;
             stogare.set(state.todos);
             return state;
             
        case 'toggleAll' :
             const [completed] = agrs;
             state.todos.forEach(todo => {
                 return todo.completed = completed;
             })
             stogare.set(state.todos);
             return state;
        case 'delete':
            const [i] = agrs;
            state.todos.splice(i, 1);
            stogare.set(state.todos);
            return state;
        case 'switchFilter' :
            const [filter] = agrs;
            state.filter = filter;
            return state;
        case 'clear-completed':
            state.todos = state.todos.filter(todos => {
                return todos.completed == false;
            })
            stogare.set(state.todos);
            return state;
        case 'startEdit' :
           state.editIndex = agrs[0];
           return state;
        case 'saveEdit' :
            const [value] = agrs;
            if(state.editIndex != null){
                state.todos[state.editIndex].title = value;   
                stogare.set(state.todos);
            }
            if(!value){
                state.todos.splice(state.editIndex,1);
                stogare.set(state.todos);
            }
            state.editIndex = null;
            return state;
        case 'cancelEdit':
            state.editIndex = null;
            return state;
        default:
              return state;
     }
}