'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';

interface MemoCardProps {
  memo: any;
  category: any;
  tags: any[];
}

export function MemoCard({ memo, category, tags }: MemoCardProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(memo.updatedAt), { addSuffix: true, locale: ko }));
    
    // 1분마다 시간 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(memo.updatedAt), { addSuffix: true, locale: ko }));
    }, 60000);

    return () => clearInterval(interval);
  }, [memo.updatedAt]);

  return (
    <Link
      href={`/memos/${memo.id}`}
      className="group block bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-700"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-200 group-hover:text-gray-50 line-clamp-2">
          {memo.title}
        </h3>
      </div>
      
      <p className="text-sm text-gray-400 line-clamp-3 mb-3">
        {memo.content.replace(/\n/g, ' ')}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          {category && (
            <span 
              className="px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon} {category.name}
            </span>
          )}
        </div>
        <span>{timeAgo}</span>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map(tag => (
            <span
              key={tag.id}
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
} 