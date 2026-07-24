import React, { createContext, useContext, useState, useEffect } from 'react';
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
  ReportItem,
  ActiveTab
} from '../types';
import {
  currentUserProfile,
  sampleUsers,
  samplePosts,
  sampleProjects,
  sampleJobs,
  sampleFreelanceServices,
  sampleCommunities,
  sampleCourses,
  sampleEvents,
  sampleConversations,
  sampleMessages,
  sampleNotifications,
  sampleReports
} from '../data/initialData';

interface AppContextType {
  // Navigation & Theme
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  createPostModalOpen: boolean;
  setCreatePostModalOpen: (open: boolean) => void;
  notificationsDrawerOpen: boolean;
  setNotificationsDrawerOpen: (open: boolean) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // User Auth Profile
  userProfile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  allUsers: UserProfile[];
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  activeRole: string;
  setActiveRole: (role: any) => void;

  // Data & Actions
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'authorId' | 'authorName' | 'authorAvatar' | 'authorHeadline'>) => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  deletePost: (postId: string) => void;
  reportPost: (postId: string, reason: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'starsCount' | 'authorId' | 'authorName' | 'authorAvatar'>) => void;
  toggleStarProject: (projectId: string) => void;
  toggleBookmarkProject: (projectId: string) => void;

  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedAt' | 'applicantsCount'>) => void;
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;

  freelanceServices: FreelanceService[];
  addFreelanceService: (service: Omit<FreelanceService, 'id' | 'rating' | 'reviewsCount' | 'freelancerId' | 'freelancerName' | 'freelancerAvatar'>) => void;

  communities: Community[];
  toggleJoinCommunity: (communityId: string) => void;
  addCommunity: (community: Omit<Community, 'id' | 'membersCount' | 'createdAt' | 'creatorId' | 'creatorName'>) => void;

  courses: Course[];
  toggleEnrollCourse: (courseId: string) => void;
  completeCourseLesson: (courseId: string, lessonId: string) => void;

  events: TechEvent[];
  toggleAttendEvent: (eventId: string) => void;
  toggleSaveEvent: (eventId: string) => void;

  conversations: ChatConversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: Record<string, ChatMessage[]>;
  sendMessage: (conversationId: string, content: string, codeSnippet?: { language: string; code: string }) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (notifId: string) => void;
  clearAllNotifications: () => void;

  reports: ReportItem[];
  resolveReport: (reportId: string, action: 'resolve' | 'dismiss') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('techhub_theme');
    return saved ? saved === 'dark' : true; // Default dark for Tech vibe
  });

  useEffect(() => {
    localStorage.setItem('techhub_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Tab & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // User State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('techhub_profile');
    return saved ? JSON.parse(saved) : currentUserProfile;
  });
  const [allUsers] = useState<UserProfile[]>(sampleUsers);
  const [activeRole, setActiveRole] = useState(userProfile.role);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('techhub_profile', JSON.stringify(next));
      return next;
    });
  };

  const login = (email: string) => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthModalOpen(true);
  };

  // Posts State
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('techhub_posts');
    return saved ? JSON.parse(saved) : samplePosts;
  });

  useEffect(() => {
    localStorage.setItem('techhub_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPostData: Omit<Post, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'authorId' | 'authorName' | 'authorAvatar' | 'authorHeadline'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post_${Date.now()}`,
      authorId: userProfile.id,
      authorName: userProfile.fullName,
      authorAvatar: userProfile.avatar,
      authorHeadline: userProfile.headline,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'Just now',
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLikePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  const toggleSavePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, isSaved: !p.isSaved };
      }
      return p;
    }));
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `c_${Date.now()}`,
          postId,
          authorId: userProfile.id,
          authorName: userProfile.fullName,
          authorAvatar: userProfile.avatar,
          authorHeadline: userProfile.headline,
          content: commentText,
          createdAt: 'Just now',
          likesCount: 0
        };
        const updatedComments = p.comments ? [...p.comments, newComment] : [newComment];
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: updatedComments
        };
      }
      return p;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const reportPost = (postId: string, reason: string) => {
    const postToReport = posts.find(p => p.id === postId);
    if (!postToReport) return;
    const newReport: ReportItem = {
      id: `rep_${Date.now()}`,
      targetType: 'post',
      targetId: postId,
      reporterName: userProfile.fullName,
      reason,
      status: 'pending',
      createdAt: 'Just now',
      contentSnippet: postToReport.content.slice(0, 100)
    };
    setReports([newReport, ...reports]);
  };

  // Projects State
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'starsCount' | 'authorId' | 'authorName' | 'authorAvatar'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj_${Date.now()}`,
      authorId: userProfile.id,
      authorName: userProfile.fullName,
      authorAvatar: userProfile.avatar,
      starsCount: 1,
      isStarred: true,
      createdAt: 'Just now'
    };
    setProjects([newProj, ...projects]);
  };

  const toggleStarProject = (projectId: string) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const isStarred = !p.isStarred;
        return {
          ...p,
          isStarred,
          starsCount: isStarred ? p.starsCount + 1 : Math.max(0, p.starsCount - 1)
        };
      }
      return p;
    }));
  };

  const toggleBookmarkProject = (projectId: string) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'applicantsCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job_${Date.now()}`,
      postedAt: 'Just now',
      applicantsCount: 0
    };
    setJobs([newJob, ...jobs]);
  };

  const toggleSaveJob = (jobId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, isSaved: !j.isSaved } : j));
  };

  const applyToJob = (jobId: string) => {
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, hasApplied: true, applicantsCount: j.applicantsCount + 1 };
      }
      return j;
    }));
  };

  // Freelance Services
  const [freelanceServices, setFreelanceServices] = useState<FreelanceService[]>(sampleFreelanceServices);

  const addFreelanceService = (serviceData: Omit<FreelanceService, 'id' | 'rating' | 'reviewsCount' | 'freelancerId' | 'freelancerName' | 'freelancerAvatar'>) => {
    const newService: FreelanceService = {
      ...serviceData,
      id: `fl_${Date.now()}`,
      freelancerId: userProfile.id,
      freelancerName: userProfile.fullName,
      freelancerAvatar: userProfile.avatar,
      rating: 5.0,
      reviewsCount: 1
    };
    setFreelanceServices([newService, ...freelanceServices]);
  };

  // Communities State
  const [communities, setCommunities] = useState<Community[]>(sampleCommunities);

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(communities.map(c => {
      if (c.id === communityId) {
        const isJoined = !c.isJoined;
        return {
          ...c,
          isJoined,
          membersCount: isJoined ? c.membersCount + 1 : Math.max(0, c.membersCount - 1)
        };
      }
      return c;
    }));
  };

  const addCommunity = (commData: Omit<Community, 'id' | 'membersCount' | 'createdAt' | 'creatorId' | 'creatorName'>) => {
    const newComm: Community = {
      ...commData,
      id: `comm_${Date.now()}`,
      membersCount: 1,
      isJoined: true,
      creatorId: userProfile.id,
      creatorName: userProfile.fullName,
      createdAt: 'Just now'
    };
    setCommunities([newComm, ...communities]);
  };

  // Courses State
  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  const toggleEnrollCourse = (courseId: string) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        const isEnrolled = !c.isEnrolled;
        return {
          ...c,
          isEnrolled,
          enrolledCount: isEnrolled ? c.enrolledCount + 1 : Math.max(0, c.enrolledCount - 1),
          progressPercent: isEnrolled ? (c.progressPercent || 0) : 0
        };
      }
      return c;
    }));
  };

  const completeCourseLesson = (courseId: string, lessonId: string) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        const updatedLessons = c.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l);
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const progressPercent = Math.round((completedCount / updatedLessons.length) * 100);
        return {
          ...c,
          lessons: updatedLessons,
          progressPercent
        };
      }
      return c;
    }));
  };

  // Events State
  const [events, setEvents] = useState<TechEvent[]>(sampleEvents);

  const toggleAttendEvent = (eventId: string) => {
    setEvents(events.map(e => {
      if (e.id === eventId) {
        const isAttending = !e.isAttending;
        return {
          ...e,
          isAttending,
          attendeesCount: isAttending ? e.attendeesCount + 1 : Math.max(0, e.attendeesCount - 1)
        };
      }
      return e;
    }));
  };

  const toggleSaveEvent = (eventId: string) => {
    setEvents(events.map(e => e.id === eventId ? { ...e, isSaved: !e.isSaved } : e));
  };

  // Messages State
  const [conversations, setConversations] = useState<ChatConversation[]>(sampleConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_1');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(sampleMessages);

  const sendMessage = (conversationId: string, content: string, codeSnippet?: { language: string; code: string }) => {
    if (!content.trim() && !codeSnippet) return;
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: userProfile.id,
      receiverId: 'usr_2',
      content,
      codeSnippet,
      timestamp: 'Just now',
      isRead: true
    };
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: content || 'Sent a code snippet',
              lastMessageTime: 'Just now'
            }
          : c
      )
    );
  };

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(notifications.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Reports State
  const [reports, setReports] = useState<ReportItem[]>(sampleReports);

  const resolveReport = (reportId: string, action: 'resolve' | 'dismiss') => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: action === 'resolve' ? 'resolved' : 'dismissed' } : r));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        searchModalOpen,
        setSearchModalOpen,
        createPostModalOpen,
        setCreatePostModalOpen,
        notificationsDrawerOpen,
        setNotificationsDrawerOpen,
        settingsModalOpen,
        setSettingsModalOpen,
        authModalOpen,
        setAuthModalOpen,

        userProfile,
        updateProfile,
        allUsers,
        isAuthenticated,
        login,
        logout,
        activeRole,
        setActiveRole,

        posts,
        addPost,
        toggleLikePost,
        toggleSavePost,
        addComment,
        deletePost,
        reportPost,

        projects,
        addProject,
        toggleStarProject,
        toggleBookmarkProject,

        jobs,
        addJob,
        toggleSaveJob,
        applyToJob,

        freelanceServices,
        addFreelanceService,

        communities,
        toggleJoinCommunity,
        addCommunity,

        courses,
        toggleEnrollCourse,
        completeCourseLesson,

        events,
        toggleAttendEvent,
        toggleSaveEvent,

        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        sendMessage,

        notifications,
        markNotificationAsRead,
        clearAllNotifications,

        reports,
        resolveReport
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
