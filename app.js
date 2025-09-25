// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";



//cargar configuracion (de api key)
dotenv.config();

//Cargar express
const app = express();
const PORT = process.env.PORT || 3005;


//Servir frontend
app.use("/", express.static("public"));

//Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Instancia de openai y pasar el api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Funcion para generar la dieta
const generateDiet = async (userResponses) => {

    // Crear el prompt (sistema, indicaciones para la ia)
    const promptSystem = {
        role: "system",
        content: `Eres un nutricionista profesional y un asistente que ayuda a 
        generar una dieta semanal
    
        El usuario solo puede hacer preguntas relacionadas con la dieta, 
        con su peso, altura, objetivo, alergias, alimentos que no le gustan y 
        el número de comidas diarias.

        El sistema no responderá a ningun otrto tipo de solicitud que no esté relacionada con la dieta.

        Si el usuario no te manda alguno de los datos,
        interpretalo tu mismo (por ejemplo si el usuario no te dice el peso,
        pero si me pasa la altura, usa un peso probable acorde a esa altura).
        `

    };


    // Crear el prompt del usuario

    const promptUser = {
        role: "user",
        content: `Crea una dieta semanal para una persona que pesa ${userResponses.peso} kg,
        mide ${userResponses.altura} cm, y tiene como objetivo ${userResponses.objetivo}.
        La persona tiene las siguientes alergias: ${userResponses.alergias}.
        Evitar los siguientes alimentos: ${userResponses.no_gusta}.
        Quiere hacer ${userResponses.comidas_diarias} comidas diarias.

        IMPORTANTE: Devuelve SOLO una tabla en formato Markdown con TODAS las columnas siguiendo EXACTAMENTE esta estructura:

        | Dia | Comida | Alimentos | Plato | Calorias |
        |-----|--------|-----------|--------|-----------|
        | Lunes | Comida 1 | Huevos, pan integral, aguacate | Tostadas de aguacate con huevo | 450 |

        Requisitos específicos:
        1. TODAS las columnas deben tener contenido, ninguna puede estar vacía
        2. Columna "Alimentos": Lista los ingredientes principales
        3. Columna "Plato": Nombre específico de la receta o preparación
        4. Columna "Calorias": Valor numérico aproximado en kcal
        5. No uses guiones o puntos para las celdas vacías
        6. La tabla debe incluir todas las comidas diarias solicitadas para los 7 días de la semana

        No agregues ningún otro texto antes o después de la tabla.
        `
    }

    // Hacer la peticion a LLM de openai


    try {

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [promptSystem, 
                promptUser],
                max_tokens: 1000,
                temperature: 0.75                
        });


        // Devolvemos el resultado generado

        const response = completion.choices[0].message.content.trim();
        return response;
    }
    catch (error) {
        return res.status(500).json({error: "Error al generar la dieta"});
    }

};   

// Objeto de almacenamiento temporal de respuestas del usuario
let userData = {};

//Ruta / endpoint /url
app.post("/api/nutri-chat", async (req, res) => {
    // Primero por defecto se pregunta el peso (frontend)

    
    const userId = req.body.id;
    const userMessage = req.body.message;

    //Generar objeto del usuario
    if (!userData[userId]) {
        userData[userId] = {};
    }
    // Recibir la respuesta del peso del usuario
    if (!userData[userId].peso) {
        userData[userId].peso = userMessage;
    
        return res.json({ reply: "¿Cuanto mides (cm)?"});
    }

    if(!userData[userId].altura) {
        userData[userId].altura = userMessage;
    
        return res.json({ reply: "¿Cual es tu objetivo? (adelgazar, mantener peso o subir de peso)"});
    }

    if(!userData[userId].objetivo) {
        userData[userId].objetivo = userMessage;
    
        return res.json({ reply: "¿Tienes alguna alergia? "});
    }

    if(!userData[userId].alergias) {
        userData[userId].alergias = userMessage;
    
        return res.json({ reply: "¿Que alimentos no te gustan?"});
    }

        if(!userData[userId].no_gusta) {
        userData[userId].no_gusta = userMessage;
    
        return res.json({ reply: "¿Cuantas comidas quieres hacer cada dia?"});
    }

        if(!userData[userId].comidas_diarias) {
        userData[userId].comidas_diarias = userMessage;

        // Ejecutar petición a la ia con un prompt
        const diet = await generateDiet(userData[userId]);
        //Recoger la respuesta y darle la dieta al usuario

        // Devolver respuesta al frontend
        return res.json({ 
            message: "¡Aquí tienes tu dieta!",
            diet: diet 
        })
    }

    if(userData[userId].peso && userData[userId].altura && userData[userId].objetivo &&
         userData[userId].alergias && userData[userId].no_gusta && userData[userId].comidas_diarias) {
            // Vacio los datos del usuario
            userData[userId] = {};

           }

    return res.json({ reply: "¡Gracias por tus respuestas! Ya tienes tu dieta creada, usa los ingredientes para hacer una receta..."})
        

});



//Servir el backend
app.listen(PORT, () => {
    // El servidor está corriendo
});