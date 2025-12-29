import { Course } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CourseProgressProps {
  courses: Course[];
}

export function CourseProgress({ courses }: CourseProgressProps) {
  const inProgressCourses = courses.filter(c => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100);
  
  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Continue Learning</CardTitle>
          <Link 
            to="/courses" 
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            All courses <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {inProgressCourses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Start a course to track your progress
          </p>
        ) : (
          inProgressCourses.slice(0, 3).map((course) => (
            <Link 
              key={course.id}
              to={`/courses/${course.id}`}
              className="block group"
            >
              <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-all">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {course.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.modules} modules
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          (course.progress ?? 0) >= 80 ? "bg-success" : "bg-primary"
                        )}
                        style={{ width: `${course.progress ?? 0}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}