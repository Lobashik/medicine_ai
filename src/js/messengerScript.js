//* мини-переключатель чатов //
let userBox = document.querySelector('.main__chats__body__container');
let emptyDialog = document.querySelector('.main__dialog__empty');
let dialog = document.querySelector('.main__dialog__container');
emptyDialog.style.display = "flex";
dialog.style.display = "none";
userBox.addEventListener('click', () => {
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

async function sendMessage() {
    if (textInput.value) {
        let data = new Date();
        
        // Отправка сообщения на сервер
        let userMessage = textInput.value;
        let userMessageDiv = document.createElement("div");
        userMessageDiv.classList = "main__dialog__container__body_textbox animate__faster animate__fadeInUp user-message";
        let userMessageText = document.createElement("div");
        userMessageText.classList = "main__dialog__container__body_textbox-text";
        userMessageText.innerHTML = userMessage;
        let userMessageTime = document.createElement("div");
        userMessageTime.classList = "main__dialog__container__body_textbox-time";
        userMessageTime.innerHTML = data.getHours() + ':' + data.getMinutes();
        userMessageDiv.append(userMessageText, userMessageTime);
        chatBox.prepend(userMessageDiv);
        userMessageDiv.scrollIntoView({ block: "nearest", inline: "start" }, false);

        // Очистка текстового поля
        textInput.value = "";
        try {
            let response = await fetch('http://127.0.0.1:8000/chat/message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });
            let result = await response.json();
            console.log(result);
            // Отрисовка ответа от сервера
            if (result.message) {
                let replyMessageDiv = document.createElement("div");
                replyMessageDiv.classList = "main__dialog__container__body_textbox animate__faster animate__fadeInUp server-reply";
                let replyMessageText = document.createElement("div");
                replyMessageText.classList = "main__dialog__container__body_textbox-text";
                replyMessageText.innerHTML = result.message;
                let replyMessageTime = document.createElement("div");
                replyMessageTime.classList = "main__dialog__container__body_textbox-time";
                replyMessageTime.innerHTML = data.getHours() + ':' + data.getMinutes();
                replyMessageDiv.append(replyMessageText, replyMessageTime);
                chatBox.prepend(replyMessageDiv);
                replyMessageDiv.scrollIntoView({ block: "nearest", inline: "start" }, false);
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
    }
}

sendButton.addEventListener('click', sendMessage);

textInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});
