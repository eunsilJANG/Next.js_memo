import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import Button from '#/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TimeAgo } from '#/app/_components/time-ago';

export default async function MemoPage(props: any) {
  const awaitedProps = await props;
  const params = await awaitedProps.params;
  
  console.log('Looking for memo with ID:', params.id); // 디버깅용 로그
  
  const memo = db.memo.find({ where: { id: params.id } });
  
  console.log('Found memo:', memo); // 디버깅용 로그
  
  if (!memo) {
    console.log('Memo not found, calling notFound()'); // 디버깅용 로그
    notFound();
  }

  const category = db.category.find({ where: { id: memo.category } });
  const tags = db.tag.findMany().filter(tag => memo.tags.includes(tag.id));

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