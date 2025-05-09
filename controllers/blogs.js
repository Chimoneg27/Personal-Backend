const blogsRouter = require('express').Router()
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await prisma.blog.findMany()
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch blogs' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
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

blogsRouter.post('/', async (request, response) => {
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

module.exports = blogsRouter