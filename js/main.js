// Tags de controle
const login = document.querySelector(".login")
const loginForm = login.querySelector(".form-login")
const loginInput = login.querySelector(".input-login")

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".form-chat")
const chatInput = chat.querySelector(".chat-login")
const chatMessages = chat.querySelector(".chat-mensagem")


const user  = {id: "", name: "", color: ""}

let websocket

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("self-mensagem")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("other-mensagem")

    span.classList.add("sender-mensagem")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const RandomColor = () => {
    const RandomIndex = Math.floor(Math.random() * colors.length)
    return colors[RandomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message =
        userId == user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()
}


const handleSubmit = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = RandomColor()
    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage
    console.log(user)
}

const sendMessage = (event) => {
    event.preventDefault()
    const mensagem = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value,
    }
    websocket.send(JSON.stringify(mensagem))
    chatInput.value = ""
}

loginForm.addEventListener("submit", handleSubmit)
chatForm.addEventListener("submit", sendMessage)
