const http = require('http')

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

// createServer method of the http module used to create the web server
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'text/plain' })
  response.end(JSON.stringify(projects))
})

// binds the http server assigned to the app variable to listen to HTTP requests on port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)