import { Link } from 'react-router-dom';
import { Assessment, Question } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsViewProps {
  assessment: Assessment;
  answers: Record<string, number>;
  timeTaken: number;
}

export function ResultsView({ assessment, answers, timeTaken }: ResultsViewProps) {
  // Calculate score
  let score = 0;
  const results = assessment.questions.map(question => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      score += question.points;
    }
    return {
      question,
      userAnswer,
      isCorrect
    };
  });

  const percentage = Math.round((score / assessment.totalPoints) * 100);
  const passed = percentage >= assessment.passingScore;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Results header */}
        <Card className={cn(
          "border-2 mb-8",
          passed ? "border-success bg-success/5" : "border-destructive bg-destructive/5"
        )}>
          <CardContent className="py-8">
            <div className="text-center">
              <div className={cn(
                "inline-flex items-center justify-center h-20 w-20 rounded-full mb-4",
                passed ? "bg-success/20" : "bg-destructive/20"
              )}>
                {passed ? (
                  <Trophy className="h-10 w-10 text-success" />
                ) : (
                  <XCircle className="h-10 w-10 text-destructive" />
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {passed 
                  ? 'You have successfully passed this assessment.' 
                  : `You need ${assessment.passingScore}% to pass. Don't give up!`}
              </p>

              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{percentage}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{score}/{assessment.totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{formatTime(timeTaken)}</p>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <Button asChild variant="outline">
                  <Link to="/assessments">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Assessments
                  </Link>
                </Button>
                {!passed && (
                  <Button asChild>
                    <Link to={`/assessments/${assessment.id}/take`}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed results */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Review Answers</h2>
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={result.question.id} className={cn(
              "border-l-4",
              result.isCorrect ? "border-l-success" : "border-l-destructive"
            )}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-secondary text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <CardTitle className="text-base font-medium">
                      {result.question.text}
                    </CardTitle>
                  </div>
                  {result.isCorrect ? (
                    <Badge className="bg-success/10 text-success gap-1 shrink-0">
                      <CheckCircle className="h-3 w-3" />
                      Correct
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive gap-1 shrink-0">
                      <XCircle className="h-3 w-3" />
                      Incorrect
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.question.options.map((option, optIndex) => {
                  const isUserAnswer = result.userAnswer === optIndex;
                  const isCorrectAnswer = result.question.correctAnswer === optIndex;
                  
                  return (
                    <div
                      key={optIndex}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border",
                        isCorrectAnswer && "bg-success/10 border-success",
                        isUserAnswer && !isCorrectAnswer && "bg-destructive/10 border-destructive",
                        !isUserAnswer && !isCorrectAnswer && "border-border"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium",
                        isCorrectAnswer 
                          ? "bg-success text-success-foreground" 
                          : isUserAnswer 
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-secondary text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className={cn(
                        "text-sm",
                        isCorrectAnswer ? "text-success font-medium" : 
                        isUserAnswer && !isCorrectAnswer ? "text-destructive" : "text-foreground"
                      )}>
                        {option}
                      </span>
                      {isCorrectAnswer && (
                        <CheckCircle className="h-4 w-4 text-success ml-auto" />
                      )}
                      {isUserAnswer && !isCorrectAnswer && (
                        <XCircle className="h-4 w-4 text-destructive ml-auto" />
                      )}
                    </div>
                  );
                })}
                <p className="text-xs text-muted-foreground pt-2">
                  Points: {result.isCorrect ? result.question.points : 0} / {result.question.points}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}