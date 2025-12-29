import { PendingTask } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, BookOpen, FileText, Video, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { format, differenceInDays, parseISO, isToday, isTomorrow } from 'date-fns';

interface UpcomingTasksProps {
  tasks: PendingTask[];
}

const typeConfig = {
  assessment: { icon: ClipboardCheck, label: 'Assessment' },
  lesson: { icon: BookOpen, label: 'Lesson' },
  assignment: { icon: FileText, label: 'Assignment' },
  session: { icon: Video, label: 'Session' }
};

const priorityConfig = {
  high: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
  medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  low: { color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' }
};

function getDueDateLabel(dateStr: string): { label: string; urgent: boolean } {
  const date = parseISO(dateStr);
  const daysUntil = differenceInDays(date, new Date());
  
  if (isToday(date)) return { label: 'Due Today', urgent: true };
  if (isTomorrow(date)) return { label: 'Due Tomorrow', urgent: true };
  if (daysUntil < 0) return { label: 'Overdue', urgent: true };
  if (daysUntil <= 3) return { label: `${daysUntil} days left`, urgent: true };
  return { label: format(date, 'MMM d'), urgent: false };
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const sortedTasks = [...tasks].sort((a, b) => 
    parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()
  );

  const urgentTasks = sortedTasks.filter(t => {
    const { urgent } = getDueDateLabel(t.dueDate);
    return urgent;
  });

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Pending Tasks</CardTitle>
          {urgentTasks.length > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              {urgentTasks.length} urgent
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No pending tasks. Great job!
          </p>
        ) : (
          sortedTasks.slice(0, 5).map((task) => {
            const typeInfo = typeConfig[task.type];
            const priorityInfo = priorityConfig[task.priority];
            const dueInfo = getDueDateLabel(task.dueDate);
            const Icon = typeInfo.icon;

            return (
              <div
                key={task.id}
                className={cn(
                  "p-3 rounded-lg border transition-all hover:shadow-soft",
                  priorityInfo.bg,
                  priorityInfo.border
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    task.priority === 'high' ? 'bg-destructive/20' : 'bg-muted'
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      task.priority === 'high' ? 'text-destructive' : 'text-muted-foreground'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {task.courseName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      dueInfo.urgent ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
                    )}>
                      {dueInfo.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {sortedTasks.length > 5 && (
          <Link 
            to="/schedule" 
            className="block text-center text-sm text-primary hover:underline pt-2"
          >
            View all {sortedTasks.length} tasks
          </Link>
        )}
      </CardContent>
    </Card>
  );
}