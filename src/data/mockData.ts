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

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true-false';
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Assessment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  description: string;
  type: 'quiz' | 'exam' | 'assignment';
  duration: number; // in minutes
  totalQuestions: number;
  totalPoints: number;
  passingScore: number; // percentage
  questions: Question[];
  status: 'draft' | 'published';
  dueDate?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  answers: { questionId: string; selectedAnswer: number }[];
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
  timeTaken: number; // in seconds
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

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'React Fundamentals Quiz 1',
    courseId: '1',
    courseName: 'React Fundamentals',
    description: 'Test your understanding of React basics including components and JSX.',
    type: 'quiz',
    duration: 15,
    totalQuestions: 5,
    totalPoints: 50,
    passingScore: 60,
    status: 'published',
    dueDate: '2024-02-15',
    questions: [
      {
        id: 'q1',
        text: 'What is the correct way to create a React component?',
        type: 'mcq',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'class MyComponent { render() { return <div>Hello</div>; } }',
          'const MyComponent = <div>Hello</div>;',
          'React.create(MyComponent)'
        ],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q2',
        text: 'Which hook is used for state management in functional components?',
        type: 'mcq',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q3',
        text: 'JSX stands for JavaScript XML.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q4',
        text: 'What is the virtual DOM?',
        type: 'mcq',
        options: [
          'A direct copy of the real DOM',
          'A lightweight copy of the real DOM for efficient updates',
          'A browser feature',
          'A CSS framework'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q5',
        text: 'Props in React are read-only.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      }
    ]
  },
  {
    id: '2',
    title: 'TypeScript Advanced Exam',
    courseId: '2',
    courseName: 'Advanced TypeScript',
    description: 'Comprehensive exam covering generics, utility types, and advanced patterns.',
    type: 'exam',
    duration: 30,
    totalQuestions: 6,
    totalPoints: 60,
    passingScore: 70,
    status: 'published',
    dueDate: '2024-02-20',
    questions: [
      {
        id: 'q1',
        text: 'What does the "keyof" operator return?',
        type: 'mcq',
        options: [
          'All values of an object',
          'Union of all keys of a type',
          'The first key of an object',
          'A boolean'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q2',
        text: 'Generics allow you to write reusable, type-safe code.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q3',
        text: 'Which utility type makes all properties optional?',
        type: 'mcq',
        options: ['Required<T>', 'Partial<T>', 'Pick<T>', 'Omit<T>'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q4',
        text: 'What is a discriminated union?',
        type: 'mcq',
        options: [
          'A union with no common properties',
          'A union with a common literal property for type narrowing',
          'A type that cannot be used',
          'An intersection type'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q5',
        text: 'The "never" type represents values that never occur.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q6',
        text: 'Which syntax creates a mapped type?',
        type: 'mcq',
        options: [
          'type Map = { [K in keyof T]: T[K] }',
          'type Map = T extends U ? X : Y',
          'type Map = T & U',
          'type Map = T | U'
        ],
        correctAnswer: 0,
        points: 10
      }
    ]
  },
  {
    id: '3',
    title: 'Python Basics Assessment',
    courseId: '4',
    courseName: 'Python for Data Science',
    description: 'Quick assessment on Python fundamentals and data types.',
    type: 'quiz',
    duration: 10,
    totalQuestions: 4,
    totalPoints: 40,
    passingScore: 50,
    status: 'published',
    questions: [
      {
        id: 'q1',
        text: 'Which of the following is a mutable data type in Python?',
        type: 'mcq',
        options: ['tuple', 'string', 'list', 'int'],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 'q2',
        text: 'Python uses indentation to define code blocks.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q3',
        text: 'What is the output of: print(type([]))?',
        type: 'mcq',
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q4',
        text: 'A dictionary in Python stores key-value pairs.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        points: 10
      }
    ]
  }
];

export const mockAttempts: AssessmentAttempt[] = [
  {
    id: 'a1',
    assessmentId: '1',
    userId: '3',
    answers: [
      { questionId: 'q1', selectedAnswer: 0 },
      { questionId: 'q2', selectedAnswer: 1 },
      { questionId: 'q3', selectedAnswer: 0 },
      { questionId: 'q4', selectedAnswer: 1 },
      { questionId: 'q5', selectedAnswer: 0 }
    ],
    score: 50,
    totalPoints: 50,
    percentage: 100,
    passed: true,
    startedAt: '2024-01-20T10:00:00Z',
    completedAt: '2024-01-20T10:12:30Z',
    timeTaken: 750
  }
];
