const axios = require("axios");

const generateMovies = async (prompt) => {

  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: `
Recommend 5 movies for:
${prompt}

Return ONLY valid JSON array.

Example:
[
  {
    "movie": "Interstellar",
    "reason": "Emotional sci-fi storytelling"
  }
]
`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.log(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    // FALLBACK DATA
    return JSON.stringify([
      {
        movie: "Interstellar",
        reason: "Epic sci-fi storytelling"
      },
      {
        movie: "Inception",
        reason: "Mind-bending thriller"
      },
      {
        movie: "Blade Runner 2049",
        reason: "Futuristic atmosphere"
      },
      {
        movie: "Arrival",
        reason: "Intelligent alien sci-fi"
      },
      {
        movie: "The Matrix",
        reason: "Classic cyberpunk action"
      }
    ]);
  }
};

module.exports = generateMovies;