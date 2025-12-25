import { Announcement } from '@/data/mockData';
import { Info, AlertTriangle, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const typeConfig = {
    info: { icon: Info, color: 'text-primary bg-primary/10' },
    urgent: { icon: AlertTriangle, color: 'text-destructive bg-destructive/10' },
    reminder: { icon: Bell, color: 'text-warning bg-warning/10' },
  };

  const config = typeConfig[announcement.type];
  const Icon = config.icon;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-soft transition-shadow duration-200">
      <div className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
        config.color
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-foreground">{announcement.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {new Date(announcement.date).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {announcement.message}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Posted by {announcement.author}
        </p>
      </div>
    </div>
  );
}
