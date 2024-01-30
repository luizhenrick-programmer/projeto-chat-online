// Tags de controle
const login = document.querySelector(".login")
const loginForm = login.querySelector(".form-login")
const loginInput = login.querySelector(".input-login")

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".form-chat")
const chatInput = chat.querySelector(".chat-login")
const chatMessages = chat.querySelector(".chat-mensagem")


const user  = {id: "", name: "", color: ""}

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const RandomColor = () => {
    const RandomIndex = Math.floor(Math.random() * colors.length)
    return colors[RandomIndex]
}

const handleSubmit = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = RandomColor()
    login.style.display = "none"
    chat.style.display = "flex"
    console.log(user)
}

loginForm.addEventListener("submit", handleSubmit)
