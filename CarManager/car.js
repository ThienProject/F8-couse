var $ = document.querySelector.bind(document);
var $$ = document.querySelector.bind(document);

const app = (() => {
    const cars = [];
    const ul = $('.car-list');
    const input = $('#input-carname');
    const submit = $('.btn-add');
    return {
        add(car){
            cars.push(car);
        }, 
        delete(index){
            cars.splice(index, 1);
        }, 
        render(){
            html =  cars.map((car,index) => {
                return `<li data-index =${index}> 
                <span class = "car-item__name"> ${car} </span> 
                    <button class = "btn-delete"  >Delete</button>
                </li>`
            }).join('');
            ul.innerHTML = html;


        },
        handleDelete(event){
           const btnDelete = event.target.closest('.btn-delete');
           const li = event.target.closest('li');
           if(btnDelete){
               const index = li.dataset.index;
               this.delete(index);
               this.render();
           }
        },
        init(){
            //handle dom event
            submit.onclick = () => {
                const value = input.value;
                this.add(value);
                this.render();
                input.value = null;
                input.focus();
            }
            ul.onclick = this.handleDelete.bind(this);
            this.render();
        }

    }
})();
app.init();

// Delegate 