# Notion Invoice Manager 개발 로드맵

Notion을 CMS로 활용하여 인보이스를 작성하고, 웹에서 조회 및 PDF로 다운로드할 수 있는 간단한 시스템

## 개요

Notion Invoice Manager는 프리랜서, 소규모 사업자 및 그들의 클라이언트를 위한 인보이스 관리 시스템으로 다음 기능을 제공합니다:

- **Notion 데이터베이스 연동**: Notion API를 통해 인보이스 데이터를 실시간으로 읽어옴
- **인보이스 목록 및 상세 조회**: 깔끔한 UI로 인보이스 정보 확인
- **PDF 생성 및 다운로드**: 클라이언트가 인보이스를 PDF로 저장/인쇄 가능

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 완료 표시로 갱신

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

- **Task 001: 프로젝트 구조 및 라우팅 설정** - 우선순위
  - See: `/tasks/001-project-structure.md`
  - Next.js App Router 기반 전체 라우트 구조 생성
  - 인보이스 목록 페이지 (`/invoices`) 빈 껍데기 생성
  - 인보이스 상세 페이지 (`/invoices/[id]`) 동적 라우트 생성
  - 공통 레이아웃 컴포넌트 골격 확인 및 수정

- **Task 002: 타입 정의 및 인터페이스 설계**
  - See: `/tasks/002-type-definitions.md`
  - Invoice 인터페이스 정의 (Notion DB 스키마 기반)
  - InvoiceItem (청구 항목) 타입 정의
  - API 응답 타입 정의
  - Notion API 응답을 Invoice 모델로 변환하는 유틸리티 타입 정의

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

- **Task 003: 공통 컴포넌트 및 더미 데이터 설정**
  - See: `/tasks/003-common-components.md`
  - shadcn/ui 필수 컴포넌트 설치 (Table, Badge, Skeleton 등)
  - 더미 인보이스 데이터 생성 (`lib/dummy-data.ts`)
  - 공통 인보이스 관련 컴포넌트 골격 생성

- **Task 004: 홈 페이지 (랜딩) UI 구현**
  - See: `/tasks/004-home-page.md`
  - 서비스 소개 섹션 구현
  - 주요 기능 설명 (Notion 연동, PDF 생성) 카드 UI
  - 사용 방법 안내 섹션
  - "인보이스 목록 보기" CTA 버튼

- **Task 005: 인보이스 목록 페이지 UI 구현**
  - See: `/tasks/005-invoice-list-page.md`
  - 인보이스 테이블 컴포넌트 구현 (번호, 클라이언트명, 발행일, 금액)
  - 간단한 검색 기능 UI (인보이스 번호 또는 클라이언트명)
  - 테이블 행 클릭 시 상세 페이지 이동 기능
  - 로딩 스켈레톤 UI
  - 더미 데이터로 UI 테스트

- **Task 006: 인보이스 상세 페이지 UI 구현**
  - See: `/tasks/006-invoice-detail-page.md`
  - 인보이스 헤더 (번호, 발행일) 컴포넌트
  - 발행자/클라이언트 정보 카드 컴포넌트
  - 청구 항목 테이블 컴포넌트
  - 총액 및 결제 조건 섹션
  - PDF 다운로드 버튼 UI (기능 미구현)
  - 목록으로 돌아가기 버튼
  - 프린트 친화적 레이아웃 스타일링
  - 더미 데이터로 UI 테스트

---

### Phase 3: 핵심 기능 구현

- **Task 007: Notion API 연동 설정**
  - See: `/tasks/007-notion-api-setup.md`
  - @notionhq/client 패키지 설치
  - 환경 변수 설정 (.env.local 템플릿)
  - Notion 클라이언트 인스턴스 생성 (`lib/notion.ts`)
  - Notion API 연결 테스트 유틸리티
  - Playwright MCP를 활용한 API 연동 테스트

- **Task 008: 인보이스 데이터 서비스 구현**
  - See: `/tasks/008-invoice-service.md`
  - 인보이스 목록 조회 함수 구현 (F001, F002)
  - 개별 인보이스 상세 조회 함수 구현 (F001, F003)
  - Notion 페이지 속성을 Invoice 모델로 변환하는 파서
  - 에러 핸들링 및 타입 안전성 보장
  - Playwright MCP를 활용한 데이터 조회 테스트

- **Task 009: API Routes 구현**
  - See: `/tasks/009-api-routes.md`
  - GET /api/invoices - 인보이스 목록 API
  - GET /api/invoices/[id] - 인보이스 상세 API
  - 에러 응답 표준화
  - Playwright MCP를 활용한 API 엔드포인트 테스트

- **Task 010: 더미 데이터를 실제 API로 교체**
  - See: `/tasks/010-api-integration.md`
  - 인보이스 목록 페이지에서 실제 API 호출로 교체
  - 인보이스 상세 페이지에서 실제 API 호출로 교체
  - 로딩 상태 및 에러 상태 처리 구현
  - Playwright MCP를 활용한 통합 테스트

- **Task 011: 핵심 기능 통합 테스트**
  - See: `/tasks/011-integration-test.md`
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트
  - 인보이스 목록 조회 -> 상세 페이지 이동 시나리오 테스트
  - 검색 기능 테스트
  - 에러 핸들링 및 엣지 케이스 테스트

---

### Phase 4: PDF 기능 및 최적화

- **Task 012: PDF 생성 라이브러리 설정**
  - See: `/tasks/012-pdf-library-setup.md`
  - react-pdf/renderer 패키지 설치 및 설정
  - PDF 생성을 위한 기본 컴포넌트 구조 생성
  - API Route for PDF 생성 골격 구현

- **Task 013: 인보이스 PDF 템플릿 구현**
  - See: `/tasks/013-pdf-template.md`
  - PDF 문서 레이아웃 컴포넌트 구현
  - 인보이스 헤더 (번호, 발행일) PDF 스타일링
  - 발행자/클라이언트 정보 섹션 PDF 스타일링
  - 청구 항목 테이블 PDF 스타일링
  - 총액 및 결제 조건 섹션 PDF 스타일링

- **Task 014: PDF 다운로드 기능 완성 (F004)**
  - See: `/tasks/014-pdf-download.md`
  - GET /api/invoices/[id]/pdf API 구현
  - PDF 다운로드 버튼 기능 연결
  - 파일명 규칙 설정 (예: INV-2025-001.pdf)
  - 다운로드 상태 표시 (로딩 인디케이터)
  - Playwright MCP를 활용한 PDF 다운로드 테스트

---

### Phase 5: 최적화 및 배포

- **Task 015: 성능 최적화**
  - See: `/tasks/015-performance-optimization.md`
  - 이미지 및 폰트 최적화
  - 인보이스 목록 페이지 캐싱 전략 (ISR/SSG 검토)
  - 번들 사이즈 분석 및 최적화
  - 페이지 로딩 속도 2초 이내 달성

- **Task 016: 에러 처리 및 UX 개선**
  - See: `/tasks/016-error-handling.md`
  - 글로벌 에러 바운더리 구현
  - Notion API 연결 실패 시 사용자 친화적 메시지
  - 404 페이지 개선 (존재하지 않는 인보이스)
  - 로딩 상태 UX 개선

- **Task 017: 반응형 및 접근성 최종 검토**
  - See: `/tasks/017-responsive-a11y.md`
  - 모바일 반응형 최종 테스트
  - 다크 모드 일관성 검토
  - 접근성 (a11y) 기본 요소 검토
  - 크로스 브라우저 테스트

- **Task 018: 배포 및 문서화**
  - See: `/tasks/018-deployment.md`
  - Vercel 배포 설정
  - 환경 변수 설정 가이드 작성
  - README.md 사용 방법 업데이트
  - Notion 데이터베이스 설정 가이드

---

## 기능 추적 매트릭스

| 기능 ID | 기능명 | 관련 Task | 상태 |
|---------|--------|-----------|------|
| F001 | Notion 데이터베이스 연동 | Task 007, 008, 009, 010 | 대기 |
| F002 | 인보이스 목록 조회 | Task 005, 008, 010 | 대기 |
| F003 | 인보이스 상세 보기 | Task 006, 008, 010 | 대기 |
| F004 | PDF 생성 및 다운로드 | Task 012, 013, 014 | 대기 |

---

## 성공 지표 추적

### 기능 완성도
- [ ] Notion API 연동 성공률 100%
- [ ] PDF 생성 오류율 < 1%
- [ ] 페이지 로딩 속도 < 2초

### 사용자 경험
- [ ] 인보이스 목록 로딩 시간 < 2초
- [ ] PDF 다운로드 시간 < 5초
- [ ] 모바일 반응형 지원 (모든 페이지)

### MVP 달성 목표
- [ ] Notion에서 인보이스 작성 후 즉시 웹에서 확인 가능
- [ ] 클라이언트가 공유 링크로 즉시 인보이스 조회 및 PDF 다운로드 가능
- [ ] 다크 모드 지원으로 시각적 일관성 유지

---

## 기술 스택 요약

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | Next.js 16.1 (App Router), React 19.2 |
| 언어 | TypeScript 5.x |
| 스타일링 | TailwindCSS v4, shadcn/ui |
| 폼/검증 | React Hook Form 7.x, Zod 4.x |
| 외부 API | @notionhq/client (Notion API v1) |
| PDF 생성 | react-pdf/renderer |
| 배포 | Vercel |

---

**문서 버전**: 1.0
**최종 수정일**: 2025-12-25
**기반 PRD**: notion-prd.md v2.0
