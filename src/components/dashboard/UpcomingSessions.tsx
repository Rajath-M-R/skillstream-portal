import { Session } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';

interface UpcomingSessionsProps {
  sessions: Session[];
}

function getSessionDateLabel(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE, MMM d');
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const upcomingSessions = sessions
    .filter(s => s.status === 'upcoming')
    .slice(0, 3);

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Upcoming Sessions</CardTitle>
          <span className="text-xs text-muted-foreground">
            {upcomingSessions.length} scheduled
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingSessions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming sessions
          </p>
        ) : (
          upcomingSessions.map((session) => {
            const dateLabel = getSessionDateLabel(session.date);
            const isLive = session.type === 'live';
            
            return (
              <div
                key={session.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  isLive ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-border"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isLive ? "bg-primary/10" : "bg-muted"
                    )}>
                      {isLive ? (
                        <Video className="h-4 w-4 text-primary" />
                      ) : (
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {session.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {session.courseName}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {dateLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {session.time}
                        </span>
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isLive && session.meetingLink && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3 text-xs"
                    asChild
                  >
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Join Meeting
                    </a>
                  </Button>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}