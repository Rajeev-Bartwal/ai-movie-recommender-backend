require("dotenv").config();

const http = require("http");

const parseBody = require("./utils/parseBody");

const generateMovies = require("./config/gemini");

const db = require("./config/db");

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Home Route
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Movie Recommendation API Running",
      }),
    );

    return;
  }

  // Recommend Route
  if (req.url === "/api/recommend" && req.method === "POST") {
    try {
      const body = await parseBody(req);

      const prompt = `
You are an AI movie recommendation engine.

Recommend 5 movies for:
${body.prompt}

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation outside JSON
- Include movie and reason

Format:
[
  {
    "movie": "Movie Name",
    "reason": "Why recommended"
  }
]
`;
      
      const text = await generateMovies(body.prompt);

      let recommendations = [];

      try {
        recommendations = JSON.parse(text);
      } catch {
        recommendations = [];
      }

      // Save in DB
      db.run(
        `
        INSERT INTO recommendations
        (user_input, recommended_movies)
        VALUES (?, ?)
        `,
        [body.prompt, JSON.stringify(recommendations)],
      );

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          recommendations,
        }),
      );
    } catch (error) {
      console.log(error);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Internal Server Error",
        }),
      );
    }

    return;
  }

  // 404
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Route not found",
    }),
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
