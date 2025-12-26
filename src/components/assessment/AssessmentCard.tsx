import { Link } from 'react-router-dom';
import { Assessment, mockAttempts } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileQuestion, CheckCircle, XCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentCardProps {
  assessment: Assessment;
}

export function AssessmentCard({ assessment }: AssessmentCardProps) {
  const { user } = useAuth();
  
  const attempt = user ? mockAttempts.find(
    a => a.assessmentId === assessment.id && a.userId === user.id
  ) : null;

  const typeColors = {
    quiz: 'bg-primary/10 text-primary',
    exam: 'bg-accent/10 text-accent',
    assignment: 'bg-secondary text-secondary-foreground'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {assessment.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{assessment.courseName}</p>
          </div>
          <Badge className={cn('capitalize shrink-0', typeColors[assessment.type])}>
            {assessment.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {assessment.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{assessment.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileQuestion className="h-4 w-4" />
            <span>{assessment.totalQuestions} questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{assessment.totalPoints} pts</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="text-sm">
            <span className="text-muted-foreground">Pass: </span>
            <span className="font-medium text-foreground">{assessment.passingScore}%</span>
          </div>
          
          {attempt ? (
            <div className="flex items-center gap-2">
              {attempt.passed ? (
                <Badge className="bg-success/10 text-success gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Passed ({attempt.percentage}%)
                </Badge>
              ) : (
                <Badge className="bg-destructive/10 text-destructive gap-1">
                  <XCircle className="h-3 w-3" />
                  Failed ({attempt.percentage}%)
                </Badge>
              )}
            </div>
          ) : (
            <Button asChild size="sm" className="gap-1.5">
              <Link to={`/assessments/${assessment.id}/take`}>
                <Play className="h-3.5 w-3.5" />
                Start
              </Link>
            </Button>
          )}
        </div>

        {assessment.dueDate && (
          <p className="text-xs text-muted-foreground">
            Due: {new Date(assessment.dueDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}