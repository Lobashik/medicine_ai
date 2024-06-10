let token = window.localStorage.getItem('token');

//* мини-переключатель чатов //
let userBox = document.querySelector('.main__chats__body__container');
let emptyDialog = document.querySelector('.main__dialog__empty');
let dialog = document.querySelector('.main__dialog__container');
emptyDialog.style.display = "flex";
dialog.style.display = "none";
userBox.addEventListener('click', () =>{
    if (dialog.style.display == "flex") {
        dialog.style.display = "none";
        emptyDialog.style.display = "flex";
    } else {
        dialog.style.display = "flex";
        emptyDialog.style.display = "none";
    }
});


//* ❤ //

//* отправка сообщений //

let textInput = document.querySelector('.main__dialog__container__bottom_input');
let sendButton = document.querySelector('.main__dialog__container__bottom_send');
let chatBox = document.querySelector('.main__dialog__container__body');

sendButton.addEventListener('click', () => {
    if (textInput.value) {
        data = new Date();
        let message = document.createElement("div");
        message.classList = "main__dialog__container__body_textbox animate__faster animate__fadeInUp";
        let messageText = document.createElement("div");
        messageText.classList = "main__dialog__container__body_textbox-text";
        messageText.innerHTML = textInput.value;
        let messageTime = document.createElement("div");
        messageTime.classList = "main__dialog__container__body_textbox-time";
        messageTime.innerHTML = data.getHours() + ':' + data.getMinutes();
        message.append(messageText, messageTime);
        chatBox.prepend(message);
        message.scrollIntoView({ block: "nearest", inline: "start"}, false);
        textInput.value = "";
    }
})


// let socket = new WebSocket("wss://#");

// // отправка сообщения из формы
// form.onsubmit = ()=> {
// let outgoingMessage = textInput.value;
// socket.send(outgoingMessage);
// return false;
// };

// // получение сообщения - отобразить данные в div#messages
// socket.onmessage = (event)=> {
// let message = event.data;
// let messageElem = document.createElement('div');
// messageElem.textContent = message;
// document.getElementById('messages').prepend(messageElem);
// }


textInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});

//* ❤ //

//* выход из профиля //

const exitButton = document.querySelector('.main__chats__header__head_tools-exit');
exitButton.addEventListener('click', ()=>{
    window.localStorage.setItem('token', '');
});

//* ❤ //


//* загрузка данных //

let userAvatar = document.querySelector('.main__chats__header__head_avatar-pic');
if (window.localStorage.getItem('avatar')) {
    // userAvatar.src = window.localStorage.getItem('avatar');
}
window.onload = allUsersLoad();

//* ❤ //

//* чаты //

let allUsersBox = document.querySelector('.main__chats__recommendations');
let userChats = document.querySelector('.main__chats__body');
const recommendationsButton = document.querySelector('.main__chats__header__bottom_button');
recommendationsButton.addEventListener('click',()=>{
    if(allUsersBox.style.display == 'flex'){
        recommendationsButton.innerHTML = "Рекомендованные друзья";
        allUsersBox.style.display = 'none';
        userChats.style.display = 'flex'
    }
    else{
        recommendationsButton.innerHTML = "Мои чаты";
        allUsersBox.style.display = 'flex';
        userChats.style.display = 'none';
    }
});
let allUsers = '';
function createUsers(data){
    data.forEach(element => {
        let chatContainer = document.createElement('div');
        chatContainer.classList = "main__chats__recommendations__user";
        chatContainer.setAttribute('id', element.id);
        let chatAvatar = document.createElement('img');
        chatAvatar.classList = "main__chats__recommendations__user__avatar";
        if(element.avatar) chatAvatar.scr = element.photo;
        else chatAvatar.src = "../src/img/avatar_mini.svg";
        let chatTitle = document.createElement('div');
        chatTitle.classList = "main__chats__recommendations__user__title";
        let chatTitleName = document.createElement('p');
        chatTitleName.classList = "main__chats__recommendations__user__title_name";
        chatTitleName.innerText = element.name;
        chatTitle.append(chatTitleName);
        chatContainer.append(chatAvatar, chatTitle);
        allUsersBox.append(chatContainer);
    });
    allUsers = document.querySelectorAll('.main__chats__recommendations__user');
    allUsers.forEach(element =>{
        element.addEventListener('click', ()=>{
            let e = {
                second_user_id : element.id
            }
            fetch('http://127.0.0.1:8000/api/chats/',{
                method: 'POST',
                headers:{
                    'Authorization': 'Token ' + token,
                },
                body: JSON.stringify(e),
            })
            .then(response => response.json())
        })
    })
}
console.log(allUsers);
function allUsersLoad() {
    fetch('http://127.0.0.1:8000/api/users/', {
        headers: {
            'Authorization': 'Token ' + token,
        }
    })
    .then((response) => response.json())
    .then((data) => {
        createUsers(data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
}


function openChat(){

}


//* ❤ //
