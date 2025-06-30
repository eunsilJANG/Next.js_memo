# 메모 앱 (Next.js Playground)

Next.js App Router를 활용한 메모 CRUD 애플리케이션입니다. 카테고리별 분류, 태그 시스템, 고정 메모 기능을 제공합니다.

## 🛠 기술스택

### Frontend
- **Next.js 14.2.3** - React 기반 풀스택 프레임워크
- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **TypeScript** - 정적 타입 검사
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크

### Backend & Database
- **Next.js API Routes** - 서버리스 API 엔드포인트
- **In-Memory Database** - 개발용 메모리 기반 데이터 저장소
- **Mock ORM** - 데이터베이스 추상화 레이어

### 개발 도구
- **pnpm** - 패키지 매니저
- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅

## 🎨 디자인 라이브러리 & UI 컴포넌트

### Core UI Components
- **Boundary** - 컴포넌트 경계 표시 및 디버깅
- **Button** - 재사용 가능한 버튼 컴포넌트
- **Skeleton** - 로딩 상태 표시
- **Tabs** - 탭 인터페이스

### Utility Components
- **TimeAgo** - 상대적 시간 표시 (예: "3분 전")
- **MemoCard** - 메모 카드 레이아웃
- **Byline** - 작성자 정보 표시
- **ExternalLink** - 외부 링크 컴포넌트

### Styling
- **Tailwind CSS** - 유틸리티 클래스 기반 스타일링
- **Dark Theme** - 다크 모드 우선 디자인
- **Responsive Design** - 모바일/데스크톱 반응형 레이아웃

## 📁 폴더 구조

```
next-app-router-playground/
├── app/                          # Next.js App Router
│   ├── _components/              # 공통 컴포넌트
│   │   ├── memo-card.tsx         # 메모 카드 컴포넌트
│   │   └── time-ago.tsx          # 시간 표시 컴포넌트
│   ├── _internal/                # 내부 데이터 및 설정
│   │   ├── _data.ts              # Mock 데이터 정의
│   │   └── readme.md             # 내부 문서
│   ├── api/                      # API 라우트
│   │   ├── categories/           # 카테고리 API
│   │   ├── memos/                # 메모 CRUD API
│   │   ├── tags/                 # 태그 API
│   │   └── og/                   # Open Graph 이미지 생성
│   ├── memo-editor/              # 메모 작성/편집 페이지
│   ├── memos/                    # 메모 상세/삭제 페이지
│   ├── search/                   # 메모 검색 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 페이지 (메모 목록)
│   └── not-found.tsx             # 404 페이지
├── lib/                          # 유틸리티 라이브러리
│   └── db.ts                     # Mock ORM 및 데이터베이스 로직
├── ui/                           # 재사용 가능한 UI 컴포넌트
│   ├── boundary.tsx              # 컴포넌트 경계 표시
│   ├── button.tsx                # 버튼 컴포넌트
│   ├── skeleton.tsx              # 스켈레톤 로딩
│   └── tabs.tsx                  # 탭 컴포넌트
├── styles/                       # 글로벌 스타일
│   └── globals.css               # Tailwind CSS 및 커스텀 스타일
└── public/                       # 정적 파일
```

## 🚀 실행 방법

### 1. 의존성 설치
```sh
pnpm install
```

### 2. 개발 서버 실행
```sh
pnpm dev
```

### 3. 프로덕션 빌드
```sh
pnpm build
```

## 📋 주요 기능

### 메모 관리
- ✅ 메모 작성, 수정, 삭제
- ✅ 카테고리별 분류
- ✅ 태그 시스템
- ✅ 고정 메모 기능
- ✅ 실시간 검색

### 사용자 경험
- ✅ 반응형 디자인
- ✅ 다크 테마
- ✅ 로딩 상태 표시
- ✅ 직관적인 네비게이션

### 기술적 특징
- ✅ App Router 기반 라우팅
- ✅ 서버 컴포넌트 최적화
- ✅ API Routes를 통한 백엔드 로직
- ✅ TypeScript 타입 안전성

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 18.17.0 이상
- pnpm 8.0.0 이상

### 환경 변수
현재 개발 환경에서는 별도의 환경 변수 설정이 필요하지 않습니다.

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React 19 문서](https://react.dev)
