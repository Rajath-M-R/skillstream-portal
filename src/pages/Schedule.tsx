import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Video, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon, 
  ExternalLink, 
  CheckCircle, 
  XCircle,
  QrCode,
  Bell,
  ChevronRight,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO, isToday, isTomorrow, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { mockSessions, Session } from '@/data/mockData';

interface AttendanceRecord {
  sessionId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  checkInMethod?: 'manual' | 'qr' | 'auto';
}

const mockAttendance: AttendanceRecord[] = [
  { sessionId: 's1', status: 'present', checkInTime: '10:02 AM', checkInMethod: 'qr' },
  { sessionId: 's2', status: 'absent' },
  { sessionId: 's3', status: 'late', checkInTime: '11:15 AM', checkInMethod: 'manual' },
];

const mockAttendanceStats = {
  totalSessions: 24,
  attended: 20,
  missed: 2,
  late: 2,
  percentage: 83
};

export default function Schedule() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (!user) return null;

  const getSessionsForDate = (date: Date) => {
    return mockSessions.filter(session => 
      isSameDay(parseISO(session.date), date)
    );
  };

  const sessionsForSelectedDate = selectedDate ? getSessionsForDate(selectedDate) : [];

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const statusConfig = {
    present: { label: 'Present', color: 'bg-success/10 text-success', icon: CheckCircle },
    absent: { label: 'Absent', color: 'bg-destructive/10 text-destructive', icon: XCircle },
    late: { label: 'Late', color: 'bg-warning/10 text-warning', icon: Clock },
    excused: { label: 'Excused', color: 'bg-muted text-muted-foreground', icon: CheckCircle }
  };

  // Get dates with sessions for calendar highlighting
  const sessionDates = mockSessions.map(s => parseISO(s.date));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Schedule</h1>
            <p className="text-muted-foreground mt-1">Manage your sessions and track attendance</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Set Reminders
            </Button>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-foreground">{mockAttendanceStats.percentage}%</p>
                </div>
                <div className={cn(
                  "p-3 rounded-full",
                  mockAttendanceStats.percentage >= 80 ? "bg-success/10" : "bg-warning/10"
                )}>
                  <CheckCircle className={cn(
                    "h-5 w-5",
                    mockAttendanceStats.percentage >= 80 ? "text-success" : "text-warning"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">{mockAttendanceStats.totalSessions}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attended</p>
                  <p className="text-2xl font-bold text-success">{mockAttendanceStats.attended}</p>
                </div>
                <div className="p-3 rounded-full bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Missed</p>
                  <p className="text-2xl font-bold text-destructive">{mockAttendanceStats.missed}</p>
                </div>
                <div className="p-3 rounded-full bg-destructive/10">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Late</p>
                  <p className="text-2xl font-bold text-warning">{mockAttendanceStats.late}</p>
                </div>
                <div className="p-3 rounded-full bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="shadow-card lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Session Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasSession: sessionDates
                }}
                modifiersStyles={{
                  hasSession: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))'
                  }
                }}
              />
              {selectedDate && sessionsForSelectedDate.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sessionsForSelectedDate.length} session{sessionsForSelectedDate.length > 1 ? 's' : ''} scheduled
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sessions List */}
          <Card className="shadow-card lg:col-span-2">
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-4">
              <TabsContent value="upcoming" className="mt-0 space-y-3">
                {mockSessions.filter(s => s.status === 'upcoming').map((session) => (
                  <SessionCard 
                    key={session.id} 
                    session={session}
                    onQrClick={() => {
                      setSelectedSession(session);
                      setQrDialogOpen(true);
                    }}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="today" className="mt-0 space-y-3">
                {mockSessions.filter(s => isToday(parseISO(s.date))).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>No sessions scheduled for today</p>
                  </div>
                ) : (
                  mockSessions.filter(s => isToday(parseISO(s.date))).map((session) => (
                    <SessionCard 
                      key={session.id} 
                      session={session}
                      showQr
                      onQrClick={() => {
                        setSelectedSession(session);
                        setQrDialogOpen(true);
                      }}
                    />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="history" className="mt-0 space-y-3">
                {mockAttendance.map((record, index) => {
                  const session = mockSessions.find(s => s.id === record.sessionId);
                  if (!session) return null;
                  const config = statusConfig[record.status];
                  const StatusIcon = config.icon;
                  
                  return (
                    <div
                      key={record.sessionId}
                      className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            session.type === 'live' ? "bg-primary/10" : "bg-muted"
                          )}>
                            {session.type === 'live' ? (
                              <Video className="h-4 w-4 text-primary" />
                            ) : (
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{session.title}</p>
                            <p className="text-xs text-muted-foreground">{session.courseName}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span>{format(parseISO(session.date), 'MMM d, yyyy')}</span>
                              <span>•</span>
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className={cn("text-xs", config.color)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                          {record.checkInTime && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Check-in: {record.checkInTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        {/* Session Reminders Section */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Session Reminders</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Manage all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ReminderCard
                title="React Hooks Deep Dive"
                date="Tomorrow, 10:00 AM"
                reminder="30 min before"
                enabled
              />
              <ReminderCard
                title="TypeScript Generics Workshop"
                date="Jan 23, 2:00 PM"
                reminder="1 hour before"
                enabled
              />
              <ReminderCard
                title="Python Data Structures Lab"
                date="Jan 24, 11:00 AM"
                reminder="Not set"
                enabled={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>QR Code Check-in</DialogTitle>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-medium text-foreground">{selectedSession.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedSession.courseName}</p>
                </div>
                
                {/* QR Code placeholder */}
                <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-foreground/5 border-2 border-dashed border-border rounded-lg flex items-center justify-center mx-auto mb-4">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code to mark your attendance
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm">
                  <span className="text-muted-foreground">Session starts at</span>
                  <span className="font-medium text-foreground">{selectedSession.time}</span>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setQrDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Manual Check-in
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

interface SessionCardProps {
  session: Session;
  showQr?: boolean;
  onQrClick: () => void;
}

function SessionCard({ session, showQr, onQrClick }: SessionCardProps) {
  const isLive = session.type === 'live';
  const dateLabel = isToday(parseISO(session.date)) 
    ? 'Today' 
    : isTomorrow(parseISO(session.date)) 
      ? 'Tomorrow' 
      : format(parseISO(session.date), 'EEE, MMM d');

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all hover:shadow-soft",
      isLive ? "bg-primary/5 border-primary/20" : "bg-card"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2.5 rounded-lg",
            isLive ? "bg-primary/10" : "bg-muted"
          )}>
            {isLive ? (
              <Video className="h-5 w-5 text-primary" />
            ) : (
              <MapPin className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-foreground">{session.title}</p>
              <Badge variant="secondary" className="text-xs">
                {isLive ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{session.courseName}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateLabel}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {session.time}
              </span>
              <span>{session.duration} min</span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {session.instructor}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isLive && session.meetingLink && (
            <Button size="sm" className="gap-1.5" asChild>
              <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Join
              </a>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5"
            onClick={onQrClick}
          >
            <QrCode className="h-3.5 w-3.5" />
            Check-in
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ReminderCardProps {
  title: string;
  date: string;
  reminder: string;
  enabled: boolean;
}

function ReminderCard({ title, date, reminder, enabled }: ReminderCardProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all",
      enabled ? "bg-card" : "bg-muted/30"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            enabled ? "bg-primary/10" : "bg-muted"
          )}>
            <Bell className={cn(
              "h-4 w-4",
              enabled ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className={cn(
                "text-xs",
                enabled ? "text-primary" : "text-muted-foreground"
              )}>
                {reminder}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          {enabled ? 'Edit' : 'Set'}
        </Button>
      </div>
    </div>
  );
}