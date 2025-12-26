import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AssessmentCard } from '@/components/assessment/AssessmentCard';
import { mockAssessments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Assessments() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssessments = mockAssessments.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quizzes = filteredAssessments.filter(a => a.type === 'quiz');
  const exams = filteredAssessments.filter(a => a.type === 'exam');
  const assignments = filteredAssessments.filter(a => a.type === 'assignment');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
            <p className="text-muted-foreground">
              {user?.role === 'student' 
                ? 'View and take your assessments' 
                : 'Manage and create assessments'}
            </p>
          </div>
          {(user?.role === 'admin' || user?.role === 'mentor') && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Assessment
            </Button>
          )}
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({filteredAssessments.length})</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes ({quizzes.length})</TabsTrigger>
            <TabsTrigger value="exams">Exams ({exams.length})</TabsTrigger>
            <TabsTrigger value="assignments">Assignments ({assignments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssessments.map(assessment => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
            {filteredAssessments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No assessments found.
              </div>
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(assessment => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
            {quizzes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No quizzes found.
              </div>
            )}
          </TabsContent>

          <TabsContent value="exams" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {exams.map(assessment => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
            {exams.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No exams found.
              </div>
            )}
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map(assessment => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
            {assignments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No assignments found.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}