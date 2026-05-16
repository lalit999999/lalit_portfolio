import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
  Database,
  Server,
  Layout,
  Terminal,
  Cpu,
  FileCode2,
  Hash,
  Wifi,
  Container,
} from "lucide-react";

export const portfolioData = {
  personalInfo: {
    name: "Lalit Gurjar",
    tagline:
      "Full Stack Developer | Node js guy which build scalable solution ",
    description:
      "Hi! I’m Lalit, a Student in NIT Patna. I have a passion for building web applications and love Reading articles and books. My approach combines technical expertise with creative problem-solving to deliver exceptional results.",
    image:
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1778235248/WhatsApp_Image_2026-05-08_at_15.43.16_hkrbuz.jpg",
    resumeLink:
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1778955545/NIT_Patna_Resume_Template_v2_1-1_rgveom.pdf",
  },
  education: [
    {
      id: 1,
      title: "B.Tech in Computer Science",
      institution: "NIT Patna",
      year: "2024 - present",
    },
    {
      id: 2,
      title: "Higher Secondary (12th)",
      institution: "MHBGSSS patodi",
      board: "RBSE",
      year: "2023",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "HTML5", icon: Layout },
        { name: "Tailwind CSS", icon: Layout },
        { name: "React", icon: Code2 },
        { name: "NEXTJS", icon: Layout },
        { name: "Vite", icon: Code2 },
      ],
    },
    {
      category: "language",
      items: [
        { name: "C++", icon: Code2 },
        { name: "Python", icon: Layout },
        { name: "JavaScript", icon: FileCode2 },
        { name: "C", icon: FileCode2 },
      ],
    },
    {
      category: "Backend & API",
      items: [
        { name: "Node.js", icon: Server },
        { name: "Express", icon: Server },
        { name: "Postman", icon: Server },
        { name: "REST API", icon: Server },
        // Postman ,REST api
        // { name: "Python", icon: Terminal },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", icon: Database },
        { name: "MySQL", icon: Database },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git/Github", icon: Terminal },
        { name: "VScode", icon: Terminal },
        { name: "Docker", icon: Container },
        // { name: "Docker", icon: Cpu },
      ],
    },
  ],
  learning: {
    technologies: ["Next.js 14", "System Design"],
    note: "Currently deep diving into distributed systems and high-performance computing.",
  },
  projects: [
    {
      id: 1,
      title: "PollMan – Full-Stack Real-Time Poll & Survey Platform",
      description:
        "A modern full-stack real-time poll and survey platform with live analytics, public sharing, poll publishing, and interactive dashboards built using React, Node.js, MongoDB, Socket.IO, and Recharts",

      tech: [
        "React",
        "Typescript",
        "Express.js",
        "Node JS",
        "Socket.IO",

        "Oauth 2.0",
        "Recharts",
      ],
      github: "https://github.com/lalit999999/PollMan",
      live: "https://pollman.onrender.com/",
    },

    {
      id: 2,
      title: "Real-time Rider Location Tracking Application",
      description:
        "A real-time application for tracking rider locations using WebSocket technology. The application allows users to view the live location of riders on a map, providing an interactive and dynamic experience.",
      tech: [
        "HTML5",
        "CSS3",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Redis Pub/Sub",
        "Passport.js",
        "Google Oauth 2.0",
        "CORS",
        "Dotenv",
      ],
      github:
        "https://github.com/lalit999999/realtime-rider-location-tracting-application",
      live: "https://realtime-rider-location-tracting.onrender.com",
    },

    {
      id: 3,
      title: "Local Service Booking Platform (Full stack application)",
      description:
        "Built a MERN-based service marketplace platform with RESTful APIs for services, bookings, categories,and reviews.Implemented JWT authentication and role-based authorization for Customer, Provider, and Admin access ,Designed a booking lifecycle system (Requested → Confirmed → In-progress → Completed → Cancelled).Structured MongoDB schemas using Mongoose for scalable data management and CRUD operations.Integrated image uploads using Multer and Cloudinary for profile and service-related images.",
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Axios",
        "Cloudinary",
        "Multer",
        "CORS",
        "Dotenv",
      ],
      github: "https://github.com/lalit999999/service_provider_frontend",
      live: "https://l-s-p.lalitgurjar.in/",
    },

    {
      id: 4,
      title: "Nebula CheckGrid (Real-time Application)",
      description:
        "Nebula CheckGrid is inspired by the 1 Million Checkboxes idea, but built as a practical full-stack real-time app for learning and evaluation.",
      tech: [
        "HTML5",
        "CSS3",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Redis Pub/Sub",
        "Passport.js",
        "Google Oauth 2.0",
        "CORS",
        "Dotenv",
      ],
      github: "https://github.com/lalit999999/1M-Check_box",
      live: "https://onem-check-box.onrender.com/",
    },
    {
      id: 5,
      title: "WDC Induction Platform",
      description:
        "The WDC Induction Platform is a secure, full-stack web application designed to digitize and automate the student recruitment and onboarding process for the university club. It eliminates manual paperwork by providing a centralized dashboard for both administrators and applicants, streamlining workflows from initial registration to final evaluation",

      tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/lalit999999/wdc_redesign_frontend",
      live: "https://wdc.lalitgurjar.in/",
    },
    {
      id: 6,
      title: "MiniYouTube Backend",
      description:
        "Developed a RESTful backend system for a Mini YouTube–like video sharing platform to manage users,videos, and authentication",
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "bcrypt",
        "Multer",
        "Cloudinary",
      ],
      github: "https://github.com/lalit999999/miniyoutube_backend",
      live: "https://github.com/lalit999999/miniyoutube_backend",
    },
  ],
  certifications: [
    {
      id: 1,
      title: "OCI AI Foundations Associate (2025)",
      issuer: "Oracle",
      date: "sept 2025",
      credentialUrl:
        "https://mylearn.oracle.com/ou/learning-path/become-a-oci-ai-foundations-associate-2025/147781",
      image:
        "https://res.cloudinary.com/dsmyka9cr/image/upload/v1773149399/oraclecirtificate_elmzum.jpg",
      skills: ["Basic ML", "AI"],
      color: "emerald",
    },
    {
      id: 2,
      title: "AWS Cloud Quest: Cloud Practitioner - Training Badge",
      issuer: "Amazon Web Services Training and Certification",
      date: "April 2026",
      credentialUrl:
        "https://www.credly.com/badges/d30fe051-d896-46e7-bd43-3f0077d0fc43/public_url",
      image:
        "https://res.cloudinary.com/dsmyka9cr/image/upload/q_auto/f_auto/v1775403413/aws_labs_cir2_lwhqyd.jpg",
      skills: [
        "Amazon Web Services (AWS)",
        "AWS",
        "AWS Cloud",
        "AWS Cloud Computing",
        "AWS Cloud Foundations",
      ],
      color: "blue",
    },
    // {
    //   id: 3,
    //   title: "SQL and Databases",
    //   issuer: "Coursera",
    //   date: "Mar 2025",
    //   credentialUrl: "#",
    //   image:
    //     "https://res.cloudinary.com/dsmyka9cr/image/upload/v1/certs/sql-cert.jpg",
    //   skills: ["SQL", "MySQL", "Database Design"],
    //   color: "violet",
    // },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/lalit999999", icon: Github },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lalitgujar/",
      icon: Linkedin,
    },
    { name: "Twitter", url: "https://x.com/lalit7363", icon: Twitter },
    { name: "Blog", url: "https://hashnode.com/@lalitgujjar", icon: Hash },
  ],
};
