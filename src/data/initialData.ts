import { 
  UserProfile, 
  Post, 
  Project, 
  Job, 
  FreelanceService, 
  Community, 
  Course, 
  TechEvent, 
  ChatConversation, 
  ChatMessage, 
  NotificationItem, 
  ReportItem 
} from '../types';

export const currentUserProfile: UserProfile = {
  id: 'usr_me',
  username: 'chileshe_dev',
  fullName: 'Chileshe Mwamba',
  email: 'chileshe.mwamba@techhub.zm',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
  headline: 'Senior Full Stack & Android Developer @ CopperTech | Tech Community Lead',
  bio: 'Passionate software architect building high-scalability mobile and web apps. Tech enthusiast driving community growth across Lusaka & global tech hubs.',
  location: 'Lusaka, Zambia',
  profession: 'Senior Android & Web Engineer',
  company: 'CopperTech Solutions',
  university: 'University of Zambia (UNZA)',
  role: 'developer',
  yearsOfExperience: 6,
  programmingLanguages: ['Java', 'Kotlin', 'TypeScript', 'Python', 'SQL'],
  skills: ['Android SDK', 'React', 'Node.js', 'SQLite', 'Docker', 'REST APIs', 'Spring Boot'],
  certifications: ['AWS Certified Developer - Associate', 'Meta Professional Android Developer'],
  githubUrl: 'https://github.com/chileshe-dev',
  linkedinUrl: 'https://linkedin.com/in/chileshe-mwamba',
  websiteUrl: 'https://chileshe.dev',
  portfolioUrl: 'https://chileshe.dev/portfolio',
  resumeName: 'Chileshe_Mwamba_CV_2026.pdf',
  followersCount: 1420,
  followingCount: 380,
  joinedDate: 'March 2024'
};

export const sampleUsers: UserProfile[] = [
  currentUserProfile,
  {
    id: 'usr_2',
    username: 'martha_ui',
    fullName: 'Martha Banda',
    email: 'martha.banda@design.zm',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    headline: 'Lead Product Designer @ PayZambia | UI/UX Mentor',
    bio: 'Crafting intuitive fintech and mobile experiences. Design systems enthusiast.',
    location: 'Ndola, Zambia',
    profession: 'UI/UX Design Lead',
    company: 'PayZambia',
    university: 'Copperbelt University',
    role: 'freelancer',
    yearsOfExperience: 5,
    programmingLanguages: ['Figma', 'CSS/Tailwind', 'HTML5'],
    skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Usability Testing'],
    certifications: ['Google UX Design Professional Certificate'],
    githubUrl: 'https://github.com/martha-ui',
    linkedinUrl: 'https://linkedin.com/in/martha-banda',
    followersCount: 2890,
    followingCount: 410,
    joinedDate: 'January 2024'
  },
  {
    id: 'usr_3',
    username: 'kelvin_cyber',
    fullName: 'Kelvin Phiri',
    email: 'kelvin.phiri@securesolutions.co.zm',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    headline: 'Cybersecurity Specialist & Penetration Tester',
    bio: 'Securing cloud infrastructures and mobile endpoints. White-hat hacker & security researcher.',
    location: 'Lusaka, Zambia',
    profession: 'Cybersecurity Engineer',
    company: 'SecurZambia Tech',
    role: 'developer',
    yearsOfExperience: 7,
    programmingLanguages: ['Python', 'Bash', 'C++', 'Go'],
    skills: ['Network Security', 'Ethical Hacking', 'OWASP Top 10', 'Cloud Defenses', 'SIEM'],
    certifications: ['CEH (Certified Ethical Hacker)', 'CISSP'],
    githubUrl: 'https://github.com/kelvin-cyber',
    followersCount: 1950,
    followingCount: 290,
    joinedDate: 'February 2024'
  },
  {
    id: 'usr_4',
    username: 'zanaco_recruiter',
    fullName: 'Natasha Tembo',
    email: 'natasha.t@zanacotech.zm',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    headline: 'Senior Tech Recruiter @ Zanaco Digital Bank',
    bio: 'Hiring world-class engineering, design, and product talent for digital banking innovation in East & Southern Africa.',
    location: 'Lusaka, Zambia',
    profession: 'Talent Acquisition Manager',
    company: 'Zanaco Bank',
    role: 'recruiter',
    yearsOfExperience: 8,
    programmingLanguages: [],
    skills: ['Tech Recruitment', 'Talent Sourcing', 'HR Strategy', 'Interviews'],
    certifications: ['SHRM Senior Certified Professional'],
    linkedinUrl: 'https://linkedin.com/in/natasha-tembo',
    followersCount: 4120,
    followingCount: 920,
    joinedDate: 'November 2023'
  }
];

export const samplePosts: Post[] = [
  {
    id: 'post_1',
    authorId: 'usr_me',
    authorName: 'Chileshe Mwamba',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    authorHeadline: 'Senior Full Stack & Android Developer @ CopperTech',
    content: '🚀 Just published a new custom SQLite DB helper guide for Android Java applications! When working with local embedded SQLite databases without external ORMs, using transactional queries and indexed foreign keys increases read/write throughput by over 300%. Check out this clean Singleton pattern structure below:',
    codeSnippet: {
      language: 'java',
      code: `public class DatabaseHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "TechHub.db";
    private static final int DATABASE_VERSION = 1;
    private static DatabaseHelper instance;

    public static synchronized DatabaseHelper getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseHelper(context.getApplicationContext());
        }
        return instance;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT UNIQUE, email TEXT UNIQUE, password_hash TEXT);");
        db.execSQL("CREATE TABLE posts (id TEXT PRIMARY KEY, user_id TEXT, content TEXT, created_at INTEGER, FOREIGN KEY(user_id) REFERENCES users(id));");
        db.execSQL("CREATE INDEX idx_posts_user ON posts(user_id);");
    }
}`
    },
    type: 'code_snippet',
    likesCount: 142,
    commentsCount: 23,
    sharesCount: 18,
    isLiked: true,
    isSaved: false,
    createdAt: '2 hours ago',
    comments: [
      {
        id: 'c_1',
        postId: 'post_1',
        authorId: 'usr_3',
        authorName: 'Kelvin Phiri',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        authorHeadline: 'Cybersecurity Specialist',
        content: 'Solid implementation! Always remember to disable WAL mode on older devices if thread synchronization is tightly scoped, or enable WAL for concurrent reads.',
        createdAt: '1 hour ago',
        likesCount: 12
      },
      {
        id: 'c_2',
        postId: 'post_1',
        authorId: 'usr_2',
        authorName: 'Martha Banda',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        authorHeadline: 'Lead Product Designer',
        content: 'Awesome breakdown Chileshe! Will be sharing this with our junior Android team.',
        createdAt: '45 mins ago',
        likesCount: 8
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'usr_2',
    authorName: 'Martha Banda',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    authorHeadline: 'Lead Product Designer @ PayZambia',
    content: '🎉 Thrilled to announce the launch of our open-source Mobile Design Kit for African Fintech apps! Includes accessible color palettes, localized currency formatting widgets, and high-contrast night modes. Feedback welcome!',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    type: 'project_update',
    likesCount: 289,
    commentsCount: 34,
    sharesCount: 45,
    isLiked: false,
    isSaved: true,
    createdAt: '5 hours ago',
    comments: []
  },
  {
    id: 'post_3',
    authorId: 'usr_3',
    authorName: 'Kelvin Phiri',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    authorHeadline: 'Cybersecurity Specialist & Penetration Tester',
    content: '⚠️ Critical Security Reminder for Mobile Developers: Never log sensitive parameters or auth tokens in standard Logcat outputs in release builds. Use BuildConfig.DEBUG guards or ProGuard rules to strip debug statements prior to release APK production.',
    type: 'article',
    likesCount: 198,
    commentsCount: 19,
    sharesCount: 62,
    isLiked: false,
    isSaved: false,
    createdAt: '1 day ago',
    comments: []
  }
];

export const sampleProjects: Project[] = [
  {
    id: 'proj_1',
    title: 'Zambia Tech Jobs Mobile App',
    description: 'An open-source native Android application providing offline job caching, instant notification alerts for tech positions across Lusaka and Kitwe, and automatic resume parser.',
    authorId: 'usr_me',
    authorName: 'Chileshe Mwamba',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    screenshots: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
    ],
    githubUrl: 'https://github.com/chileshe-dev/zambia-tech-jobs-android',
    demoUrl: 'https://techjobs.zm/preview',
    technologies: ['Java', 'SQLite', 'Material Design 3', 'REST API', 'Android Studio'],
    starsCount: 340,
    isStarred: true,
    isBookmarked: true,
    createdAt: '3 days ago'
  },
  {
    id: 'proj_2',
    title: 'CopperPay Mobile Wallet Kit',
    description: 'Lightweight UI component library and secure encryption helper for mobile payment integration supporting MTN Mobile Money, Airtel Money, and Zamtel Kwacha APIs.',
    authorId: 'usr_2',
    authorName: 'Martha Banda',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    screenshots: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800'
    ],
    githubUrl: 'https://github.com/martha-ui/copperpay-mobile-ui',
    demoUrl: 'https://copperpay.zm',
    technologies: ['React Native', 'Figma', 'TypeScript', 'Node.js'],
    starsCount: 512,
    isStarred: false,
    isBookmarked: false,
    createdAt: '1 week ago'
  },
  {
    id: 'proj_3',
    title: 'SentinelGuard Android Security Inspector',
    description: 'An automated vulnerability scanner that analyzes installed APKs for hardcoded secret credentials, insecure broadcast receivers, and cleartext HTTP transmissions.',
    authorId: 'usr_3',
    authorName: 'Kelvin Phiri',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    ],
    githubUrl: 'https://github.com/kelvin-cyber/sentinel-guard-apk',
    technologies: ['Java', 'Python', 'Android NDK', 'Security Audit'],
    starsCount: 280,
    isStarred: true,
    isBookmarked: false,
    createdAt: '2 weeks ago'
  }
];

export const sampleJobs: Job[] = [
  {
    id: 'job_1',
    title: 'Senior Android Software Engineer (Java/Kotlin)',
    company: 'Zanaco Digital Bank',
    companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=200',
    location: 'Lusaka, Zambia (Hybrid)',
    type: 'Full-Time',
    salary: 'ZMW 45,000 - 65,000 / month',
    experienceLevel: '4+ Years',
    skillsRequired: ['Java', 'SQLite', 'Android SDK', 'REST APIs', 'Git'],
    description: 'We are seeking an experienced Senior Android Engineer to lead our core retail mobile banking app. You will architect robust offline-first sync pipelines, design secure local databases using SQLite, and work alongside our UI/UX team.',
    requirements: [
      '4+ years hands-on experience building native Android applications in Java or Kotlin',
      'Deep understanding of SQLiteOpenHelper, ContentProviders, and Android Background Services',
      'Experience integrating banking/fintech APIs and SSL Pinning',
      'Strong problem solving and architectural design skills'
    ],
    deadline: 'Aug 15, 2026',
    postedAt: '1 day ago',
    isSaved: true,
    hasApplied: false,
    applicantsCount: 18
  },
  {
    id: 'job_2',
    title: 'Lead Full Stack React & Node Developer',
    company: 'CopperTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    location: 'Remote (Zambia / Southern Africa)',
    type: 'Remote',
    salary: '$3,200 - $4,800 / month',
    experienceLevel: '5+ Years',
    skillsRequired: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Docker'],
    description: 'Join CopperTech to build scalable SaaS products for healthcare and logistics platforms across East and Southern Africa.',
    requirements: [
      'Proficiency in React 18+, TypeScript, and modern state management',
      'Experience building Node.js / Express microservices',
      'Familiarity with cloud deployments (Docker, AWS, GCP)'
    ],
    deadline: 'Aug 20, 2026',
    postedAt: '2 days ago',
    isSaved: false,
    hasApplied: true,
    applicantsCount: 29
  },
  {
    id: 'job_3',
    title: 'UI/UX Mobile Product Designer',
    company: 'PayZambia Innovations',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
    location: 'Ndola, Zambia (On-site)',
    type: 'Full-Time',
    salary: 'ZMW 30,000 - 42,000 / month',
    experienceLevel: '2+ Years',
    skillsRequired: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    description: 'Design mobile and web payment workflows for thousands of daily merchants and consumers.',
    requirements: [
      'Portfolio showcasing mobile design systems and interactive prototypes',
      'Experience conducting user interviews and usability testing'
    ],
    deadline: 'Aug 30, 2026',
    postedAt: '3 days ago',
    isSaved: false,
    hasApplied: false,
    applicantsCount: 12
  }
];

export const sampleFreelanceServices: FreelanceService[] = [
  {
    id: 'fl_1',
    freelancerId: 'usr_me',
    freelancerName: 'Chileshe Mwamba',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    title: 'Custom Native Android App Development (Java + SQLite)',
    category: 'Android Development',
    startingPrice: 850,
    rating: 4.9,
    reviewsCount: 38,
    coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800',
    description: 'I will build a complete, production-ready Native Android app using Java, clean Material Design 3 XML layouts, and local SQLite database persistence.',
    skills: ['Java', 'Android SDK', 'SQLite', 'XML Layouts', 'REST API'],
    deliveryDays: 7
  },
  {
    id: 'fl_2',
    freelancerId: 'usr_2',
    freelancerName: 'Martha Banda',
    freelancerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    title: 'Mobile App UI/UX Design System in Figma',
    category: 'UI/UX Design',
    startingPrice: 450,
    rating: 5.0,
    reviewsCount: 54,
    coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    description: 'Pixel-perfect, responsive mobile UI screens for iOS and Android with complete component auto-layout, interactive prototypes, and design tokens.',
    skills: ['Figma', 'UI Design', 'Mobile UX', 'Wireframing'],
    deliveryDays: 4
  },
  {
    id: 'fl_3',
    freelancerId: 'usr_3',
    freelancerName: 'Kelvin Phiri',
    freelancerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    title: 'Android & Web Security Penetration Testing & Audit',
    category: 'Cybersecurity',
    startingPrice: 600,
    rating: 4.9,
    reviewsCount: 22,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive static and dynamic penetration testing for Android apps and web APIs with actionable remediation report.',
    skills: ['Pentesting', 'Android Security', 'OWASP Audit', 'API Security'],
    deliveryDays: 5
  }
];

export const sampleCommunities: Community[] = [
  {
    id: 'comm_1',
    name: 'Android Developers Zambia',
    slug: 'android-devs-zm',
    description: 'Official developer hub for Android engineers building mobile software with Java, Kotlin, SQLite, and Material 3 across Zambia.',
    category: 'Android Development',
    icon: '📱',
    coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=1000',
    membersCount: 1840,
    isJoined: true,
    creatorId: 'usr_me',
    creatorName: 'Chileshe Mwamba',
    createdAt: 'Jan 2024',
    rules: [
      'Be respectful and collaborative.',
      'Share code samples in syntax blocks.',
      'No spam or unverified job postings.'
    ]
  },
  {
    id: 'comm_2',
    name: 'Java & Backend Software Craftsmen',
    slug: 'java-backend',
    description: 'Deep dive into Java 21+, Spring Boot, SQLite/PostgreSQL optimizations, clean architecture, and microservices design.',
    category: 'Java Programming',
    icon: '☕',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    membersCount: 2150,
    isJoined: true,
    creatorId: 'usr_3',
    creatorName: 'Kelvin Phiri',
    createdAt: 'Feb 2024',
    rules: [
      'Focus on technical depth and benchmark metrics.',
      'Constructive code reviews encouraged.'
    ]
  },
  {
    id: 'comm_3',
    name: 'Cybersecurity & Ethical Hacking Africa',
    slug: 'cybersec-africa',
    description: 'InfoSec professionals discussing defensive security, threat intelligence, security auditing, and mobile app vulnerabilities.',
    category: 'Cybersecurity',
    icon: '🛡️',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    membersCount: 1420,
    isJoined: false,
    creatorId: 'usr_3',
    creatorName: 'Kelvin Phiri',
    createdAt: 'Mar 2024',
    rules: [
      'Strictly legal, white-hat security discussions only.',
      'Protect user privacy and confidential data.'
    ]
  },
  {
    id: 'comm_4',
    name: 'UI/UX & Product Design Collective',
    slug: 'uiux-design',
    description: 'Designers, researchers, and frontend developers discussing visual design, accessibility, Figma plugins, and design systems.',
    category: 'UI/UX Design',
    icon: '🎨',
    coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    membersCount: 1980,
    isJoined: true,
    creatorId: 'usr_2',
    creatorName: 'Martha Banda',
    createdAt: 'Jan 2024',
    rules: [
      'Post constructive feedback requests.',
      'Credit original designers.'
    ]
  }
];

export const sampleCourses: Course[] = [
  {
    id: 'crs_1',
    title: 'Mastering Android Development with Java & SQLite',
    instructor: 'Chileshe Mwamba',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    instructorTitle: 'Senior Android Engineer & Architect',
    thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800',
    level: 'Intermediate',
    category: 'Android Development',
    duration: '6h 45m',
    lessonsCount: 8,
    rating: 4.9,
    enrolledCount: 890,
    progressPercent: 62,
    isEnrolled: true,
    description: 'Learn to build complete production-grade Android apps from scratch using Java, SQLiteOpenHelper, Material Design 3, ViewBinding, and RecyclerViews without relying on third-party frameworks.',
    lessons: [
      {
        id: 'les_1',
        title: 'Module 1: Setting Up Android Studio & Project Architecture',
        duration: '35m',
        type: 'reading',
        completed: true,
        contentUrl: 'Overview of Gradle dependencies, AndroidManifest.xml configuration, and ViewBinding setup in Java.'
      },
      {
        id: 'les_2',
        title: 'Module 2: Building SQLiteOpenHelper & Database DAOs',
        duration: '50m',
        type: 'code',
        completed: true,
        codeSnippet: `// SQLite Helper Implementation in Java
public class TechHubDbHelper extends SQLiteOpenHelper {
    public static final String DB_NAME = "techhub_local.db";
    public static final int DB_VERSION = 1;

    public TechHubDbHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE users (id TEXT PRIMARY KEY, name TEXT, email TEXT);");
    }
}`
      },
      {
        id: 'les_3',
        title: 'Module 3: Knowledge Check Quiz - Android SQLite & Java',
        duration: '15m',
        type: 'quiz',
        completed: false,
        quizQuestions: [
          {
            question: 'Which method in SQLiteOpenHelper is invoked when the database file is accessed for the first time?',
            options: ['onUpgrade()', 'onCreate()', 'onOpen()', 'onConfigure()'],
            correctIndex: 1
          },
          {
            question: 'Why should you avoid performing long database queries on the Android main thread UI thread?',
            options: [
              'It causes Application Not Responding (ANR) errors',
              'It automatically deletes the database file',
              'SQLite doesn’t support main thread queries',
              'It uses double battery power'
            ],
            correctIndex: 0
          }
        ]
      },
      {
        id: 'les_4',
        title: 'Module 4: RecyclerView & Custom Adapters with CardView',
        duration: '45m',
        type: 'code',
        completed: false,
        codeSnippet: `// Custom Adapter for Feed Posts
public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {
    private List<Post> postList;

    public PostAdapter(List<Post> postList) {
        this.postList = postList;
    }
}`
      }
    ]
  },
  {
    id: 'crs_2',
    title: 'Mobile App UI/UX Design Masterclass in Figma',
    instructor: 'Martha Banda',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    instructorTitle: 'Lead Product Designer @ PayZambia',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    level: 'Beginner',
    category: 'UI/UX Design',
    duration: '4h 20m',
    lessonsCount: 6,
    rating: 4.8,
    enrolledCount: 1240,
    progressPercent: 0,
    isEnrolled: false,
    description: 'Master component variants, auto-layout 5.0, design tokens, and interactive prototyping for mobile UI design.',
    lessons: []
  }
];

export const sampleEvents: TechEvent[] = [
  {
    id: 'evt_1',
    title: 'Zambia Tech Summit & Hackathon 2026',
    type: 'Hackathon',
    organizer: 'TechHub Zambia & UNZA Innovation Lab',
    organizerLogo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200',
    date: 'August 14 - 16, 2026',
    time: '09:00 AM CAT',
    location: 'Mulungushi International Conference Centre, Lusaka',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    description: '36-hour flagship national hackathon building solution prototypes for fintech, agriculture, healthcare, and education. Over ZMW 150,000 in equity-free cash prizes, cloud credits, and direct startup incubation opportunities.',
    attendeesCount: 420,
    isAttending: true,
    isSaved: true,
    tags: ['Hackathon', 'Android', 'Fintech', 'AI', 'Zambia Tech'],
    link: 'https://hackathon.techhub.zm'
  },
  {
    id: 'evt_2',
    title: 'Building Scalable Android Apps with Java & SQLite',
    type: 'Webinar',
    organizer: 'Android Developers Zambia Community',
    organizerLogo: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=200',
    date: 'August 5, 2026',
    time: '18:00 CAT',
    location: 'Zoom Virtual Stage',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    description: 'Live interactive masterclass led by Chileshe Mwamba on optimizing SQLite query performance, implementing background worker threads, and organizing clean multi-layer Java code in Android Studio.',
    attendeesCount: 285,
    isAttending: false,
    isSaved: false,
    tags: ['Webinar', 'Java', 'SQLite', 'Android Studio'],
    link: 'https://zoom.us/j/techhub-android-webinar'
  }
];

export const sampleConversations: ChatConversation[] = [
  {
    id: 'conv_1',
    participantId: 'usr_2',
    participantName: 'Martha Banda',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    participantHeadline: 'Lead Product Designer @ PayZambia',
    lastMessage: 'Hey Chileshe, I reviewed the SQLite Database diagram for TechHub! The UI layout maps nicely.',
    lastMessageTime: '10:14 AM',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 'conv_2',
    participantId: 'usr_3',
    participantName: 'Kelvin Phiri',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    participantHeadline: 'Cybersecurity Specialist',
    lastMessage: 'Thanks for sharing the Java code snippet for parameter binding. Prepared the pentest audit script!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'conv_3',
    participantId: 'usr_4',
    participantName: 'Natasha Tembo',
    participantAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    participantHeadline: 'Senior Tech Recruiter @ Zanaco Digital Bank',
    lastMessage: 'Hello Chileshe, we received your application for the Senior Android Role! Are you available for a brief introductory call?',
    lastMessageTime: 'Jul 21',
    unreadCount: 0,
    isOnline: true
  }
];

export const sampleMessages: Record<string, ChatMessage[]> = {
  conv_1: [
    {
      id: 'm1',
      senderId: 'usr_2',
      receiverId: 'usr_me',
      content: 'Hi Chileshe! Quick question regarding the TechHub Android Figma design system.',
      timestamp: '10:05 AM',
      isRead: true
    },
    {
      id: 'm2',
      senderId: 'usr_me',
      receiverId: 'usr_2',
      content: 'Hey Martha! Sure thing, go ahead.',
      timestamp: '10:08 AM',
      isRead: true
    },
    {
      id: 'm3',
      senderId: 'usr_2',
      receiverId: 'usr_me',
      content: 'Hey Chileshe, I reviewed the SQLite Database diagram for TechHub! The UI layout maps nicely.',
      timestamp: '10:14 AM',
      isRead: false
    }
  ],
  conv_2: [
    {
      id: 'm4',
      senderId: 'usr_3',
      receiverId: 'usr_me',
      content: 'Thanks for sharing the Java code snippet for parameter binding. Prepared the pentest audit script!',
      timestamp: 'Yesterday 4:30 PM',
      isRead: true
    }
  ]
};

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    actorName: 'Martha Banda',
    actorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    message: 'liked your post "Just published a new custom SQLite DB helper guide for Android Java..."',
    targetId: 'post_1',
    createdAt: '15 mins ago',
    isRead: false
  },
  {
    id: 'notif_2',
    type: 'comment',
    actorName: 'Kelvin Phiri',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    message: 'commented on your code snippet: "Solid implementation! Always remember..."',
    targetId: 'post_1',
    createdAt: '1 hour ago',
    isRead: false
  },
  {
    id: 'notif_3',
    type: 'event_reminder',
    actorName: 'Zambia Tech Summit',
    actorAvatar: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=200',
    message: 'Reminder: Hackathon registration closes in 5 days. Check schedule & teams!',
    targetId: 'evt_1',
    createdAt: '3 hours ago',
    isRead: true
  },
  {
    id: 'notif_4',
    type: 'job_apply',
    actorName: 'Zanaco Digital Bank',
    actorAvatar: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=200',
    message: 'Your job application for "Senior Android Software Engineer" was marked as Under Review.',
    targetId: 'job_1',
    createdAt: '1 day ago',
    isRead: true
  }
];

export const sampleReports: ReportItem[] = [
  {
    id: 'rep_1',
    targetType: 'post',
    targetId: 'post_sp_99',
    reporterName: 'Martha Banda',
    reason: 'Unverified cryptocurrency promo link / spam content',
    status: 'pending',
    createdAt: '3 hours ago',
    contentSnippet: 'Earn 5000% ROI in 24 hours with fast automated trading bot...'
  },
  {
    id: 'rep_2',
    targetType: 'job',
    targetId: 'job_fake_01',
    reporterName: 'Kelvin Phiri',
    reason: 'Suspicious upfront training fee requirement in description',
    status: 'pending',
    createdAt: '1 day ago',
    contentSnippet: 'Junior Developer Job - pay ZMW 500 processing fee prior to interview...'
  }
];

// Android Native Java Project Specification Code Blocks for Developer Blueprint View
export const androidJavaDatabaseCode = `package com.techhub.app.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.techhub.app.models.Post;
import com.techhub.app.models.User;

import java.util.ArrayList;
import java.util.List;

/**
 * TechHub Native SQLite Database Helper
 * Handles Users, Posts, Comments, Jobs, Projects, Communities, Messages & Notifications
 */
public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "TechHub.db";
    private static final int DATABASE_VERSION = 1;

    // Singleton instance
    private static DatabaseHelper instance;

    public static synchronized DatabaseHelper getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseHelper(context.getApplicationContext());
        }
        return instance;
    }

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Users Table
        db.execSQL("CREATE TABLE users (" +
                "id TEXT PRIMARY KEY, " +
                "username TEXT UNIQUE NOT NULL, " +
                "full_name TEXT NOT NULL, " +
                "email TEXT UNIQUE NOT NULL, " +
                "password_hash TEXT NOT NULL, " +
                "bio TEXT, " +
                "profession TEXT, " +
                "company TEXT, " +
                "location TEXT, " +
                "role TEXT, " +
                "avatar_url TEXT, " +
                "github_url TEXT, " +
                "created_at INTEGER);");

        // Posts Table
        db.execSQL("CREATE TABLE posts (" +
                "id TEXT PRIMARY KEY, " +
                "user_id TEXT NOT NULL, " +
                "content TEXT NOT NULL, " +
                "image_url TEXT, " +
                "code_snippet TEXT, " +
                "code_lang TEXT, " +
                "type TEXT NOT NULL, " +
                "likes_count INTEGER DEFAULT 0, " +
                "comments_count INTEGER DEFAULT 0, " +
                "created_at INTEGER, " +
                "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);");

        // Comments Table
        db.execSQL("CREATE TABLE comments (" +
                "id TEXT PRIMARY KEY, " +
                "post_id TEXT NOT NULL, " +
                "user_id TEXT NOT NULL, " +
                "content TEXT NOT NULL, " +
                "created_at INTEGER, " +
                "FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE, " +
                "FOREIGN KEY(user_id) REFERENCES users(id));");

        // Jobs Table
        db.execSQL("CREATE TABLE jobs (" +
                "id TEXT PRIMARY KEY, " +
                "title TEXT NOT NULL, " +
                "company TEXT NOT NULL, " +
                "location TEXT NOT NULL, " +
                "type TEXT NOT NULL, " +
                "salary TEXT, " +
                "description TEXT, " +
                "skills_required TEXT, " +
                "posted_at INTEGER);");

        // Index Optimizations
        db.execSQL("CREATE INDEX idx_posts_user ON posts(user_id);");
        db.execSQL("CREATE INDEX idx_comments_post ON comments(post_id);");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS comments;");
        db.execSQL("DROP TABLE IF EXISTS posts;");
        db.execSQL("DROP TABLE IF EXISTS users;");
        db.execSQL("DROP TABLE IF EXISTS jobs;");
        onCreate(db);
    }

    // CRUD: Insert New User
    public boolean insertUser(User user, String passwordHash) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("id", user.getId());
        cv.put("username", user.getUsername());
        cv.put("full_name", user.getFullName());
        cv.put("email", user.getEmail());
        cv.put("password_hash", passwordHash);
        cv.put("bio", user.getBio());
        cv.put("profession", user.getProfession());
        cv.put("role", user.getRole());
        cv.put("created_at", System.currentTimeMillis());

        long result = db.insert("users", null, cv);
        return result != -1;
    }

    // CRUD: Fetch Posts Feed
    public List<Post> getAllPosts() {
        List<Post> postList = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        String query = "SELECT p.*, u.full_name, u.profession, u.avatar_url FROM posts p " +
                       "JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC";
        Cursor cursor = db.rawQuery(query, null);

        if (cursor.moveToFirst()) {
            do {
                Post post = new Post();
                post.setId(cursor.getString(cursor.getColumnIndexOrThrow("id")));
                post.setAuthorId(cursor.getString(cursor.getColumnIndexOrThrow("user_id")));
                post.setAuthorName(cursor.getString(cursor.getColumnIndexOrThrow("full_name")));
                post.setContent(cursor.getString(cursor.getColumnIndexOrThrow("content")));
                post.setLikesCount(cursor.getInt(cursor.getColumnIndexOrThrow("likes_count")));
                postList.add(post);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return postList;
    }
}`;

export const androidXmlLayoutCode = `<?xml version="1.0" encoding="utf-8"?>
<!-- activity_main.xml - TechHub Modern Material 3 Main Screen -->
<androidx.coordinatorlayout.widget.CoordinatorLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="?attr/colorSurface">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:elevation="2dp">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/topAppBar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:title="TechHub"
            app:titleTextColor="?attr/colorOnSurface"
            app:menu="@menu/top_app_bar_menu" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fabCreatePost"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="16dp"
        android:contentDescription="Create Post"
        app:srcCompat="@drawable/ic_add_post"
        app:tint="?attr/colorOnPrimary"
        app:backgroundTint="?attr/colorPrimary" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNavigation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        app:menu="@menu/bottom_navigation_menu" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>`;
