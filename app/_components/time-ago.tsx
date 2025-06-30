'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';

interface TimeAgoProps {
  date: string;
  className?: string;
}

export function TimeAgo({ date, className = "text-sm text-gray-500" }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko }));
    
    // 1분마다 시간 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko }));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <span className={className}>{timeAgo}</span>;
} 