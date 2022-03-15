const socket = io();
let user;
let logInButton = document.getElementById('logInButton');
let chatBox = document.getElementById('chatBoxInput');
let chatButton = document.getElementById('chatBoxButton');
let form = document.getElementById("productsForm");
let messageQuantity = document.getElementById('howManyMessages');
let messages = 0;

let regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit('sendProduct', sendObj);
    form.reset()
})


const sendMessage = () => {

    if (user === undefined) {
        socket.emit('message', { user: 'ADMIN', message: 'Por favor identificate para enviar mensajes.' })
        chatBox.value = "";
        return
    }
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { user: user, message: chatBox.value.trim() })
        chatBox.value = "";
        messages = messages+1;
        if (messages===1){
            messageQuantity.innerHTML = `<span style="color:white;">${messages} mensaje nuevo en el chat</span>`
        }
        else{
            messageQuantity.innerHTML = `<span style="color:white;">${messages} mensajes nuevos en el chat</span>`
        }
    }
}

logInButton.addEventListener('click', () => {

    if (logInButton.innerHTML === "Iniciar sesión") {

        Swal.fire({
            title: "Identifícate",
            input: "email",
            text: "Ingresa tu correo electrónico para utilizar el chat.",
            inputValidator: (value) => {
                if (value.match(regex)===null) return "Por favor, ingresa un mail válido." 
                if (value === "ADMIN") return "No, no podes ser ADMIN bobi."
                if (value.length > 30) return "El usuario tiene que tener menos de 30 dígitos."
                return !value && "!Por favor, ingresa un mail!";
            },
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(result => {
            user = result.value;
            socket.emit('registered', user);
            socket.emit('message', { user: 'ADMIN', message: `${user} ha iniciado sesión.` });
            logInButton.innerHTML = 'Cambiar Usuario';
        })
    }
    else {
        Swal.fire({
            title: "Elige tu nuevo nombre de usuario",
            input: "email",
            text: "Ingresa el nuevo correo electrónico que utilizarás en el chat",
            inputValidator: (value) => {
                if (value.match(regex)===null) return "Por favor, ingresa un mail válido." 
                if (value === "ADMIN") return "No, no podes ser ADMIN bobi."
                if (value.length > 30) return "El usuario tiene que tener menos de 30 dígitos."
                return !value && "!Por favor, ingresa un mail!";
            },
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then(result => {
            let newUser = result.value
            socket.emit('registered', newUser);
            socket.emit('message', { user: 'ADMIN', message: `${user} ha cambiado su nombre de usuario por ${newUser}` });
            user = newUser;
        })
    }
})

chatButton.addEventListener('click', () => {
    sendMessage();
})



chatBox.addEventListener('keyup', (evt) => {

    if (evt.key === "Enter") {
        sendMessage();
    }
})


//sockets

socket.on('productLog', (data) => {
    if (data) {
        let products = data.payload;
        let productsTemplate = document.getElementById('productsTemplate')
        fetch('templates/productsTable.handlebars').then(response => {
            return response.text();
        }).then(template => {
            const processedTemplate = Handlebars.compile(template);
            const html = processedTemplate({ products })
            productsTemplate.innerHTML = html;
        })
    }

})


socket.on('newUser', data => {

    Swal.fire({
        icon: "success",
        text: "Nuevo usuario conectado",
        toast: true,
        position: "top-right",
    })

})


socket.on('log', data => {
    if (data) {
        let messages = data.payload;
        let messagesTemplate = document.getElementById('log')
        fetch('templates/messages.handlebars').then(response => {
            return response.text();
        }).then(template => {
            const processedTemplate = Handlebars.compile(template);
            const html = processedTemplate({ messages })
            messagesTemplate.innerHTML = html;
        })
    }
})