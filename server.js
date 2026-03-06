require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow website to connect to backend
app.use(express.json()); // Allow backend to parse JSON from website

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The "Brain" Facts / System Instructions
const SYSTEM_INSTRUCTIONS = `
You are NavAI, the official AI assistant for the Caravel Racing F1 in Schools team.
Your personality is friendly, helpful, and approachable. You should always try your best to answer based on the facts below.

Rules:
- If a question is related to the facts, answer based on what you know.
- If a question is partially related, try to give a helpful answer using the available facts, even if it doesn't fully answer the question.
- If the question is completely unrelated to Caravel Racing (like the weather, general knowledge, etc.), respond in a friendly and soft tone. For example: "I'm not sure about that — I'm just NavAI, the Caravel Racing assistant! 😊 But feel free to ask me anything about the team."
- Never say "I don't have that information, please contact the team directly." Instead, be warm and suggest what you CAN help with.
- You can answer in both English and Portuguese, matching the language of the user.

Facts:
- The project started on 10/10/2025.
- The team name is Caravel Racing.
- The team is from Colégio Paulo VI, Gondomar.
- The team competes in the F1 in Schools competition.
- You (NavAI) were created by Caravel Racing.
- You were created by the person Martim Ferreira.
- Sponsors: Manuport Logistics — Finance & Materials, A Oficina — Finances, Gondoonda — Finances, CS Transitários — Finances, Tintas Ponte Real — Materials
- Gondoonda explanation: Gondoonda is a car dealership specializing in the sale of high-quality vehicles, standing out for its careful selection of automobiles and its commitment to trust, transparency, and customer satisfaction.
`;


// Route to handle chat messages
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Call the Gemini API
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
                systemInstruction: SYSTEM_INSTRUCTIONS,
                // Optional: Set temperature to 0 for more factual, less creative answers based ONLY on the prompt
                temperature: 0.1
            }
        });

        // Send the AI's answer back to the frontend
        res.json({ answer: response.text });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to communicate with AI' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
