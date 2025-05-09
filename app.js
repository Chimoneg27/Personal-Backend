const express = require("express");
const cors = require('cors')
const projectsRouter = require('./controllers/projects');
const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(express.json())

app.use('/garvinchimone/projects', projectsRouter)
app.use('/garvinchimone/blogs', blogsRouter)

app.get("/", (request, response) => {
  response.send("<h1>Hello Garvin</h1");
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(unknownEndpoint)

module.exports = app