import {attach} from './store.js'
import Appp from './componet/app.js';
var root = document.getElementById('root');
attach(Appp,root);
console.log(Appp);