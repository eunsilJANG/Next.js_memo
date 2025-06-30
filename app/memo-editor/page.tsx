'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Boundary } from '#/ui/boundary';
import Button from '#/ui/button';
import Link from 'next/link';

function MemoEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memoId = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    // 카테고리와 태그 데이터 로드
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setTags(data));

    // 편집 모드인 경우 기존 메모 데이터 로드
    if (memoId) {
      fetch(`/api/memos/${memoId}`)
        .then(res => res.json())
        .then(memo => {
          setTitle(memo.title);
          setContent(memo.content);
          setCategory(memo.category);
          setSelectedTags(memo.tags);
          setIsPinned(memo.isPinned);
        });
    }
  }, [memoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const memoData = {
        title,
        content,
        category,
        tags: selectedTags,
        isPinned,
      };

      const url = memoId ? `/api/memos/${memoId}` : '/api/memos';
      const method = memoId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoData),
      });

      if (response.ok) {
        const savedMemo = await response.json();
        router.push(`/memos/${savedMemo.id}`);
      } else {
        throw new Error('메모 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving memo:', error);
      alert('메모 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <Boundary
      label="메모 편집"
      animateRerendering={false}
      kind="solid"
      className="flex flex-col gap-6"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← 메모 목록으로
          </Link>
          <h1 className="text-2xl font-bold text-gray-100 mt-2">
            {memoId ? '메모 편집' : '새 메모 작성'}
          </h1>
        </div>
      </div>

      {/* 편집 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="메모 제목을 입력하세요"
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            카테고리
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 내용 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="메모 내용을 입력하세요..."
            required
          />
        </div>

        {/* 태그 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            태그
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag.id) 
                    ? tag.color 
                    : `${tag.color}20`
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* 옵션 */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm text-gray-300">고정하기</span>
          </label>
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '저장 중...' : (memoId ? '수정' : '저장')}
          </Button>
          <Link href="/">
            <Button type="button" kind="error">
              취소
            </Button>
          </Link>
        </div>
      </form>
    </Boundary>
  );
}

export default function MemoEditorPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <MemoEditorContent />
    </Suspense>
  );
} 