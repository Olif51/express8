require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5002;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);



const movieHandlers = require("./movieHandlers");
const { validateMovie , validateUser } = require("./validators");

const { hashPassword, verifyPassword, verifyToken  } = require("./auth.js");

const userHandlers = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.use(verifyToken); 

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.delete("/api/users/:id", userHandlers.deleteUser);