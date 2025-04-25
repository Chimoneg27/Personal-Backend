const express = require("express"); //import express which is a function for making an express application
// which is stored in the app variable
const app = express();

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
    id: generateId
  }

  projects = projects.concat(project)

  response.json(project)
})

app.delete('/garvinchimone/projects/:id', (request, response) => {
  const id = request.id
  projects = projects.filter(p => p.id !== id)

  response.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
