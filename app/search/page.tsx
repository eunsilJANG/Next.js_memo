'use client';

import { useState, useEffect } from 'react';
import { Boundary } from '#/ui/boundary';
import Link from 'next/link';
import { TimeAgo } from '#/app/_components/time-ago';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [memos, setMemos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 카테고리와 태그 데이터 로드
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setTags(data));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() || selectedCategory || selectedTags.length > 0) {
      performSearch();
    } else {
      setMemos([]);
    }
  }, [searchTerm, selectedCategory, selectedTags]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));

      const response = await fetch(`/api/memos?${params}`);
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error('Search error:', error);
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  return (
    <Boundary
      label="메모 검색"
      animateRerendering={false}
      kind="solid"
      className="flex flex-col gap-6"
    >
      {/* 헤더 */}
      <div>
        <Link
          href="/"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          ← 메모 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-100 mt-2">
          메모 검색
        </h1>
      </div>

      {/* 검색 필터 */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="space-y-4">
          {/* 검색어 */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
              검색어
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="제목이나 내용으로 검색..."
            />
          </div>

          {/* 카테고리 필터 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              카테고리
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">모든 카테고리</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 태그 필터 */}
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

          {/* 필터 초기화 */}
          {(searchTerm || selectedCategory || selectedTags.length > 0) && (
            <div>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 검색 결과 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-200">
            검색 결과
            {memos.length > 0 && (
              <span className="text-sm text-gray-500 ml-2">({memos.length}개)</span>
            )}
          </h2>
          {isLoading && (
            <span className="text-sm text-gray-400">검색 중...</span>
          )}
        </div>

        {memos.length === 0 && !isLoading && (searchTerm || selectedCategory || selectedTags.length > 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">검색 결과가 없습니다.</div>
            <div className="text-sm text-gray-500">
              다른 검색어나 필터를 시도해보세요.
            </div>
          </div>
        )}

        {memos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memos.map((memo) => {
              const category = categories.find(c => c.id === memo.category);
              const memoTags = tags.filter(tag => memo.tags.includes(tag.id));
              
              return (
                <Link
                  href={`/memos/${memo.id}`}
                  key={memo.id}
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
                    <TimeAgo date={memo.updatedAt} className="text-xs text-gray-500" />
                  </div>
                  
                  {memoTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {memoTags.map(tag => (
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
            })}
          </div>
        )}
      </div>
    </Boundary>
  );
} 