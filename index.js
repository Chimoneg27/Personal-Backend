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
    picture: ["pic1", "pic2"],
    description: "this is a great site to order books",
  },
  {
    id: "2",
    name: "Kids Heaven Book Store",
    techStack: ["html", "reactjs", "tailwind"],
    website: "http://kidsheavenbooks",
    picture: ["pic1", "pic2"],
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

app.post('garvinchimone/projects', (request, response) => {
  const project = request.body
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
