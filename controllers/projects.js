const projectsRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

projectsRouter.get("/", async (request, response) => {
  try {
    const projects = await prisma.project.findMany();
    response.json(projects);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch projects" });
  }
});

projectsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!project)
      return response.status(404).json({ error: "Project not found" });

    response.json(project);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch project" });
  }
});

projectsRouter.post("/", async (request, response) => {
  const { name, techStack, website, picture, description } = request.body;

  if (!name || !techStack || !website) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        techStack,
        website,
        picture,
        description,
      },
    });
    response.status(201).json(newProject);
  } catch (error) {
    response.status(500).json({ error: "Failed to create project" });
  }
});

module.exports = projectsRouter;