require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());

// Endpoint para la verificación de webhook de WhatsApp
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('Webhook verificado');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Endpoint para recibir mensajes de WhatsApp
app.post('/webhook', async (req, res) => {
    if (req.body.object) {
        if (req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]) {

            const phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
            const from = req.body.entry[0].changes[0].value.messages[0].from;
            const msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;

            try {
                // Obtener respuesta de OpenAI
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Eres un asistente virtual de FINNOVA, una institución financiera. Proporciona información sobre préstamos y servicios financieros de manera profesional y concisa."
                        },
                        {
                            role: "user",
                            content: msg_body
                        }
                    ],
                    max_tokens: 150
                });

                const botResponse = completion.choices[0].message.content;

                // Enviar respuesta a WhatsApp
                await axios({
                    method: 'POST',
                    url: `https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${process.env.WHATSAPP_TOKEN}`,
                    data: {
                        messaging_product: "whatsapp",
                        to: from,
                        text: { body: botResponse },
                    },
                    headers: { "Content-Type": "application/json" },
                });

            } catch (error) {
                console.error('Error:', error);
            }
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});
