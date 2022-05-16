var users = [
    {
        idUser: 1,
        name: 'John',


    },
    {
        idUser: 2,
        name: 'Thiên',


    },
    {
        idUser: 3,
        name: 'Tây',


    },

];
var comments = [
    {
        idCM: 1,
        idUser: 1,
        comment: "Không có gì đâu "
    },
    {

        idCM: 2,
        idUser: 2,
        comment: "Có cái đầu bùi "
    }
]

// fake api call
function getComments() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments);
        }, 1000)
    })
};

getComments()
    .then(function (comments) {
        var idUsers = comments.map(function (comment) {
            return comment.idUser;
        });

        return getUsersByIds(idUsers)
            .then(function (users) {
                return {
                    users: users,
                    comments: comments
                }
            });
    })
    .then(function (data) {
        var cmtElement = document.querySelector('#cmt-block');
        var html = '';
        data.comments.forEach(function (comment) {
            var user = data.users.find(function (user) {
                return user.idUser === comment.idUser
            });
            
            html += `${user.name} : ${comment.comment} </br>`;
        })
        cmtElement.innerHTML = html;
    })

function getUsersByIds(idUsers) {
    return new Promise(function (resolve) {
        setTimeout(
            function () {
                var result = users.filter(function (user) {
                    return idUsers.includes(user.idUser);
                });
                resolve(result);
            }, 1000);
    })
};
