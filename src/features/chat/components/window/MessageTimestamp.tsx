```typescript
import React from 'react';
import { format } from 'date-fns';

interface MessageTimestampProps {
  date: Date;
  className?: string;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  date,
  className = ''
}) => {
  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const formatMessageDate = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'MMM d, HH:mm');
  };

  return (
    <div className={`text-xs text-fjs-silver ${className}`}>
      {formatMessageDate(date)}
    </div>
  );
};
```