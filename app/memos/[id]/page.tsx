'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Boundary } from '#/ui/boundary';
import Button from '#/ui/button';
import Link from 'next/link';
import { TimeAgo } from '#/app/_components/time-ago';

export default function MemoPage() {
  const params = useParams();
  const router = useRouter();
  const [memo, setMemo] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        setIsLoading(true);
        console.log('Looking for memo with ID:', params.id);
        
        const response = await fetch(`/api/memos/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('메모를 찾을 수 없습니다.');
          } else {
            setError('메모를 불러오는데 실패했습니다.');
          }
          return;
        }
        
        const memoData = await response.json();
        console.log('Found memo:', memoData);
        setMemo(memoData);
        
        // 카테고리와 태그 정보도 가져오기
        const [categoryRes, tagsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/tags')
        ]);
        
        const categories = await categoryRes.json();
        const tagsData = await tagsRes.json();
        
        const memoCategory = categories.find((c: any) => c.id === memoData.category);
        const memoTags = tagsData.filter((t: any) => memoData.tags.includes(t.id));
        
        setCategory(memoCategory);
        setTags(memoTags);
        
      } catch (error) {
        console.error('Error fetching memo:', error);
        setError('메모를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchMemo();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <Boundary
        label="메모 상세"
        animateRerendering={false}
        kind="solid"
        className="flex flex-col gap-6"
      >
        <div className="p-6 text-center text-gray-400">로딩 중...</div>
      </Boundary>
    );
  }

  if (error || !memo) {
    return (
      <Boundary
        label="메모 상세"
        animateRerendering={false}
        kind="solid"
        className="flex flex-col gap-6"
      >
        <div className="p-6 text-center text-gray-400">
          {error || '메모를 찾을 수 없습니다.'}
        </div>
        <div className="text-center">
          <Link href="/">
            <Button>메모 목록으로</Button>
          </Link>
        </div>
      </Boundary>
    );
  }

  return (
    <Boundary
      label="메모 상세"
      animateRerendering={false}
      kind="solid"
      className="flex flex-col gap-6"
    >
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              ← 메모 목록으로
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {category.icon} {category.name}
              </span>
            )}
            {memo.isPinned && (
              <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">
                📌 고정됨
              </span>
            )}
            <TimeAgo date={memo.updatedAt} />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href={`/memo-editor?id=${memo.id}`}>
            <Button>편집</Button>
          </Link>
          <Link href={`/memos/${memo.id}/delete`}>
            <Button kind="error">삭제</Button>
          </Link>
        </div>
      </div>

      {/* 메모 내용 */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">
          {memo.title}
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {memo.content}
          </div>
        </div>
      </div>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 메타 정보 */}
      <div className="text-sm text-gray-500 space-y-1">
        <div>생성일: {new Date(memo.createdAt).toLocaleDateString('ko-KR')}</div>
        <div>수정일: {new Date(memo.updatedAt).toLocaleDateString('ko-KR')}</div>
      </div>

      {/* 네비게이션 */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800">
        {memo.prev && (
          <Link
            href={`/memos/${memo.prev}`}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← 이전 메모
          </Link>
        )}
        {memo.next && (
          <Link
            href={`/memos/${memo.next}`}
            className="text-gray-400 hover:text-gray-300 transition-colors ml-auto"
          >
            다음 메모 →
          </Link>
        )}
      </div>
    </Boundary>
  );
} 