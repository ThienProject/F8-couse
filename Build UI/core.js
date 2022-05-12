export default function html([firt,...strings], ...values){
    console.log(values);
    return values.reduce(
        (acc,cur) => {
            if(Array.isArray(cur)){
                 acc += (cur.join('') + strings.shift());
            }
            else{
                ((cur && cur!== true ) || cur===0 )?  acc += (cur + strings.shift()) : acc += (strings.shift())
            }
            return acc;
        }
        ,firt
    );
}


// Hàm tạo store ; Cần có giá trị của thằng reducer trước
export function createStore(reducer){
    // state is dữ liệu trong kho store
    let state = reducer(); // reducer đưa dữ liệu đầu tiên vào store;

    //roots chứa element reder ra ngoài view
    const roots = new Map(); // Map là object đặc biệt

    function render(){
        // Đẩy mã html từ component vào root
        for(const [root,component] of roots){
            const output = component();
            root.innerHTML = output;
        }
    }

    return { // các phương thức làm việc với store

        //attach : cập nhật state và render ra root.div
        attach(component, root){
            roots.set(root,component); //  root là key và component là value
            render();
        },

        // connect view and store 
        connect(selector = state => state){  //selector lựa chọn dữ liệu cụ thể trong store // mặt đinh là tất cả
            return (component) => {
                return  (props, ...argument) => component(Object.assign({},props,selector(state), ...argument));
            }
        },

        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        }
    }
}
