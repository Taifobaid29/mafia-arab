const socket = io();

function joinGame() {
    const name = document.getElementById("username").value;
    if (name) {
        socket.emit("join", name);
        document.getElementById("lobby").style.display = "none";
        document.getElementById("game").style.display = "block";
    }
}

function sendMsg() {
    const msg = document.getElementById("msgInput").value;
    socket.emit("chat", msg);
    document.getElementById("msgInput").value = "";
}

socket.on("role", (role) => {
    document.getElementById("role").innerText = "دورك: " + role;
});

socket.on("chat", (msg) => {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div>${msg}</div>`;
    chat.scrollTop = chat.scrollHeight;
});