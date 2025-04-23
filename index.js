const express = require('express') //import express which is a function for making an express application
// which is stored in the app variable
const app = express()

const projects = [
  {
    id: '1',
    name: 'Kids Heaven Book Store',
    techStack: ['html', 'reactjs', 'tailwind'],
    website: 'http://kidsheavenbooks',
    picture: ['pic1', 'pic2'],
    description: 'this is a great site to order books'
  },
  {
    id: '1',
    name: 'Kids Heaven Book Store',
    techStack: ['html', 'reactjs', 'tailwind'],
    website: 'http://kidsheavenbooks',
    picture: ['pic1', 'pic2'],
    description: 'this is a great site to order books'
  }
]

app.get('/', (request, response) => { //original routes
  response.send('<h1>Hello Garvin</h1')
})

app.get('/garvinAPI/projects', (request, response) => {
  response.json(projects) // no need for stringify because in express the conversion happens automatically
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
