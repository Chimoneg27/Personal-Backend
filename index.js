const express = require("express"); //import express which is a function for making an express application
// which is stored in the app variable
import { PrismaClient } from './generated/prisma'
const prisma = new PrismaClient()
const app = express();
const cors = require('cors')

app.use(express.json()) // json parser. converts JSON into a usable data structure

let projects = [
  {
    id: "1",
    name: "Kids Heaven Book Store",
    techStack: ["html", "reactjs", "tailwind"],
    website: "http://kidsheavenbooks",
    picture: 'pic1',
    description: "this is a great site to order books",
  },
  {
    id: "2",
    name: "Kids Heaven Book Store",
    techStack: ["html", "reactjs", "tailwind"],
    website: "http://kidsheavenbooks",
    picture: "pic 1",
    description: "this is a great site to order books",
  },
];

const main = async () => {
  const newBlog = await prisma.blog.create({
    data: {
      title: 'General Overview',
      content: `<p>This blog section of my personal portfolio will be for displaying my interests, current and future.</p><p>Expect to see content about my hobbies, random thoughts, and ideas for what's ahead.</p>`,
      author: 'Garvin Chimone',
      image: 'https://i.pinimg.com/736x/53/bd/a8/53bda8ac30f17d6cb250658167461dbe.jpg',
      tags: ['Hobbies', 'Misc']
    }
  })

  const allProjects = await prisma.project.findMany()
  const allBlogs = await prisma.blog.findMany()
  console.log(allBlogs)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.get("/", (request, response) => {
  //original routes
  response.send("<h1>Hello Garvin</h1");
});

app.get("/garvinchimone/projects", (request, response) => {
  response.json(projects); // no need for stringify because in express the conversion happens automatically
});

app.get("/garvinchimone/projects/:id", (request, response) => {
  const id = request.params.id; // access the id of the particuluar project
  const project = projects.find((p) => p.id === id);
  if (project) {
    response.json(project);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = projects.length > 0
  ? Math.max(...projects.map(p => Number(p.id)))
  : 0

  return String(maxId + 1)
}

app.post('/garvinchimone/projects', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const project = {
    name: body.name,
    techStack: body.techStack,
    website: body.website,
    picture: body.picture,
    description: body.description,
    id: generateId()
  }

  projects = projects.concat(project)

  response.json(project)
})

app.delete('/garvinchimone/projects/:id', (request, response) => {
  const id = request.params.id
  projects = projects.filter(p => p.id !== id)

  response.status(204).end()
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
