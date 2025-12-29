import { RoadmapModule } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, Lock, AlertTriangle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RoadmapSnapshotProps {
  modules: RoadmapModule[];
  courseId: string;
  courseName: string;
}

const statusConfig = {
  'completed': { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  'in-progress': { icon: Circle, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  'locked': { icon: Lock, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' },
  'overdue': { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' }
};

export function RoadmapSnapshot({ modules, courseId, courseName }: RoadmapSnapshotProps) {
  const currentModule = modules.find(m => m.status === 'in-progress');
  const nextModule = modules.find(m => m.status === 'locked');
  const completedCount = modules.filter(m => m.status === 'completed').length;
  const overdue = modules.filter(m => m.status === 'overdue');

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Learning Roadmap</CardTitle>
          <Link 
            to={`/courses/${courseId}`} 
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View full <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">{courseName}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / modules.length) * 100}%` }}
            />
          </div>
          <span className="text-muted-foreground font-medium">
            {completedCount}/{modules.length}
          </span>
        </div>

        {/* Overdue warning */}
        {overdue.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg text-sm">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-destructive font-medium">
              {overdue.length} overdue module{overdue.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Current module */}
        {currentModule && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Today's Focus</p>
            <div className={cn(
              "p-3 rounded-lg border-2",
              statusConfig['in-progress'].bg,
              statusConfig['in-progress'].border
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-1.5 rounded-full",
                  statusConfig['in-progress'].bg
                )}>
                  <Circle className={cn("h-4 w-4", statusConfig['in-progress'].color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{currentModule.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(currentModule.lessonsCompleted / currentModule.lessonsTotal) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {currentModule.lessonsCompleted}/{currentModule.lessonsTotal} lessons
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming milestone */}
        {nextModule && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Next Milestone</p>
            <div className={cn(
              "p-3 rounded-lg border",
              statusConfig['locked'].bg,
              statusConfig['locked'].border
            )}>
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{nextModule.title}</p>
                  <p className="text-xs text-muted-foreground">Unlocks after current module</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module timeline */}
        <div className="pt-2 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">All Modules</p>
          <div className="flex items-center gap-1">
            {modules.map((module, index) => {
              const config = statusConfig[module.status];
              const Icon = config.icon;
              return (
                <div
                  key={module.id}
                  className="group relative flex-1"
                >
                  <div className={cn(
                    "h-2 rounded-full transition-all",
                    module.status === 'completed' && "bg-success",
                    module.status === 'in-progress' && "bg-primary",
                    module.status === 'locked' && "bg-muted",
                    module.status === 'overdue' && "bg-destructive"
                  )} />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {module.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}