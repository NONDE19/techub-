🚀 TechHub Zambia — Professional Developer Ecosystem & Platform
![Image](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![Image](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Image](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)
![Image](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)
![Image](https://img.shields.io/badge/Android-SQLite_18_Tables-3DDC84?logo=android&logoColor=white)
![Image](https://img.shields.io/badge/License-MIT-green.svg)
TechHub Zambia is an all-in-one professional networking and ecosystem platform purpose-built for software engineers, UI/UX designers, IT professionals, tech founders, and tech recruiters across Zambia and Africa.
Designed with a high-performance React 19 + TypeScript + Tailwind CSS frontend alongside a companion 18-Table Native Android SQLite Database Blueprint (DatabaseHelper.java), TechHub bridges the gap between web communities and offline-first mobile applications.
📑 Table of Contents
Key Features
Architecture & Tech Stack
Android SQLite Blueprint (18 Tables)
Directory Structure
Getting Started
Available Scripts
Configuration
Contributing
License
✨ Key Features
1. 📰 Community Feed & Developer Posts
Rich social feed with support for formatted code snippets, multi-tag categorization, and technical articles.
Real-time like counts, nested commenting threads, bookmarking, and post sharing.
Filter feeds by topic: General Discussions, Project Launches, Code Snippets, or Technical Articles.
2. 🚀 Projects Showcase
Community portfolio showcase displaying projects built by Zambian and international developers.
Direct links to GitHub repositories, Live Demos, tech stack badges, and community star ratings.
Star, bookmark, and filter projects by technologies (React, Kotlin, Python, Flutter, Node.js, etc.).
3. 💼 Jobs & Freelance Marketplace
Comprehensive job board tailored for African tech talent and global remote opportunities.
Filters for Full-Time, Contract, Remote, Part-Time, and Internships with clear compensation ranges in ZMW / USD.
One-click application modal with resume upload simulator and status tracking.
4. 👥 Specialized Tech Communities
Join interest-based hubs including Lusaka Developers, Mobile Dev Zambia (Android/Flutter), Python Zambia, DevOps & Cloud ZM, and Women in Tech ZM.
Dedicated group forums, event announcements, and member directories.
5. 🎓 TechHub Academy
Industry-aligned tech courses spanning Full-Stack Web Development, Native Android (Kotlin & SQLite), Cloud Architecture, and Data Science.
Track course completion progress, lesson milestones, and certifications.
6. 📅 Tech Events & Hackathons
Discover upcoming tech meetups, workshops, and hackathons (e.g., Lusaka Tech Summit, ZedCode Hackathon).
RSVP tracking, venue details, calendar integration, and virtual access links.
7. 💬 Direct Developer Messaging
Direct peer-to-peer messaging system for collaboration, mentoring, and recruiter outreach.
Unread message counters, timestamps, and active developer status.
8. 👤 Developer Profiles & Portfolio
Detailed profiles featuring bio, headline, skills tags, GitHub/LinkedIn links, years of experience, and resume management.
Follow/Unfollow mechanism with dynamic follower and following counts.
9. 📱 Native Android SQLite Blueprint (DatabaseHelper.java)
Embedded code inspector and exporter for native Android implementations.
Generates a production-grade SQLiteOpenHelper managing 18 normalized database tables with foreign key constraints, indexes, and sample queries.
10. 🛡️ Admin Dashboard & Governance
Overview of platform metrics: total active users, jobs listed, projects submitted, and pending applications.
Moderation tools to review postings, verify developers, and inspect platform health.
🛠 Architecture & Tech Stack
Layer	Technology	Description
Frontend Framework	React 19	Modern concurrent UI architecture with Hooks
Language	TypeScript 5.8	Strict type safety for data models and state
Build Tool	Vite 6.2	Ultra-fast HMR and bundle optimization
Styling	Tailwind CSS v4	Modern utility-first CSS with dark theme support
Icons	Lucide React	Crisp, lightweight developer icon pack
State Management	React Context API	Centralized reactive store with localStorage persistence
Mobile DB Engine	Android SQLite	18-Table relational embedded database blueprint
🗄 Android SQLite Blueprint (18 Tables)
TechHub includes a full native Android database layer capable of driving an offline-first companion application. The companion helper can be exported directly from the Android Blueprint tab.
code
Code
┌────────────────────────┐
       │       tbl_users        │
       └───────────┬────────────┘
                   │
     ┌─────────────┼─────────────┬─────────────┐
     ▼             ▼             ▼             ▼
┌───────────┐┌───────────┐┌───────────┐┌───────────┐
│ tbl_posts ││tbl_project││ tbl_jobs  ││tbl_message│
└─────┬─────┘└───────────┘└─────┬─────┘└───────────┘
      │                         │
 ┌────┴────┐               ┌────┴────────┐
 ▼         ▼               ▼             ▼
tbl_comments tbl_likes   tbl_applicants tbl_bookmarks
Table Breakdown:
tbl_users — User profiles, credentials, skills, and social handles
tbl_posts — Developer feed posts and code snippets
tbl_comments — Comments associated with community posts
tbl_post_likes — Like tracking with composite keys
tbl_projects — Portfolio projects and repository links
tbl_project_stars — Star bookmarks on developer projects
tbl_jobs — Job listings and freelance opportunities
tbl_job_applications — User applications submitted to jobs
tbl_communities — Tech groups and regional hubs
tbl_community_members — User memberships in communities
tbl_courses — Learning modules and tech curriculum
tbl_course_enrollments — Student progress and enrollment
tbl_events — Hackathons, conferences, and meetups
tbl_event_rsvps — Event attendance reservations
tbl_messages — Peer-to-peer direct chat messages
tbl_notifications — User activity alerts and updates
tbl_skills — Global taxonomy of developer skill tags
tbl_user_skills — Relational skill mappings per profile
📂 Directory Structure
code
Text
techhub-zambia/
├── index.html                  # HTML entry point with metadata and fonts
├── package.json                # Project dependencies and run scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with Tailwind CSS v4
├── metadata.json               # Platform metadata configuration
└── src/
    ├── main.tsx                # Application bootstrap
    ├── App.tsx                 # Root layout & tab router
    ├── types.ts                # TypeScript interfaces (Post, Job, User, Project, etc.)
    ├── index.css               # Global Tailwind CSS directives & dark theme
    ├── context/
    │   └── TechHubContext.tsx  # Centralized state provider & local storage engine
    ├── data/
    │   └── mockData.ts         # Realistic Zambian developer ecosystem seed data
    └── components/
        ├── Header.tsx          # Top navigation bar, search trigger & profile toggle
        ├── Sidebar.tsx         # Responsive desktop/mobile navigation sidebar
        ├── Feed.tsx            # Main social feed with code previews & comments
        ├── CreatePostModal.tsx # Post & code snippet composer modal
        ├── ProjectsShowcase.tsx# Developer project directory & star system
        ├── JobsMarketplace.tsx # Jobs board, filters, and application modal
        ├── Communities.tsx     # Tech hub groups and community discussions
        ├── CoursesView.tsx     # TechHub Academy courses and progress tracker
        ├── EventsView.tsx      # Hackathons and meetup RSVP system
        ├── MessagingView.tsx   # Direct chat & conversation manager
        ├── ProfileView.tsx     # Full developer profile, skills, and portfolio
        ├── AndroidCodeBlueprint.tsx # SQLite 18-table Java/Android code generator
        ├── AdminDashboard.tsx  # Platform analytics & moderation interface
        ├── AuthModal.tsx       # Sign in / registration dialog
        ├── GlobalSearchModal.tsx # Omnisearch for devs, jobs, and projects
        ├── NotificationsDrawer.tsx # Notification alerts slide-over
        └── SettingsModal.tsx   # Appearance, roles, and preferences dialog
🚀 Getting Started
Prerequisites
Ensure you have the following installed on your development machine:
Node.js (v18.0.0 or higher recommended)
npm, pnpm, or bun
Installation
Clone the repository:
code
Bash
git clone https://github.com/your-username/techhub-zambia.git
cd techhub-zambia
Install project dependencies:
code
Bash
npm install
Start the local development server:
code
Bash
npm run dev
Open your browser:
Navigate to http://localhost:3000 to view the application.
📜 Available Scripts
In the project directory, you can run:
Command	Action
npm run dev	Starts the Vite development server on port 3000
npm run build	Compiles TypeScript and creates optimized production bundle in dist/
npm run preview	Locally previews the production build
npm run lint	Runs tsc --noEmit to validate all TypeScript types
npm run clean	Cleans build artifacts (dist and generated outputs)
⚙️ Configuration
Copy .env.example to .env if custom environment variables are required:
code
Bash
cp .env.example .env
Default configuration works immediately out of the box with embedded mock seed data stored safely in your browser's local state.
🤝 Contributing
Contributions to empower the Zambian and African developer community are warmly welcomed!
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.
<div align="center">
<sub>Built with ❤️ for the Zambian Tech & Developer Community.</sub>
</div>
