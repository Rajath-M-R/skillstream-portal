import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockAssessments } from '@/data/mockData';
import { QuizPlayer } from '@/components/assessment/QuizPlayer';
import { ResultsView } from '@/components/assessment/ResultsView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileQuestion, Award, ArrowLeft, Play } from 'lucide-react';

export default function TakeAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{ answers: Record<string, number>; timeTaken: number } | null>(null);

  const assessment = mockAssessments.find(a => a.id === id);

  if (!assessment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="py-8 text-center">
            <h1 className="text-xl font-semibold text-foreground mb-2">Assessment Not Found</h1>
            <p className="text-muted-foreground mb-4">The assessment you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/assessments">Back to Assessments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = (answers: Record<string, number>, timeTaken: number) => {
    setResults({ answers, timeTaken });
    setCompleted(true);
  };

  // Show results
  if (completed && results) {
    return (
      <ResultsView 
        assessment={assessment} 
        answers={results.answers} 
        timeTaken={results.timeTaken} 
      />
    );
  }

  // Show quiz player
  if (started) {
    return <QuizPlayer assessment={assessment} onComplete={handleComplete} />;
  }

  // Show start screen
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/assessments')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>

        <Card className="border-border/50">
          <CardHeader className="text-center pb-2">
            <Badge className="self-center mb-4 capitalize">{assessment.type}</Badge>
            <CardTitle className="text-2xl">{assessment.title}</CardTitle>
            <p className="text-muted-foreground mt-2">{assessment.courseName}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              {assessment.description}
            </p>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-full bg-primary/10 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{assessment.duration}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-full bg-primary/10 mb-2">
                  <FileQuestion className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{assessment.totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-full bg-primary/10 mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{assessment.passingScore}%</p>
                <p className="text-sm text-muted-foreground">To Pass</p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-foreground">Instructions</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Answer all questions within the time limit</li>
                <li>• You can flag questions to review later</li>
                <li>• Once started, the timer cannot be paused</li>
                <li>• Your answers will be auto-submitted when time runs out</li>
                <li>• Minimum {assessment.passingScore}% required to pass</li>
              </ul>
            </div>

            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={() => setStarted(true)}
            >
              <Play className="h-5 w-5" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}