import html from '../core.js';
import Header from './Header.js';
import TodoList from './TodoList.js'
import footer from './footer.js'
import { connect} from '../store.js'
function App({todos}){
    return html`
            <section class="todoapp"> 
            ${Header()}
            ${(todos.length > 0) && TodoList()}
            ${(todos.length > 0) && footer()}
            </section>
    `;
}
export default connect()(App);