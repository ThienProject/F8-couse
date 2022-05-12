import html from '../core.js'
import {connect} from '../store.js'

const connector = connect()
function App({cars}) {
    return html`<h1>Hello</h1>
    <ul>
        ${cars.map(car => `<li>${car}</li>`)}
    
    </ul>
    `;
}
export default connector(App)