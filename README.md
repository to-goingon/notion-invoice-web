# Notion Invoice Manager

Notion을 CMS로 활용한 인보이스 관리 시스템입니다. Notion 데이터베이스에서 인보이스를 작성하고, 웹에서 조회하며, PDF로 다운로드할 수 있습니다.

## ✨ 주요 기능

- 📊 **Notion 연동** - Notion API를 통해 실시간 데이터 동기화
- 📋 **인보이스 목록** - 검색 및 필터링 기능이 있는 인보이스 목록
- 📄 **상세 보기** - 개별 인보이스의 완전한 상세 정보
- 📥 **PDF 다운로드** - 전문적인 PDF 인보이스 생성 및 다운로드
- 🌓 **다크 모드** - 라이트/다크/시스템 테마 지원
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 최적화
- ♿ **접근성** - WCAG 2.1 AA 수준 준수
- 🚀 **ISR 캐싱** - 빠른 페이지 로딩을 위한 증분 정적 재생성

## 🛠️ 기술 스택

### 핵심
- [Next.js 16.1](https://nextjs.org/) - React 프레임워크 (App Router)
- [TypeScript 5](https://www.typescriptlang.org/) - 타입 안전성
- [React 19](https://react.dev/) - UI 라이브러리

### UI & 스타일링
- [Tailwind CSS v4](https://tailwindcss.com/) - 유틸리티 CSS 프레임워크
- [shadcn/ui](https://ui.shadcn.com/) - 접근 가능한 컴포넌트 라이브러리
- [next-themes](https://github.com/pacocoursey/next-themes) - 다크 모드 지원
- [Lucide React](https://lucide.dev/) - 아이콘 라이브러리

### 데이터 & API
- [@notionhq/client](https://github.com/makenotion/notion-sdk-js) - Notion API SDK
- [Zod](https://zod.dev/) - 런타임 타입 검증
- [@react-pdf/renderer](https://react-pdf.org/) - PDF 생성

## 📋 사전 요구사항

- Node.js 18.17 이상
- npm, pnpm 또는 yarn
- Notion 계정 및 워크스페이스

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone <your-repo-url>
cd notion-invoice
```

### 2. 의존성 설치

```bash
npm install
# 또는
pnpm install
# 또는
yarn install
```

### 3. Notion 설정

Notion에서 인보이스 데이터베이스를 설정해야 합니다. 자세한 내용은 [Notion 데이터베이스 설정 가이드](./docs/notion-database-setup.md)를 참조하세요.

### 4. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성합니다:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 편집하여 Notion 인증 정보를 입력합니다:

```env
# Notion Integration API Key
# https://www.notion.so/my-integrations 에서 생성
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Notion Invoices 데이터베이스 ID
# 데이터베이스 URL에서 추출: https://www.notion.so/{workspace}/{database_id}?v=...
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Items 데이터베이스 ID
NOTION_ITEMS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 애플리케이션 기본 URL (선택사항)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. 개발 서버 실행

```bash
npm run dev
# 또는
pnpm dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 📁 프로젝트 구조

```
notion-invoice/
├── app/
│   ├── (main)/              # 메인 레이아웃 페이지
│   │   ├── invoices/        # 인보이스 목록 및 상세
│   │   └── page.tsx         # 홈 페이지
│   ├── api/                 # API 라우트
│   │   └── invoices/        # 인보이스 API
│   ├── layout.tsx           # 루트 레이아웃
│   ├── globals.css          # 글로벌 스타일
│   ├── error.tsx            # 글로벌 에러 바운더리
│   └── not-found.tsx        # 404 페이지
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── header.tsx           # 사이트 헤더
│   ├── footer.tsx           # 사이트 푸터
│   ├── invoice-*.tsx        # 인보이스 컴포넌트
│   └── pdf-*.tsx            # PDF 관련 컴포넌트
├── lib/
│   ├── notion.ts            # Notion 클라이언트 설정
│   ├── env.ts               # 환경 변수 검증
│   ├── services/            # 비즈니스 로직
│   │   └── invoice-service.ts
│   └── pdf/                 # PDF 생성
│       └── invoice-template.tsx
├── types/
│   └── index.ts             # TypeScript 타입 정의
└── docs/
    └── notion-database-setup.md  # Notion 설정 가이드
```

## 🎯 사용 가능한 스크립트

- `npm run dev` - Turbopack으로 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 시작
- `npm run lint` - ESLint 실행
- `npm run format` - Prettier로 코드 포맷
- `npm run format:check` - 코드 포맷 확인
- `npm run type-check` - TypeScript 타입 체크
- `npm run check-all` - 모든 체크 실행 (린트, 포맷, 타입 체크)

## 🌐 배포

### Vercel (권장)

1. GitHub에 코드를 푸시합니다
2. [Vercel](https://vercel.com)에서 저장소를 임포트합니다
3. 환경 변수를 설정합니다:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `NOTION_ITEMS_DATABASE_ID`
   - `NEXT_PUBLIC_BASE_URL` (선택사항)
4. 자동으로 배포됩니다

### 다른 플랫폼

프로덕션 빌드:

```bash
npm run build
```

프로덕션 서버 시작:

```bash
npm start
```

애플리케이션은 `http://localhost:3000`에서 실행됩니다.

## 🔒 환경 변수

| 변수 | 설명 | 필수 |
|------|------|------|
| `NOTION_API_KEY` | Notion Integration API 키 | ✅ |
| `NOTION_DATABASE_ID` | Invoices 데이터베이스 ID | ✅ |
| `NOTION_ITEMS_DATABASE_ID` | Items 데이터베이스 ID | ✅ |
| `NEXT_PUBLIC_BASE_URL` | 애플리케이션 기본 URL | ❌ |

자세한 설정 방법은 [Notion 데이터베이스 설정 가이드](./docs/notion-database-setup.md)를 참조하세요.

## 📖 API 엔드포인트

### GET /api/invoices
모든 인보이스 목록을 조회합니다.

### GET /api/invoices/[id]
특정 인보이스의 상세 정보를 조회합니다.

### GET /api/invoices/[id]/pdf
특정 인보이스의 PDF를 생성하고 다운로드합니다.

## 🎨 주요 기능 설명

### ISR 캐싱
인보이스 목록 페이지는 60초마다 재검증되는 ISR(Incremental Static Regeneration)을 사용합니다. 이를 통해 빠른 로딩 속도와 최신 데이터를 동시에 제공합니다.

### 에러 처리
- 글로벌 에러 바운더리
- 페이지별 에러 처리
- 사용자 친화적 에러 메시지
- 개발 모드에서만 기술 정보 표시

### 접근성
- WCAG 2.1 AA 수준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환
- Skip to content 링크
- ARIA 레이블 및 속성

### 반응형 디자인
- 모바일 햄버거 메뉴
- 반응형 테이블 (작은 화면에서 열 숨김)
- 터치 친화적 UI
- 유동적 레이아웃

## 🐛 문제 해결

### Notion API 연결 실패
- Notion Integration API 키가 올바른지 확인
- 데이터베이스가 Integration과 공유되었는지 확인
- 데이터베이스 ID가 정확한지 확인

### 빌드 에러
캐시를 지우고 다시 빌드:

```bash
rm -rf .next
npm run build
```

### 타입 에러
타입 체크 실행:

```bash
npm run type-check
```

## 📚 추가 문서

- [Notion 데이터베이스 설정 가이드](./docs/notion-database-setup.md)
- [개발 로드맵](./docs/ROADMAP.md)
- [제품 요구사항 문서](./docs/notion-prd.md)
- [Claude 개발 가이드](./CLAUDE.md)

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

## 📄 라이선스

MIT

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [shadcn/ui](https://ui.shadcn.com/) - 컴포넌트 라이브러리
- [Notion](https://www.notion.so/) - API 제공

---

Made with ❤️ using Next.js, Notion API, and shadcn/ui
