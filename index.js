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
    response.status(500).json({ error: 'Failed to fetch project' })
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

app.get('garvinchimone/blogs', async (request, response) => {
  try {
    const blogs = await prisma.blog.findMany()
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch blogs' })
  }
})

app.get('/garvinchimone/blogs/:id', async (request, response) => {
  const { id } = request.params

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: id }
    })

    if(!blog) return response.status(404).json({ error: 'Blog not found' })
    
    response.json(blog)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch individual blog' })
  }
})

app.post('/garvinchimone/projects', async (request, response) => {
  const { title, content, author, image, tags } = request.body

  if(!title || !author) {
    return response.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        author,
        image,
        tags,
      }
    })
    response.json(newBlog)
  } catch (error) {
    response.status(500).json({ error: 'Failed to post blog' })
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
