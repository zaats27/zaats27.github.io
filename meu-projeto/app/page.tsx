"use client"

import { Download, Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Check for user preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (prefersDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  // Intersection observers for scroll animations
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted">
      <motion.header
        className="sticky top-0 z-40 border-b backdrop-blur-md bg-background/80"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div className="font-bold text-gradient" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Manoela Stanley
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {["about", "skills", "projects", "contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium hover:text-primary relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="capitalize">{item}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary-accent hover:opacity-90">
                <a href="/cv.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <motion.section
          id="about"
          className="container py-12 md:py-24 lg:py-32"
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div className="space-y-4" variants={fadeIn}>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm Manoela Stanley
              </motion.h1>
              <motion.p
                className="text-muted-foreground md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                A passionate Full Stack Developer with 5+ years of experience building web applications that solve
                real-world problems.
              </motion.p>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="bg-gradient-to-r from-primary to-primary-accent hover:opacity-90">
                    <a href="#contact">Contact Me</a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" className="border-primary hover:bg-primary/10">
                    <a href="#projects">View Projects</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05, rotate: 2 }} transition={{ duration: 0.3 }}>
                <Avatar className="h-64 w-64 border-4 border-primary/20 shadow-xl">
                  <AvatarImage src="/placeholder.svg?height=256&width=256" alt="John Doe" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-accent text-4xl text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          id="skills"
          className="container py-12 md:py-24 lg:py-32 border-t"
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="mx-auto grid max-w-5xl gap-6">
            <div className="space-y-2 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent"
                variants={fadeIn}
              >
                Skills & Expertise
              </motion.h2>
              <motion.p className="text-muted-foreground md:text-xl" variants={fadeIn}>
                My technical skills and areas of expertise
              </motion.p>
            </div>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
            >
              {[
                {
                  title: "Frontend Development",
                  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
                },
                {
                  title: "Backend Development",
                  skills: ["Node.js", "Express", "Python", "Django", "SQL"],
                },
                {
                  title: "DevOps & Tools",
                  skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel"],
                },
              ].map((category, index) => (
                <motion.div key={index} variants={cardVariants} whileHover="hover">
                  <Card className="border-primary/10 overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <CardTitle className="text-primary">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-6">
                      <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                        {category.skills.map((skill, i) => (
                          <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge className="bg-gradient-to-r from-primary/80 to-primary-accent/80 hover:from-primary hover:to-primary-accent transition-all duration-300">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          id="projects"
          className="container py-12 md:py-24 lg:py-32 border-t"
          ref={projectsRef}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="mx-auto grid max-w-5xl gap-8">
            <div className="space-y-2 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent"
                variants={fadeIn}
              >
                Projects
              </motion.h2>
              <motion.p className="text-muted-foreground md:text-xl" variants={fadeIn}>
                Highlighted projects and work
              </motion.p>
            </div>
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary-accent/90 data-[state=active]:text-white transition-all duration-300"
                >
                  Featured Projects
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary-accent/90 data-[state=active]:text-white transition-all duration-300"
                >
                  All Projects
                </TabsTrigger>
              </TabsList>
              <TabsContent value="featured">
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    {
                      title: "E-commerce Platform",
                      description: "A full-stack e-commerce solution",
                      details:
                        "Built with React, Node.js, and MongoDB. Features include user authentication, product management, and payment processing.",
                    },
                    {
                      title: "Task Management App",
                      description: "A productivity application",
                      details:
                        "A Kanban-style task management application with drag-and-drop functionality, built with Next.js and Firebase.",
                    },
                    {
                      title: "AI Content Generator",
                      description: "An AI-powered writing assistant",
                      details:
                        "Leverages OpenAI's API to generate content for various purposes. Built with React and Express.",
                    },
                  ].map((project, index) => (
                    <motion.div key={index} variants={cardVariants} whileHover="hover">
                      <Card className="border-primary/10 h-full flex flex-col overflow-hidden">
                        <CardHeader className="bg-muted/30">
                          <CardTitle className="text-primary">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="py-4 flex-grow">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden rounded-md mb-4"
                          >
                            <img
                              src="/placeholder.svg?height=200&width=400"
                              alt={`${project.title} project`}
                              className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </motion.div>
                          <p className="text-sm text-muted-foreground">{project.details}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              asChild
                              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Demo
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              asChild
                              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Code
                              </a>
                            </Button>
                          </motion.div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="all">
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    {
                      title: "E-commerce Platform",
                      description: "A full-stack e-commerce solution",
                      details:
                        "Built with React, Node.js, and MongoDB. Features include user authentication, product management, and payment processing.",
                    },
                    {
                      title: "Task Management App",
                      description: "A productivity application",
                      details:
                        "A Kanban-style task management application with drag-and-drop functionality, built with Next.js and Firebase.",
                    },
                    {
                      title: "AI Content Generator",
                      description: "An AI-powered writing assistant",
                      details:
                        "Leverages OpenAI's API to generate content for various purposes. Built with React and Express.",
                    },
                    {
                      title: "Weather Dashboard",
                      description: "Real-time weather application",
                      details:
                        "A weather application that shows current and forecast weather for any location, built with React and the OpenWeatherMap API.",
                    },
                    {
                      title: "Fitness Tracker",
                      description: "Health and exercise monitoring app",
                      details:
                        "An application for tracking workouts, nutrition, and fitness goals, built with React Native and Firebase.",
                    },
                    {
                      title: "Recipe Finder",
                      description: "Culinary discovery platform",
                      details:
                        "A recipe search and discovery application that helps users find meals based on ingredients they have, built with Vue.js and the Spoonacular API.",
                    },
                  ].map((project, index) => (
                    <motion.div key={index} variants={cardVariants} whileHover="hover">
                      <Card className="border-primary/10 h-full flex flex-col overflow-hidden">
                        <CardHeader className="bg-muted/30">
                          <CardTitle className="text-primary">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="py-4 flex-grow">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden rounded-md mb-4"
                          >
                            <img
                              src="/placeholder.svg?height=200&width=400"
                              alt={`${project.title} project`}
                              className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </motion.div>
                          <p className="text-sm text-muted-foreground">{project.details}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              asChild
                              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Demo
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              asChild
                              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Code
                              </a>
                            </Button>
                          </motion.div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>
        <motion.section
          id="contact"
          className="container py-12 md:py-24 lg:py-32 border-t"
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="mx-auto grid max-w-5xl gap-6">
            <div className="space-y-2 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent"
                variants={fadeIn}
              >
                Contact Me
              </motion.h2>
              <motion.p className="text-muted-foreground md:text-xl" variants={fadeIn}>
                Get in touch for opportunities or collaborations
              </motion.p>
            </div>
            <motion.div className="grid gap-6 md:grid-cols-2" variants={staggerContainer}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-primary/10 h-full">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-primary">Send Me a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form className="grid gap-4">
                      <motion.div
                        className="grid gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                          placeholder="Your name"
                        />
                      </motion.div>
                      <motion.div
                        className="grid gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                          placeholder="Your email"
                        />
                      </motion.div>
                      <motion.div
                        className="grid gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                          placeholder="Your message"
                          rows={4}
                        ></textarea>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:opacity-90"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-primary/10 h-full">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-primary">Connect With Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {[
                      { icon: Mail, text: "johndoe@example.com", href: "mailto:johndoe@example.com" },
                      { icon: Linkedin, text: "linkedin.com/in/johndoe", href: "https://linkedin.com/in/johndoe" },
                      { icon: Github, text: "github.com/johndoe", href: "https://github.com/johndoe" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 group"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="p-2 rounded-full bg-primary/10 text-primary"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                        >
                          <item.icon className="h-6 w-6" />
                        </motion.div>
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors duration-300 group-hover:underline"
                        >
                          {item.text}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      className="mt-8"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary"
                        >
                          <a href="/cv.pdf" download>
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        className="border-t py-6 md:py-8 bg-muted/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">© 2023 John Doe. All rights reserved.</p>
          <motion.nav className="flex gap-4" variants={staggerContainer} initial="hidden" animate="visible">
            {["about", "skills", "projects", "contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium hover:text-primary transition-colors duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="capitalize">{item}</span>
              </motion.a>
            ))}
          </motion.nav>
        </div>
      </motion.footer>
    </div>
  )
}

