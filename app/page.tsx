import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import Link from 'next/link';
import { MemoCard } from '#/app/_components/memo-card';

export default function Page() {
  const memos = db.memo.findMany({
    where: { isArchived: false },
    orderBy: { field: 'updatedAt', direction: 'desc' }
  });
  const categories = db.category.findMany();
  const tags = db.tag.findMany();

  // 카테고리별로 메모 그룹화
  const memosByCategory = categories.map(category => ({
    ...category,
    memos: memos.filter(memo => memo.category === category.id)
  })).filter(category => category.memos.length > 0);

  // 고정된 메모들
  const pinnedMemos = memos.filter(memo => memo.isPinned);

  return (
    <Boundary
      label="메모 앱"
      animateRerendering={false}
      kind="solid"
      className="flex flex-col gap-9"
    >
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">내 메모</h1>
          <p className="text-gray-400 mt-2">생각과 아이디어를 정리해보세요</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            검색
          </Link>
          <Link
            href="/memo-editor"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            새 메모 작성
          </Link>
        </div>
      </div>

      {/* 고정된 메모들 */}
      {pinnedMemos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
            📌 고정된 메모
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedMemos.map((memo) => {
              const category = categories.find(c => c.id === memo.category);
              const memoTags = tags.filter(tag => memo.tags.includes(tag.id));
              
              return (
                <MemoCard
                  key={memo.id}
                  memo={memo}
                  category={category}
                  tags={memoTags}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 카테고리별 메모들 */}
      {memosByCategory.map((category) => (
        <div key={category.id} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
            <span style={{ color: category.color }}>{category.icon}</span>
            {category.name}
            <span className="text-sm text-gray-500">({category.memos.length})</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.memos.map((memo) => {
              const memoTags = tags.filter(tag => memo.tags.includes(tag.id));
              
              return (
                <MemoCard
                  key={memo.id}
                  memo={memo}
                  category={category}
                  tags={memoTags}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* 메모가 없을 때 */}
      {memos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-lg">아직 메모가 없습니다</div>
          <div className="text-sm text-gray-500 mb-6">
            첫 번째 메모를 작성해보세요!
          </div>
          <Link
            href="/memo-editor"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            메모 작성하기
          </Link>
        </div>
      )}
    </Boundary>
  );
}
