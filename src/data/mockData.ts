// Mock data for SkillStream LMS MVP

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'student';
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  modules: number;
  enrolled: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  type: 'online' | 'offline';
  startDate: string;
  endDate: string;
  trainer: string;
  students: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  author: string;
  type: 'info' | 'urgent' | 'reminder';
}

export const mockUsers: User[] = [
  { id: '1', name: 'John Admin', email: 'admin@skillstream.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Sarah Mentor', email: 'mentor@skillstream.com', role: 'mentor', status: 'active' },
  { id: '3', name: 'Alex Student', email: 'student@skillstream.com', role: 'student', status: 'active' },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the basics of React including components, state, and hooks.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    instructor: 'Sarah Mentor',
    duration: '8 weeks',
    modules: 12,
    enrolled: 156,
    category: 'Web Development',
    level: 'beginner',
    progress: 65,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript generics, decorators, and advanced patterns.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    instructor: 'Mike Chen',
    duration: '6 weeks',
    modules: 8,
    enrolled: 89,
    category: 'Programming',
    level: 'advanced',
    progress: 30,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and experience design.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    instructor: 'Emily Davis',
    duration: '10 weeks',
    modules: 15,
    enrolled: 203,
    category: 'Design',
    level: 'intermediate',
    progress: 0,
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Introduction to Python programming for data analysis and visualization.',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    instructor: 'Dr. James Wilson',
    duration: '12 weeks',
    modules: 18,
    enrolled: 312,
    category: 'Data Science',
    level: 'beginner',
    progress: 85,
  },
];

export const mockBatches: Batch[] = [
  {
    id: '1',
    name: 'React Batch 2024-A',
    courseId: '1',
    courseName: 'React Fundamentals',
    type: 'online',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    trainer: 'Sarah Mentor',
    students: 32,
    status: 'ongoing',
  },
  {
    id: '2',
    name: 'TypeScript Advanced Jan',
    courseId: '2',
    courseName: 'Advanced TypeScript',
    type: 'online',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    trainer: 'Mike Chen',
    students: 24,
    status: 'ongoing',
  },
  {
    id: '3',
    name: 'Python DS Spring 2024',
    courseId: '4',
    courseName: 'Python for Data Science',
    type: 'offline',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    trainer: 'Dr. James Wilson',
    students: 40,
    status: 'upcoming',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Platform Maintenance Scheduled',
    message: 'SkillStream will be undergoing scheduled maintenance on Saturday, Jan 20th from 2-4 AM EST.',
    date: '2024-01-18',
    author: 'System Admin',
    type: 'info',
  },
  {
    id: '2',
    title: 'New Course: AI Fundamentals',
    message: 'We are excited to announce our new AI Fundamentals course launching next month!',
    date: '2024-01-17',
    author: 'Course Team',
    type: 'info',
  },
  {
    id: '3',
    title: 'Assignment Deadline Reminder',
    message: 'React Fundamentals Module 5 assignment is due in 3 days. Please submit on time.',
    date: '2024-01-16',
    author: 'Sarah Mentor',
    type: 'reminder',
  },
];

export const dashboardStats = {
  admin: {
    totalUsers: 2847,
    activeCourses: 24,
    totalBatches: 18,
    completionRate: 78,
  },
  mentor: {
    assignedBatches: 3,
    totalStudents: 96,
    pendingAssignments: 12,
    avgAttendance: 89,
  },
  student: {
    enrolledCourses: 4,
    completedCourses: 2,
    upcomingSessions: 3,
    avgProgress: 68,
  },
};
