import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Technology from '../models/Technology.js';
import Testimonial from '../models/Testimonial.js';
import TeamMember from '../models/TeamMember.js';
import AboutProfile from '../models/AboutProfile.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample Projects Data
const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with shopping cart, payment integration, order management, and admin dashboard. Built with MERN stack and includes real-time inventory tracking.',
    shortDescription: 'Full-stack e-commerce website with React and Node.js',
    category: 'E-Commerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        publicId: 'portfolio/ecommerce-1',
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400'
      }
    ],
    featured: true,
    published: true,
    displayOrder: 1,
    liveUrl: 'https://minishopofrawaha.netlify.app/',
  },
  {
    title: 'Kite - Interactive Portfolio',
    slug: 'kite-portfolio',
    description: 'A modern, responsive portfolio website featuring cinematic GSAP animations, smooth scrolling, interactive UI components, and dark/light theme toggle. Built with React and modern web technologies.',
    shortDescription: 'Cinematic animated portfolio with GSAP',
    category: 'Landing Page',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Vite'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
        publicId: 'portfolio/kite-1',
        thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400'
      }
    ],
    featured: true,
    published: true,
    displayOrder: 2,
    liveUrl: 'https://kite-eight-eta.vercel.app/',
  },
  {
    title: 'Admin Dashboard',
    slug: 'admin-dashboard',
    description: 'Professional admin dashboard with advanced data visualization, real-time statistics, user management, and comprehensive analytics. Features responsive design and interactive charts.',
    shortDescription: 'Modern admin dashboard with analytics',
    category: 'Dashboard',
    technologies: ['React', 'Chart.js', 'Material-UI', 'JavaScript'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        publicId: 'portfolio/dashboard-1',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
      }
    ],
    featured: true,
    published: true,
    displayOrder: 3,
    liveUrl: 'https://demo-dashboard-seven-hazel.vercel.app/',
  },
  {
    title: 'Task Management App',
    slug: 'task-management',
    description: 'Collaborative task management application with drag-and-drop functionality, team collaboration features, and deadline tracking. Includes real-time updates and notifications.',
    shortDescription: 'Team collaboration and task tracking',
    category: 'Web Application',
    technologies: ['React', 'Firebase', 'Material-UI', 'React DnD'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        publicId: 'portfolio/tasks-1',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
      }
    ],
    featured: false,
    published: true,
    displayOrder: 4,
  },
  {
    title: 'Social Media Platform',
    slug: 'social-media',
    description: 'Full-featured social media platform with posts, comments, likes, real-time messaging, and user profiles. Includes authentication, image uploads, and notification system.',
    shortDescription: 'Social networking with real-time features',
    category: 'Web Application',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Cloudinary'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        publicId: 'portfolio/social-1',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'
      }
    ],
    featured: false,
    published: true,
    displayOrder: 5,
  },
];

// Sample Services Data
const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'Complete end-to-end web application development using modern technologies like MERN stack. From database design to responsive frontend, I deliver scalable and maintainable solutions.',
    category: 'Development',
    price: 'Starting at $2000',
    icon: 'https://cdn-icons-png.flaticon.com/512/1336/1336494.png',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    published: true,
    displayOrder: 1,
  },
  {
    title: 'Frontend Development',
    description: 'Create stunning, responsive, and performant user interfaces using React, Vue, or Angular. Focus on user experience, accessibility, and modern design principles.',
    category: 'Frontend',
    price: 'Starting at $1500',
    icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
    published: true,
    displayOrder: 2,
  },
  {
    title: 'Backend API Development',
    description: 'Build robust RESTful APIs and GraphQL endpoints with Node.js, Express, and MongoDB. Includes authentication, authorization, and database optimization.',
    category: 'Backend',
    price: 'Starting at $1800',
    icon: 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    published: true,
    displayOrder: 3,
  },
  {
    title: 'UI/UX Design',
    description: 'Design beautiful and intuitive user interfaces with modern design tools. Create wireframes, prototypes, and high-fidelity mockups that enhance user experience.',
    category: 'Design',
    price: 'Starting at $1000',
    icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    published: true,
    displayOrder: 4,
  },
  {
    title: 'Website Maintenance',
    description: 'Keep your website running smoothly with regular updates, bug fixes, security patches, and performance optimization. Monthly maintenance packages available.',
    category: 'Support',
    price: 'Starting at $500/month',
    icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800',
    published: true,
    displayOrder: 5,
  },
];

// Sample Technologies Data
const technologies = [
  { 
    name: 'React', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 
      publicId: 'tech/react' 
    }, 
    altText: 'React logo',
    category: 'Frontend', 
    published: true,
    displayOrder: 1 
  },
  { 
    name: 'Node.js', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 
      publicId: 'tech/nodejs' 
    }, 
    altText: 'Node.js logo',
    category: 'Backend', 
    published: true,
    displayOrder: 2 
  },
  { 
    name: 'MongoDB', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 
      publicId: 'tech/mongodb' 
    }, 
    altText: 'MongoDB logo',
    category: 'Database', 
    published: true,
    displayOrder: 3 
  },
  { 
    name: 'Express', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 
      publicId: 'tech/express' 
    }, 
    altText: 'Express.js logo',
    category: 'Backend', 
    published: true,
    displayOrder: 4 
  },
  { 
    name: 'JavaScript', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 
      publicId: 'tech/javascript' 
    }, 
    altText: 'JavaScript logo',
    category: 'Frontend', 
    published: true,
    displayOrder: 5 
  },
  { 
    name: 'TypeScript', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
      publicId: 'tech/typescript' 
    }, 
    altText: 'TypeScript logo',
    category: 'Frontend', 
    published: true,
    displayOrder: 6 
  },
  { 
    name: 'Tailwind CSS', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', 
      publicId: 'tech/tailwind' 
    }, 
    altText: 'Tailwind CSS logo',
    category: 'Frontend', 
    published: true,
    displayOrder: 7 
  },
  { 
    name: 'Git', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 
      publicId: 'tech/git' 
    }, 
    altText: 'Git logo',
    category: 'DevOps', 
    published: true,
    displayOrder: 8 
  },
  { 
    name: 'Docker', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 
      publicId: 'tech/docker' 
    }, 
    altText: 'Docker logo',
    category: 'DevOps', 
    published: true,
    displayOrder: 9 
  },
  { 
    name: 'Firebase', 
    logo: { 
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', 
      publicId: 'tech/firebase' 
    }, 
    altText: 'Firebase logo',
    category: 'Backend', 
    published: true,
    displayOrder: 10 
  },
];

// Sample Testimonials Data
const testimonials = [
  {
    clientName: 'Sarah Johnson',
    clientTitle: 'CEO, TechStart Inc',
    testimonial: 'Working with Muhammad was an absolute pleasure! He delivered our e-commerce platform ahead of schedule and exceeded all our expectations. His attention to detail and technical expertise are outstanding.',
    rating: 5,
    clientImage: 'https://i.pravatar.cc/150?img=5',
    projectName: 'E-Commerce Platform',
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    clientName: 'Michael Chen',
    clientTitle: 'Founder, DesignHub',
    testimonial: 'Muhammad transformed our outdated website into a modern, fast, and beautiful platform. The GSAP animations he implemented are smooth and professional. Highly recommended!',
    rating: 5,
    clientImage: 'https://i.pravatar.cc/150?img=12',
    projectName: 'Portfolio Redesign',
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    clientName: 'Emily Rodriguez',
    clientTitle: 'Product Manager, CloudTech',
    testimonial: 'Excellent communication and technical skills. Muhammad understood our requirements perfectly and delivered a robust API that scaled with our growing user base.',
    rating: 5,
    clientImage: 'https://i.pravatar.cc/150?img=9',
    projectName: 'Backend API Development',
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    clientName: 'David Park',
    clientTitle: 'CTO, StartupX',
    testimonial: 'Muhammad is a talented developer who brings creative solutions to complex problems. Our task management app is now running smoothly thanks to his expertise.',
    rating: 5,
    clientImage: 'https://i.pravatar.cc/150?img=15',
    projectName: 'Task Management App',
    featured: false,
    published: true,
    displayOrder: 4,
  },
];

// Sample Team Members Data
const teamMembers = [
  {
    name: 'Muhammad Rawaha',
    role: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer with expertise in MERN stack and modern web technologies. Love creating elegant solutions to complex problems.',
    avatar: 'https://i.pravatar.cc/300?img=33',
    email: 'portfolioadmin@rawaha.me',
    social: {
      linkedin: 'https://linkedin.com/in/rawaha',
      github: 'https://github.com/rawaha',
      twitter: 'https://twitter.com/rawaha',
    },
    displayOrder: 1,
  },
];

// Sample About Profile Data
const aboutProfile = {
  name: 'Muhammad Rawaha',
  title: 'Full-Stack Web Developer',
  bio: 'I am a passionate full-stack developer with 3+ years of experience building modern web applications. I specialize in the MERN stack and love creating seamless user experiences with clean, maintainable code.',
  longBio: 'With a strong foundation in both frontend and backend development, I bring ideas to life through code. My journey in web development started with a curiosity about how websites work, and it has grown into a deep passion for creating elegant, scalable solutions.\n\nI believe in writing clean, maintainable code and following best practices. Whether it\'s crafting pixel-perfect user interfaces or building robust APIs, I approach every project with attention to detail and a commitment to quality.\n\nWhen I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
  avatar: 'https://i.pravatar.cc/400?img=33',
  resumeUrl: '#',
  yearsOfExperience: 3,
  completedProjects: 50,
  happyClients: 30,
  skills: [
    'React.js',
    'Node.js',
    'MongoDB',
    'Express.js',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'GSAP Animations',
    'RESTful APIs',
    'Git & GitHub',
  ],
  contact: {
    email: 'portfolioadmin@rawaha.me',
    phone: '+92-XXX-XXXXXXX',
    location: 'Pakistan',
  },
  social: {
    linkedin: 'https://linkedin.com/in/rawaha',
    github: 'https://github.com/rawaha',
    twitter: 'https://twitter.com/rawaha',
    instagram: 'https://instagram.com/rawaha',
  },
};

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Technology.deleteMany({});
    await Testimonial.deleteMany({});
    await TeamMember.deleteMany({});
    await AboutProfile.deleteMany({});

    console.log('✨ Seeding Projects...');
    await Project.insertMany(projects);
    console.log(`✅ ${projects.length} projects seeded`);

    console.log('✨ Seeding Services...');
    await Service.insertMany(services);
    console.log(`✅ ${services.length} services seeded`);

    console.log('✨ Seeding Technologies...');
    await Technology.insertMany(technologies);
    console.log(`✅ ${technologies.length} technologies seeded`);

    console.log('✨ Seeding Testimonials...');
    await Testimonial.insertMany(testimonials);
    console.log(`✅ ${testimonials.length} testimonials seeded`);

    console.log('✨ Seeding Team Members...');
    await TeamMember.insertMany(teamMembers);
    console.log(`✅ ${teamMembers.length} team members seeded`);

    console.log('✨ Seeding About Profile...');
    await AboutProfile.create(aboutProfile);
    console.log('✅ About profile seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • Projects: ${projects.length}`);
    console.log(`   • Services: ${services.length}`);
    console.log(`   • Technologies: ${technologies.length}`);
    console.log(`   • Testimonials: ${testimonials.length}`);
    console.log(`   • Team Members: ${teamMembers.length}`);
    console.log(`   • About Profile: 1`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
