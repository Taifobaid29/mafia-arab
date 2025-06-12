const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = [];

io.on("connection", (socket) => {
    socket.on("join", (name) => {
        players.push({ id: socket.id, name });
        const role = assignRole(players.length);
        socket.emit("role", role);
    });

    socket.on("chat", (msg) => {
        io.emit("chat", msg);
    });

    socket.on("disconnect", () => {
        players = players.filter(p => p.id !== socket.id);
    });
});

function assignRole(count) {
    return count % 3 === 0 ? "مافيا" : "مدني";
}

http.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});
