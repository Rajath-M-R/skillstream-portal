import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockCourses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  BookOpen, 
  PlayCircle, 
  FileText, 
  CheckCircle,
  Lock 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mockModules = [
  { id: 1, title: 'Introduction to the Course', duration: '15 min', type: 'video', completed: true },
  { id: 2, title: 'Setting Up Your Environment', duration: '25 min', type: 'video', completed: true },
  { id: 3, title: 'Core Concepts Overview', duration: '30 min', type: 'video', completed: true },
  { id: 4, title: 'Hands-on Exercise 1', duration: '45 min', type: 'exercise', completed: false },
  { id: 5, title: 'Advanced Patterns', duration: '40 min', type: 'video', completed: false, locked: true },
  { id: 6, title: 'Final Project', duration: '2 hours', type: 'project', completed: false, locked: true },
];

export default function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-foreground">Course not found</h2>
          <Link to="/courses" className="text-primary hover:underline mt-2">
            Back to courses
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const completedModules = mockModules.filter(m => m.completed).length;
  const progressPercent = Math.round((completedModules / mockModules.length) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link 
          to="/courses" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-card">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <Button size="lg" className="gap-2 bg-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/30">
                  <PlayCircle className="h-6 w-6" />
                  Continue Learning
                </Button>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-primary">{course.category}</span>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{course.title}</h1>
              <p className="text-muted-foreground mt-3">{course.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {course.modules} modules
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {course.enrolled} enrolled
              </span>
            </div>

            {/* Modules list */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Course Content</h2>
              <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                {mockModules.map((module, index) => (
                  <div 
                    key={module.id}
                    className={cn(
                      "flex items-center gap-4 p-4 transition-colors",
                      module.locked ? "bg-muted/50 cursor-not-allowed" : "hover:bg-secondary/50 cursor-pointer"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      module.completed 
                        ? "bg-success/10 text-success" 
                        : module.locked 
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                    )}>
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : module.locked ? (
                        <Lock className="h-5 w-5" />
                      ) : module.type === 'video' ? (
                        <PlayCircle className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium",
                        module.locked ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {index + 1}. {module.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{module.duration}</p>
                    </div>
                    {!module.locked && !module.completed && (
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Course Instructor</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-soft">
              <h3 className="font-semibold text-foreground">Your Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{completedModules} of {mockModules.length} completed</span>
                  <span className="font-medium text-foreground">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
              <Button className="w-full">
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue Course
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Course Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Level</dt>
                  <dd className="font-medium text-foreground capitalize">{course.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-medium text-foreground">{course.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Modules</dt>
                  <dd className="font-medium text-foreground">{course.modules}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Enrolled</dt>
                  <dd className="font-medium text-foreground">{course.enrolled} students</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
