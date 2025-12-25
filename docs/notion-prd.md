# Notion Invoice Manager MVP PRD

## 🎯 핵심 정보

**목적**: Notion을 CMS로 활용하여 인보이스를 작성하고, 웹에서 조회 및 PDF로 다운로드할 수 있는 간단한 시스템
**사용자**: 프리랜서, 소규모 사업자 및 그들의 클라이언트

---

## 🚶 사용자 여정

### A. 인보이스 발행자 플로우

```
1. Notion 데이터베이스 설정
   ↓ [Notion에서 인보이스 데이터베이스 생성 및 권한 설정]

2. 환경 변수 설정
   ↓ [Next.js 앱에 Notion API 키와 DB ID 설정]

3. Notion에서 인보이스 작성
   ↓ [Notion 데이터베이스에 새 인보이스 페이지 생성]

4. 웹 앱에서 확인
   ↓ [인보이스 목록 페이지에서 자동으로 표시됨]

5. 공유 링크 복사
   ↓ [인보이스 상세 페이지 URL 클라이언트에게 전송]
```

### B. 인보이스 수령자 (클라이언트) 플로우

```
1. 공유 링크 수신
   ↓ [발행자로부터 받은 URL 클릭]

2. 인보이스 상세 페이지
   ↓ [인보이스 내용 확인]

3. PDF 다운로드
   ↓ [다운로드 버튼 클릭]

4. PDF 저장 완료
```

---

## ⚡ 기능 명세

### 1. MVP 핵심 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|-------------|------------|
| **F001** | Notion 데이터베이스 연동 | Notion API를 통해 인보이스 데이터베이스 읽기 | 핵심 CMS 기능 제공 | 인보이스 목록 페이지, 인보이스 상세 페이지 |
| **F002** | 인보이스 목록 조회 | Notion DB의 모든 인보이스를 목록으로 표시 | 전체 인보이스 확인 필수 | 인보이스 목록 페이지 |
| **F003** | 인보이스 상세 보기 | 개별 인보이스의 모든 정보 표시 (번호, 날짜, 항목, 금액 등) | 클라이언트 조회 핵심 기능 | 인보이스 상세 페이지 |
| **F004** | PDF 생성 및 다운로드 | 인보이스를 PDF 형식으로 변환하여 다운로드 | 클라이언트의 핵심 니즈 (저장/인쇄) | 인보이스 상세 페이지 |

### 2. MVP 이후 기능 (제외)

- 사용자 인증 (로그인/회원가입)
- 관리자 대시보드
- 설정 페이지 (API 키 관리)
- 인보이스 상태 관리 (발행/지불 대기/완료)
- 실시간 동기화
- 이메일 자동 발송
- 인보이스 템플릿 커스터마이징
- 결제 게이트웨이 연동
- 통계 및 리포트

---

## 📱 메뉴 구조

```
📱 Notion Invoice Manager 내비게이션

🏠 홈
└── 기능: 서비스 소개

📋 인보이스 목록
└── 기능: F001, F002 (Notion 연동, 목록 조회)

📄 인보이스 상세
└── 기능: F001, F003, F004 (Notion 연동, 상세 보기, PDF 다운로드)
```

---

## 📄 페이지별 상세 기능

### 홈 페이지

> **구현 기능:** 없음 (랜딩 페이지) | **메뉴 위치:** 헤더 메인 메뉴

| 항목 | 내용 |
|------|------|
| **역할** | 서비스 랜딩 페이지 |
| **진입 경로** | 직접 접속 (루트 URL) |
| **사용자 행동** | 서비스 설명 읽기, 인보이스 목록 보기 버튼 클릭 |
| **주요 기능** | • 서비스 소개 섹션<br>• 주요 기능 설명 (Notion 연동, PDF 생성)<br>• 사용 방법 안내<br>• **인보이스 목록 보기** 버튼 → 인보이스 목록 페이지 이동 |
| **다음 이동** | 인보이스 목록 보기 → 인보이스 목록 페이지 |

---

### 인보이스 목록 페이지

> **구현 기능:** `F001`, `F002` | **인증:** 불필요 (공개)

| 항목 | 내용 |
|------|------|
| **역할** | 모든 인보이스 목록 표시 |
| **진입 경로** | 홈에서 버튼 클릭, 헤더 메뉴 클릭 |
| **사용자 행동** | 인보이스 목록 확인, 특정 인보이스 클릭하여 상세 보기 |
| **주요 기능** | • Notion DB에서 가져온 인보이스 목록 테이블<br>• 각 행: 인보이스 번호, 클라이언트명, 발행일, 금액<br>• 간단한 검색 기능 (인보이스 번호 또는 클라이언트명)<br>• 테이블 행 클릭 → 인보이스 상세 페이지 이동 |
| **다음 이동** | 인보이스 클릭 → 인보이스 상세 페이지 |

---

### 인보이스 상세 페이지

> **구현 기능:** `F001`, `F003`, `F004` | **인증:** 불필요 (공개)

| 항목 | 내용 |
|------|------|
| **역할** | 개별 인보이스의 전체 내용 표시 및 PDF 다운로드 |
| **진입 경로** | 인보이스 목록에서 특정 인보이스 클릭, 또는 공유 링크 직접 접속 |
| **사용자 행동** | 인보이스 내용 확인, PDF 다운로드 |
| **주요 기능** | • 인보이스 전체 정보 표시<br>  - 발행자 정보 (이름, 이메일, 주소)<br>  - 클라이언트 정보 (이름, 이메일, 주소)<br>  - 인보이스 번호 및 발행일<br>  - 청구 항목 리스트 (품목, 수량, 단가, 금액)<br>  - 총액 계산<br>  - 결제 조건 및 메모<br>• **PDF 다운로드** 버튼 → PDF 생성 및 다운로드<br>• **목록으로** 버튼 → 인보이스 목록 페이지 복귀<br>• 깨끗하고 프린트 친화적인 디자인 |
| **다음 이동** | 목록으로 → 인보이스 목록 페이지 |

---

## 🗄️ 데이터 소스

### Notion Database (인보이스 데이터베이스)

Notion에서 직접 관리하는 데이터베이스. 웹 앱은 읽기 전용으로 접근.

| 속성명 | Notion 타입 | 설명 |
|--------|-------------|------|
| Invoice Number | Title | 인보이스 번호 (예: INV-2025-001) |
| Issue Date | Date | 발행일 |
| Client Name | Text | 클라이언트 이름 |
| Client Email | Email | 클라이언트 이메일 |
| Client Address | Text | 클라이언트 주소 |
| Issuer Name | Text | 발행자 이름 |
| Issuer Email | Email | 발행자 이메일 |
| Issuer Address | Text | 발행자 주소 |
| Total Amount | Number | 총액 |
| Currency | Select | 통화 (KRW, USD 등) |
| Items | Text | 청구 항목 (JSON 형식) |
| Notes | Text | 결제 조건 및 메모 |

### 청구 항목 JSON 구조 예시

```json
[
  {
    "description": "웹사이트 디자인",
    "quantity": 1,
    "unit_price": 1000000,
    "amount": 1000000
  },
  {
    "description": "프론트엔드 개발",
    "quantity": 40,
    "unit_price": 50000,
    "amount": 2000000
  }
]
```

---

## 🛠️ 기술 스택

### 🎨 프론트엔드 프레임워크

- **Next.js 16.1** (App Router) - React 풀스택 프레임워크
- **TypeScript 5.x** - 타입 안전성 보장
- **React 19.2** - UI 라이브러리

### 🎨 스타일링 & UI

- **TailwindCSS v4** - 유틸리티 CSS 프레임워크
- **shadcn/ui** - 고품질 React 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **next-themes** - 다크 모드 지원

### 📝 폼 & 검증

- **React Hook Form 7.x** - 폼 상태 관리 (검색 기능용)
- **Zod 4.x** - 스키마 검증 라이브러리

### 🔗 외부 API

- **@notionhq/client** - Notion API 공식 SDK
- **Notion API v1** - 인보이스 데이터베이스 읽기 (읽기 전용)

### 📄 PDF 생성

- **react-pdf/renderer** - React 컴포넌트로 PDF 생성
- 또는 **jsPDF + html2canvas** - HTML을 PDF로 변환

### 🚀 배포 & 호스팅

- **Vercel** - Next.js 최적화 배포 플랫폼

### 📦 패키지 관리

- **npm** - 의존성 관리

---

## 🎯 핵심 기술 아키텍처

### Notion 통합 플로우

```
1. 환경 변수에 Notion API 키 + 데이터베이스 ID 설정
   ↓
2. Next.js API Route가 Notion SDK로 데이터베이스 쿼리
   ↓
3. Notion 페이지 속성을 Invoice 모델로 변환
   ↓
4. 페이지에서 데이터 표시 (서버 컴포넌트에서 직접 fetch)
```

### PDF 생성 전략

```
Option A (react-pdf/renderer - 권장):
- React 컴포넌트로 PDF 레이아웃 정의
- API Route에서 서버 사이드 PDF 생성
- 장점: 안정적, 일관된 출력

Option B (jsPDF + html2canvas):
- 클라이언트에서 HTML을 캔버스로 변환 후 PDF화
- 장점: 구현 간단, 현재 화면 그대로 PDF화
```

### 공유 링크 구조

```
- URL: /invoice/[notion-page-id]
- Notion 페이지 ID를 직접 사용하여 접근
- 별도 토큰 생성 불필요
- 인증 없이 누구나 접근 가능
```

---

## ✅ 성공 지표

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

## 🚀 개발 단계

**Phase 1: Notion 연동**
- Notion API SDK 설치 및 설정
- 환경 변수 설정 (.env.local)
- Notion 데이터베이스 읽기 테스트

**Phase 2: 페이지 구현**
- 홈 페이지 (랜딩)
- 인보이스 목록 페이지 (F001, F002)
- 인보이스 상세 페이지 (F001, F003)

**Phase 3: PDF 기능**
- PDF 생성 라이브러리 선택 및 설정
- PDF 다운로드 구현 (F004)
- 인보이스 템플릿 디자인

**Phase 4: 최적화 및 배포**
- 성능 최적화 (이미지, 폰트)
- 에러 처리 강화
- Vercel 배포

---

## 📋 환경 설정

### 필수 환경 변수 (.env.local)

```env
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.js 설정
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📚 개발자 참고사항

### Notion API 사용 예시

```typescript
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 데이터베이스 쿼리
const response = await notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID!,
  sorts: [{ property: 'Issue Date', direction: 'descending' }],
});

// 페이지 상세 정보 가져오기
const page = await notion.pages.retrieve({
  page_id: pageId
});
```

### PDF 생성 예시 (react-pdf/renderer)

```typescript
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Invoice #{invoice.invoice_number}</Text>
      </View>
      {/* ... */}
    </Page>
  </Document>
);
```

### API Route 예시

```typescript
// app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return NextResponse.json(response.results);
}
```

---

**문서 버전**: 2.0 (Simplified MVP)
**최종 수정일**: 2025-12-25
**작성자**: PRD 생성 시스템 (Claude Code)

---

## 정합성 검증 완료 ✅

### 1단계: 기능 명세 → 페이지 연결 검증
- ✅ F001 → 인보이스 목록 페이지, 인보이스 상세 페이지
- ✅ F002 → 인보이스 목록 페이지
- ✅ F003 → 인보이스 상세 페이지
- ✅ F004 → 인보이스 상세 페이지

### 2단계: 메뉴 구조 → 페이지 연결 검증
- ✅ 홈 → 홈 페이지
- ✅ 인보이스 목록 → 인보이스 목록 페이지
- ✅ 인보이스 상세 → 인보이스 상세 페이지

### 3단계: 페이지별 상세 기능 → 역참조 검증
- ✅ 모든 페이지의 구현 기능 ID가 기능 명세에 정의됨
- ✅ 모든 페이지가 메뉴 구조에서 접근 가능

### 4단계: 누락 및 고아 항목 검증
- ✅ 기능 명세의 모든 기능이 페이지에서 구현됨
- ✅ 페이지의 모든 기능이 기능 명세에 정의됨
- ✅ 메뉴의 모든 항목에 대응하는 페이지 존재

**정합성 검증 결과: 통과 ✅**
