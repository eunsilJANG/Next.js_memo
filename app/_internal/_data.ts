// This is a mock database used to simplify parts of the app not
// relevant to the demo. In a real app, this data would live in
// a relational database like PostgreSQL or MySQL, accessed through
// a database client or ORM.

export type Memo = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isArchived: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

const categories: Category[] = [
  { id: '1', name: 'Personal', slug: 'personal', color: '#3B82F6', icon: '👤' },
  { id: '2', name: 'Work', slug: 'work', color: '#10B981', icon: '💼' },
  { id: '3', name: 'Ideas', slug: 'ideas', color: '#F59E0B', icon: '💡' },
  { id: '4', name: 'Study', slug: 'study', color: '#8B5CF6', icon: '📚' },
  { id: '5', name: 'Shopping', slug: 'shopping', color: '#EF4444', icon: '🛒' },
  { id: '6', name: 'Travel', slug: 'travel', color: '#06B6D4', icon: '✈️' },
];

const tags: Tag[] = [
  { id: '1', name: 'Important', color: '#EF4444' },
  { id: '2', name: 'Urgent', color: '#F59E0B' },
  { id: '3', name: 'Project', color: '#10B981' },
  { id: '4', name: 'Meeting', color: '#3B82F6' },
  { id: '5', name: 'Todo', color: '#8B5CF6' },
  { id: '6', name: 'Reference', color: '#6B7280' },
];

const memos: Memo[] = [
  {
    id: '1',
    title: 'Next.js App Router 학습 노트',
    content: 'App Router의 새로운 기능들을 정리해보자:\n\n- Server Components\n- Client Components\n- Layouts\n- Loading UI\n- Error Boundaries\n\n특히 캐싱과 병렬 라우팅이 인상적이다.',
    category: '1',
    tags: ['1', '4'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    isPinned: true,
    isArchived: false,
  },
  {
    id: '2',
    title: '프로젝트 아이디어: AI 메모 앱',
    content: 'AI를 활용한 스마트 메모 앱 아이디어:\n\n- 자연어로 메모 작성\n- 자동 태그 생성\n- 관련 메모 추천\n- 음성 메모 기능\n- 이미지 인식으로 텍스트 추출',
    category: '3',
    tags: ['3', '5'],
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    isPinned: false,
    isArchived: false,
  },
  {
    id: '3',
    title: '주간 회의 준비사항',
    content: '다음 주 팀 회의 준비사항:\n\n1. 프로젝트 진행상황 공유\n2. 새로운 기능 요구사항 논의\n3. 기술적 이슈 해결방안\n4. 다음 스프린트 계획 수립',
    category: '2',
    tags: ['1', '4'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    isPinned: true,
    isArchived: false,
  },
  {
    id: '4',
    title: '장보기 목록',
    content: '이번 주 장보기 목록:\n\n- 우유 2개\n- 빵 1개\n- 계란 30개\n- 채소류 (상추, 토마토, 오이)\n- 과일 (사과, 바나나)\n- 생선 (연어)\n- 육류 (닭가슴살)',
    category: '5',
    tags: ['6'],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    isPinned: false,
    isArchived: false,
  },
  {
    id: '5',
    title: 'React 19 새 기능 정리',
    content: 'React 19의 주요 새 기능들:\n\n- use() Hook\n- Server Components\n- Automatic Batching\n- Concurrent Features\n- Suspense 개선\n\n특히 use() Hook이 가장 흥미롭다.',
    category: '4',
    tags: ['1', '6'],
    createdAt: '2024-01-11T14:20:00Z',
    updatedAt: '2024-01-11T14:20:00Z',
    isPinned: false,
    isArchived: false,
  },
  {
    id: '6',
    title: '여행 계획: 제주도',
    content: '제주도 여행 계획:\n\n📅 일정: 3월 15-17일 (2박 3일)\n🏨 숙소: 제주시 호텔 예약 필요\n🚗 렌트카: 공항에서 픽업\n\n방문할 곳:\n- 성산일출봉\n- 만장굴\n- 한라산 등반\n- 해변 산책\n- 현지 맛집 탐방',
    category: '6',
    tags: ['5'],
    createdAt: '2024-01-10T11:30:00Z',
    updatedAt: '2024-01-10T11:30:00Z',
    isPinned: false,
    isArchived: false,
  },
  {
    id: '7',
    title: '개인 목표 2024',
    content: '2024년 개인 목표:\n\n🎯 기술적 목표:\n- TypeScript 마스터하기\n- Next.js 15 완전 정복\n- AI/ML 기초 학습\n\n💪 건강 목표:\n- 주 3회 운동\n- 규칙적인 수면\n- 건강한 식습관\n\n📚 학습 목표:\n- 월 2권 독서\n- 온라인 강의 수강\n- 새로운 언어 학습',
    category: '1',
    tags: ['1', '5'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    isPinned: true,
    isArchived: false,
  },
  {
    id: '8',
    title: '코딩 인터뷰 준비',
    content: '코딩 인터뷰 준비 계획:\n\n📖 알고리즘 문제:\n- LeetCode Easy 50문제\n- Medium 30문제\n- Hard 10문제\n\n💻 기술 스택:\n- JavaScript/TypeScript\n- React/Next.js\n- Node.js\n- Database (SQL/NoSQL)\n\n📝 시스템 설계:\n- 기본적인 아키텍처 패턴\n- 확장성 고려사항\n- 성능 최적화',
    category: '4',
    tags: ['1', '3'],
    createdAt: '2024-01-09T13:45:00Z',
    updatedAt: '2024-01-09T13:45:00Z',
    isPinned: false,
    isArchived: false,
  },
];

export const data = { categories, tags, memos };
