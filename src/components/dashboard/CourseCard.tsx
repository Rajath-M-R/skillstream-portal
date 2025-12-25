import { Link } from 'react-router-dom';
import { Course } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const levelColors = {
    beginner: 'bg-success/10 text-success',
    intermediate: 'bg-warning/10 text-warning',
    advanced: 'bg-destructive/10 text-destructive',
  };

  return (
    <Link 
      to={`/courses/${course.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={cn(
          "absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
          levelColors[course.level]
        )}>
          {course.level}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-primary mb-1">{course.category}</p>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules} modules
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.enrolled}
          </span>
        </div>

        {showProgress && course.progress !== undefined && (
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
            {course.instructor.charAt(0)}
          </div>
          <span className="text-sm text-muted-foreground">{course.instructor}</span>
        </div>
      </div>
    </Link>
  );
}
