// Seleccionar Elementos del DOM

let userInput = document.querySelector("#inputText");
let resButton = document.querySelector("#resButton");
const chatBox = document.querySelector(".chat__messages");
const userID = "anon-" + Date.now();

function displayMessage(msgText, sender) {

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat__message");
    msgDiv.classList.add(sender === "user" ? "chat__message--user" : "chat__message--bot");
    if (sender === "bot") {
        msgDiv.classList.add("chat__message--ia");
    }

    msgDiv.textContent = msgText;

    //añadir el mensaje al chat
    chatBox.appendChild(msgDiv);

    //Desplazar el scroll hacia abajo
    chatBox.scrollTop = chatBox.scrollHeight;

}

//
async function sendMessage() {
    const myMessage = userInput.value;

    if (!myMessage) return false;

    userInput.value = "";

    // Añadir mi mensaje de usuario
    displayMessage(myMessage, "user");

    //Crear mensaje de cargando
    displayMessage("Cargando...", "bot");

    //Enviar la petición al backend
    const response = await fetch("http://localhost:3005/api/nutri-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userID,
            message: myMessage
        }),
    });

    // Recoger la respuesta y reemplazar el cargando por el texto de la IA
    const data = await response.json();

    // Mostrar mensaje
    const botMessages = chatBox.querySelectorAll(".chat__message--ia");
    const lastBotMsg = botMessages[botMessages.length - 1];

    if (lastBotMsg) {
        if (data.diet) {
            // Si tenemos un mensaje y una dieta, crear dos elementos
            lastBotMsg.textContent = data.message;
            
            // Crear un nuevo div para la tabla
            const tableDiv = document.createElement("div");
            tableDiv.classList.add("chat__message", "chat__message--bot", "chat__message--ia");
            
            // Configurar markdown-it con opciones para tablas
            const md = new markdownit({
                html: true,
                linkify: true,
                typographer: true,
                breaks: true,
                tables: true
            });

            // Formatear la tabla correctamente
            let lines = data.diet.split('\n').filter(line => line.trim());
            
            // Extraer los encabezados
            let headers = lines[0].split('|')
                .filter(cell => cell.trim())
                .map(cell => cell.trim());
            
            // Construir la tabla markdown
            let markdownTable = [
                // Encabezados
                '| ' + headers.join(' | ') + ' |',
                // Separadores
                '| ' + headers.map(() => '---').join(' | ') + ' |'
            ];
            
            // Añadir las filas de datos
            lines.slice(1).forEach(line => {
                if (line.includes('|')) {
                    let cells = line.split('|')
                        .filter(cell => cell.trim())
                        .map(cell => cell.trim());
                    markdownTable.push('| ' + cells.join(' | ') + ' |');
                }
            });

            const htmlContent = md.render(markdownTable.join('\n'));
            tableDiv.innerHTML = htmlContent;
            
            // Añadir la tabla al chat
            chatBox.appendChild(tableDiv);
        } else {
            lastBotMsg.textContent = data.reply || "Error al procesar la respuesta";
        }

        //Desplazar el scroll hacia abajo
        chatBox.scrollTop = chatBox.scrollHeight;

    } else {
        displayMessage(data.reply, "bot");
    }



}


// Añadir evento al botón y al input
resButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});