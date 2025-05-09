const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();
const cors = require('cors')

app.use(express.json())

app.get("/", (request, response) => {
  response.send("<h1>Hello Garvin</h1");
});

app.get("/garvinchimone/projects", async (request, response) => {
  try {
    const projects = await prisma.project.findMany()
    response.json(projects)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch projects' })
  }
});

app.get("/garvinchimone/projects/:id", async (request, response) => {
  const { id } = request.params

  try {
    const project = await prisma.project.findUnique({
      where: { id: id }
    })

    if(!project) return response.status(404).json({ error: 'Project not found' })

    response.json(project)
  } catch (error) {
    response.status(500).json({ error: 'Faile to fetch project' })
  }
});

const generateId = () => {
  const maxId = projects.length > 0
  ? Math.max(...projects.map(p => Number(p.id)))
  : 0

  return String(maxId + 1)
}

app.post('/garvinchimone/projects', async (request, response) => {
  const { name, techStack, website, picture, description } = request.body

  if(!name || !techStack || !website) {
    return response.status(400).json({ error: 'Miising required fields' })
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        techStack,
        website,
        picture,
        description,
      }
    })
    response.json(newProject)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create project' })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
