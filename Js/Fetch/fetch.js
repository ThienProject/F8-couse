var postApi = 'https://jsonplaceholder.typicode.com/posts';
var post = document.querySelector('.post');

// stream
fetch(postApi)
    .then (function (response) {
        return response.json();
        /// hàm json() làm việc của JSON.parse ( json -> javascript type)
    })
    .then(function(posts){
    
      let html =  posts.map(function(post){
           return  ` <li> <h2>${post.title}</h2><p>${post.body}</p></li>
                    `
        })
        console.log(html[1]);
        post.innerHTML = html.join('');
    })
    .catch(function(err){
        console.log(err);
    })