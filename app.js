const express = require("express");
const cors = require('cors')
const projectsRouter = require('./controllers/projects');
const blogsRouter = require("./controllers/blogs");
const middleware = require('./utils/middleware')
import { createClient } from '@supabase/supabase-js'
require('dotenv').config()

const app = express();
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

app.use('/garvinchimone/projects', projectsRouter)
app.use('/garvinchimone/blogs', blogsRouter)

app.get("/", (request, response) => {
  response.send("<h1>Hello Garvin</h1");
});

app.use(cors())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app