// vd 1 : return promise thì sẽ chạy promise trước rồi mới chạy hàm .then.
var promise = new Promise(
    function(resolve, reject) {
        resolve();
})
promise 
    .then(function(){
        return new Promise(function(res){
            setTimeout(res,3000);
        })
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){

    })
    .finally(function(){
        console.log("done");
    })
// vd 2 
function sleeps(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}

var time = 1000;
sleeps(time)
    .then(function(){
        console.log(`sau khoảng thời gian : ${time}`);
        return sleeps(time*2);
    })
    .then(function(data){
        console.log(`sau khoảng thời gian : ${data}`);
        return sleeps(time*3);
    })
    .then(function(data){
        console.log(`sau khoảng thời gian : ${data}`);
      //  return sleeps(time*3);
    })
/// Sài promise.all đẻ chắn chắn 2 promise xảy ra đồng thời