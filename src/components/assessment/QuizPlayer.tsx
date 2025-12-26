import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Assessment, Question } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface QuizPlayerProps {
  assessment: Assessment;
  onComplete: (answers: Record<string, number>, timeTaken: number) => void;
}

export function QuizPlayer({ assessment, onComplete }: QuizPlayerProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [startTime] = useState(Date.now());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const currentQuestion = assessment.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / assessment.totalQuestions) * 100;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        if (prev === 60 && !showTimeWarning) {
          setShowTimeWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = useCallback(() => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(answers, timeTaken);
  }, [answers, startTime, onComplete]);

  const unansweredCount = assessment.totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with timer */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-semibold text-foreground">{assessment.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {assessment.totalQuestions}
              </p>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-lg font-semibold",
              timeLeft <= 60 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-secondary text-foreground"
            )}>
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr,200px] gap-6">
          {/* Question area */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'True/False'}
                  </Badge>
                  <CardTitle className="text-xl leading-relaxed">
                    {currentQuestion.text}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFlag}
                  className={cn(flagged.has(currentQuestion.id) && "text-warning")}
                >
                  <Flag className={cn("h-5 w-5", flagged.has(currentQuestion.id) && "fill-current")} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {currentQuestion.points} points
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                    answers[currentQuestion.id] === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium",
                      answers[currentQuestion.id] === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-foreground">{option}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Question navigator */}
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {assessment.questions.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(i)}
                      className={cn(
                        "h-8 w-8 rounded text-sm font-medium transition-colors relative",
                        i === currentIndex && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                        answers[q.id] !== undefined
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      )}
                    >
                      {i + 1}
                      {flagged.has(q.id) && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-warning" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded bg-primary" />
                    Answered
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded bg-secondary" />
                    Unanswered
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    Flagged
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setShowSubmitDialog(true)} 
              className="w-full"
              size="lg"
            >
              Submit Assessment
            </Button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            disabled={currentIndex === assessment.totalQuestions - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Submit confirmation dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Assessment?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>You have answered {answeredCount} of {assessment.totalQuestions} questions.</p>
                {unansweredCount > 0 && (
                  <p className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="h-4 w-4" />
                    {unansweredCount} question(s) unanswered
                  </p>
                )}
                {flagged.size > 0 && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    {flagged.size} question(s) flagged for review
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time warning dialog */}
      <AlertDialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-warning">
              <Clock className="h-5 w-5" />
              1 Minute Remaining!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have less than 1 minute to complete the assessment. Your answers will be automatically submitted when time runs out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}