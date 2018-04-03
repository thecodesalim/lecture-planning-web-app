const socket = io();

window.send.addEventListener('click', () => {
  // Send message to server
  socket.emit("chat message", text.value)
})

// Event trigger on message
socket.on("chat message", (msg) => {
  const li = document.createElement('li')
  li.textContent = msg
  messages.appendChild(li)
  text.value = ''
})

