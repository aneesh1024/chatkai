const socket = io();

let usernName = "test";
let messageInput = document.getElementById("messageInput");
const container = document.getElementById("container");
const sendBtn = document.getElementById("sendButton");
const welcome = document.getElementById("welcome-toast");

do {
  usernName = prompt("Please Enter your Name : ");
} while (!usernName);

messageInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    if (e.target.value.trim() !== "") {
      sendMessage(e.target.value);
    }
  }
});

sendBtn.addEventListener("click", () => {
  if (messageInput.value !== "") {
    sendMessage(messageInput.value);
  }
});

function sendMessage(m) {
  let msg = {
    user: usernName,
    message: m,
  };
  appendMessage(msg, "outgoing");

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("message-wrapper");
  let markUp = `
    <div class="message ${
      type === "incoming" ? "left" : "right"
    } flex gap-2 flex-col items-start h-max">
            <span
              class="bg-zinc-900 h-full flex items-center justify-center px-6 py-2"
              >${msg.user}</span
            >
            <span class="px-2 sm:px-5 py-2 max-w-[10rem] text-sm sm:text-base sm:max-w-[20rem]">${
              msg.message
            }</span>
          </div>
    `;
  mainDiv.innerHTML = markUp;
  if (container.contains(welcome)) {
    container.removeChild(welcome);
  }
  container.appendChild(mainDiv);
  messageInput.value = "";
  container.scrollTop = container.scrollHeight;
}

// Recieve Message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});
