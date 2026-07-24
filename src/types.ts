export type UserRole = 'developer' | 'recruiter' | 'freelancer' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage: string;
  headline: string;
  bio: string;
  location: string;
  profession: string;
  company?: string;
  university?: string;
  role: UserRole;
  yearsOfExperience: number;
  programmingLanguages: string[];
  skills: string[];
  certifications: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  portfolioUrl?: string;
  resumeName?: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  joinedDate: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  content: string;
  image?: string;
  codeSnippet?: CodeSnippet;
  type: 'general' | 'project_update' | 'code_snippet' | 'article';
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  communityId?: string;
  communityName?: string;
  comments?: PostComment[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  screenshots: string[];
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
  starsCount: number;
  isStarred?: boolean;
  isBookmarked?: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote' | 'Internship';
  salary: string;
  experienceLevel: string;
  skillsRequired: string[];
  description: string;
  requirements: string[];
  deadline: string;
  postedAt: string;
  isSaved?: boolean;
  hasApplied?: boolean;
  applicantsCount: number;
}

export interface FreelanceService {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  title: string;
  category: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  description: string;
  skills: string[];
  deliveryDays: number;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  coverImage: string;
  membersCount: number;
  isJoined?: boolean;
  creatorId: string;
  creatorName: string;
  createdAt: string;
  rules: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'code' | 'quiz' | 'reading';
  contentUrl?: string;
  codeSnippet?: string;
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  instructorTitle: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  enrolledCount: number;
  description: string;
  lessons: CourseLesson[];
  progressPercent?: number;
  isEnrolled?: boolean;
}

export interface TechEvent {
  id: string;
  title: string;
  type: 'Hackathon' | 'Conference' | 'Workshop' | 'Webinar' | 'Meetup';
  organizer: string;
  organizerLogo: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  coverImage: string;
  description: string;
  attendeesCount: number;
  isAttending?: boolean;
  isSaved?: boolean;
  tags: string[];
  link?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  codeSnippet?: CodeSnippet;
  attachmentUrl?: string;
  audioDuration?: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantHeadline: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'job_apply' | 'event_reminder' | 'community_invite';
  actorName: string;
  actorAvatar: string;
  message: string;
  targetId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface ReportItem {
  id: string;
  targetType: 'post' | 'user' | 'comment' | 'job';
  targetId: string;
  reporterName: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  contentSnippet: string;
}

export type ActiveTab = 
  | 'feed' 
  | 'projects' 
  | 'jobs' 
  | 'freelance' 
  | 'communities' 
  | 'courses' 
  | 'events' 
  | 'messages' 
  | 'profile' 
  | 'admin' 
  | 'android_blueprint';
