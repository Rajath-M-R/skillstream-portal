import { StudentAnalytics } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Clock, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsSnapshotProps {
  analytics: StudentAnalytics;
}

export function AnalyticsSnapshot({ analytics }: AnalyticsSnapshotProps) {
  const metrics = [
    {
      label: 'Completion',
      value: `${analytics.completionRate}%`,
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Avg Score',
      value: `${analytics.avgAssessmentScore}%`,
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success/10'
    },
    {
      label: 'Attendance',
      value: `${analytics.attendanceRate}%`,
      icon: Clock,
      color: 'text-accent',
      bg: 'bg-accent/10'
    }
  ];

  const skillLevelColors = {
    beginner: 'bg-muted text-muted-foreground',
    intermediate: 'bg-primary/10 text-primary',
    advanced: 'bg-success/10 text-success'
  };

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Your Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick metrics */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2",
                metric.bg
              )}>
                <metric.icon className={cn("h-5 w-5", metric.color)} />
              </div>
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Streak & Hours */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/10 rounded-full">
              <Flame className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{analytics.currentStreak} day streak</p>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{analytics.totalLearningHours}h</p>
            <p className="text-xs text-muted-foreground">Total hours</p>
          </div>
        </div>

        {/* Skill level badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Skill Level</span>
          </div>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium capitalize",
            skillLevelColors[analytics.skillLevel]
          )}>
            {analytics.skillLevel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}