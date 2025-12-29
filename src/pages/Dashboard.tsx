import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { AnnouncementCard } from '@/components/dashboard/AnnouncementCard';
import { RoadmapSnapshot } from '@/components/dashboard/RoadmapSnapshot';
import { AnalyticsSnapshot } from '@/components/dashboard/AnalyticsSnapshot';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { UpcomingSessions } from '@/components/dashboard/UpcomingSessions';
import { CourseProgress } from '@/components/dashboard/CourseProgress';
import { 
  mockCourses, 
  mockAnnouncements, 
  dashboardStats,
  mockRoadmapModules,
  mockStudentAnalytics,
  mockPendingTasks,
  mockSessions 
} from '@/data/mockData';
import { Users, BookOpen, Calendar, TrendingUp, Clock, CheckCircle, Target, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your learning platform</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={dashboardStats.admin.totalUsers.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Courses"
          value={dashboardStats.admin.activeCourses}
          icon={<BookOpen className="h-6 w-6" />}
        />
        <StatCard
          title="Total Batches"
          value={dashboardStats.admin.totalBatches}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatCard
          title="Completion Rate"
          value={`${dashboardStats.admin.completionRate}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Popular Courses</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockCourses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Announcements</h2>
          <div className="space-y-3">
            {mockAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMentorDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mentor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your batches and students</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Assigned Batches"
          value={dashboardStats.mentor.assignedBatches}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatCard
          title="Total Students"
          value={dashboardStats.mentor.totalStudents}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardStats.mentor.pendingAssignments}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatCard
          title="Avg. Attendance"
          value={`${dashboardStats.mentor.avgAttendance}%`}
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Courses</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockCourses.slice(0, 2).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Announcements</h2>
          <div className="space-y-3">
            {mockAnnouncements.slice(0, 2).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Header with welcome and quick stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg">
            <Target className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">{mockStudentAnalytics.currentStreak} day streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary capitalize">{mockStudentAnalytics.skillLevel}</span>
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={dashboardStats.student.enrolledCourses}
          icon={<BookOpen className="h-6 w-6" />}
        />
        <StatCard
          title="Completed"
          value={dashboardStats.student.completedCourses}
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <StatCard
          title="Avg. Progress"
          value={`${mockStudentAnalytics.completionRate}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Attendance"
          value={`${mockStudentAnalytics.attendanceRate}%`}
          icon={<Calendar className="h-6 w-6" />}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Primary content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Roadmap snapshot */}
          <RoadmapSnapshot 
            modules={mockRoadmapModules}
            courseId="1"
            courseName="React Fundamentals"
          />
          
          {/* Continue learning */}
          <CourseProgress courses={mockCourses} />
          
          {/* Pending tasks */}
          <UpcomingTasks tasks={mockPendingTasks} />
        </div>

        {/* Right column - Secondary content */}
        <div className="space-y-6">
          {/* Analytics snapshot */}
          <AnalyticsSnapshot analytics={mockStudentAnalytics} />
          
          {/* Upcoming sessions */}
          <UpcomingSessions sessions={mockSessions} />
          
          {/* Announcements */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Announcements</h2>
            {mockAnnouncements.slice(0, 2).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {user.role === 'admin' && renderAdminDashboard()}
      {user.role === 'mentor' && renderMentorDashboard()}
      {user.role === 'student' && renderStudentDashboard()}
    </DashboardLayout>
  );
}
