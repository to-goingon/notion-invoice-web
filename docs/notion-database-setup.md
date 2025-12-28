# Notion 데이터베이스 설정 가이드

이 가이드는 Notion Invoice Manager를 사용하기 위한 Notion 데이터베이스를 설정하는 방법을 안내합니다.

## 📋 목차

1. [Notion Integration 생성](#1-notion-integration-생성)
2. [Invoices 데이터베이스 생성](#2-invoices-데이터베이스-생성)
3. [Items 데이터베이스 생성](#3-items-데이터베이스-생성)
4. [데이터베이스 연결](#4-데이터베이스-연결)
5. [테스트 데이터 추가](#5-테스트-데이터-추가)

## 1. Notion Integration 생성

### 1.1 Notion Integration 페이지 방문

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)로 이동
2. "New integration" 버튼 클릭

### 1.2 Integration 설정

다음 정보를 입력합니다:

- **이름**: `Invoice Manager` (또는 원하는 이름)
- **워크스페이스**: 사용할 워크스페이스 선택
- **타입**: Internal Integration
- **Capabilities** (권한 설정):
  - ✅ Read content
  - ✅ Read comments (선택사항)
  - ✅ No user information

### 1.3 API 키 복사

1. Integration을 생성하면 **Internal Integration Token**이 표시됩니다
2. "Show" 버튼을 클릭하여 토큰을 확인
3. 토큰을 복사합니다 (형식: `secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
4. 이 토큰을 `.env.local` 파일의 `NOTION_API_KEY`에 저장합니다

⚠️ **중요**: API 키는 절대 공개 저장소에 커밋하지 마세요!

## 2. Invoices 데이터베이스 생성

### 2.1 새 데이터베이스 생성

1. Notion에서 새 페이지를 생성합니다
2. 페이지 제목을 "Invoices"로 설정합니다
3. `/database` 명령을 입력하고 "Table - Inline"을 선택합니다

### 2.2 속성(Properties) 설정

다음 속성들을 정확하게 추가합니다 (이름과 타입이 정확히 일치해야 합니다):

| 속성 이름 | 타입 | 설명 | 필수 |
|-----------|------|------|------|
| `Invoice Number` | Title | 인보이스 번호 (예: INV-2024-001) | ✅ |
| `Issue Date` | Date | 발행일 | ✅ |
| `Due Date` | Date | 만기일 | ✅ |
| `Client Name` | Text | 클라이언트 이름 | ✅ |
| `Client Email` | Email | 클라이언트 이메일 | ❌ |
| `Client Address` | Text | 클라이언트 주소 | ❌ |
| `Issuer Name` | Text | 발행자 이름 | ❌ |
| `Issuer Email` | Email | 발행자 이메일 | ❌ |
| `Issuer Address` | Text | 발행자 주소 | ❌ |
| `Total Amount` | Number | 총 금액 | ✅ |
| `Currency` | Select | 통화 (KRW, USD 등) | ❌ |
| `Status` | Select | 상태 (진행중, 완료 등) | ✅ |
| `Notes` | Text | 비고 | ❌ |

### 2.3 Currency 옵션 설정

Currency 속성에 다음 옵션을 추가합니다:
- `KRW` (기본값)
- `USD`
- `EUR`
- `JPY`

### 2.4 Status 옵션 설정

Status 속성에 다음 옵션을 추가합니다:
- `진행중` (기본값)
- `완료`
- `취소됨`

### 2.5 데이터베이스 ID 확인

1. 데이터베이스를 전체 페이지로 엽니다
2. 브라우저 주소창의 URL을 확인합니다
   ```
   https://www.notion.so/{workspace}/{database_id}?v={view_id}
   ```
3. `{database_id}` 부분을 복사합니다 (32자 문자열)
4. 이를 `.env.local` 파일의 `NOTION_DATABASE_ID`에 저장합니다

## 3. Items 데이터베이스 생성

### 3.1 새 데이터베이스 생성

1. Notion에서 새 페이지를 생성합니다
2. 페이지 제목을 "Items"로 설정합니다
3. `/database` 명령을 입력하고 "Table - Inline"을 선택합니다

### 3.2 속성(Properties) 설정

다음 속성들을 정확하게 추가합니다:

| 속성 이름 | 타입 | 설명 | 필수 |
|-----------|------|------|------|
| `Name` | Title | 항목 이름 (예: 웹 개발 서비스) | ✅ |
| `Invoice` | Relation | Invoices 데이터베이스와 연결 | ✅ |
| `Quantity` | Number | 수량 | ✅ |
| `Unit Price` | Number | 단가 | ✅ |
| `Amount` | Formula | 금액 (자동 계산) | ✅ |

### 3.3 Relation 설정

1. `Invoice` 속성을 추가할 때 "Relation" 타입을 선택합니다
2. "Invoices" 데이터베이스를 선택합니다
3. 관계 설정:
   - Relation type: Multiple items (한 인보이스에 여러 항목)

### 3.4 Formula 설정

`Amount` 속성의 Formula를 다음과 같이 설정합니다:

```
prop("Quantity") * prop("Unit Price")
```

이 Formula는 수량 × 단가를 자동으로 계산합니다.

### 3.5 데이터베이스 ID 확인

1. Items 데이터베이스를 전체 페이지로 엽니다
2. 브라우저 주소창의 URL에서 `{database_id}` 부분을 복사합니다
3. 이를 `.env.local` 파일의 `NOTION_ITEMS_DATABASE_ID`에 저장합니다

## 4. 데이터베이스 연결

### 4.1 Invoices 데이터베이스 공유

1. Invoices 데이터베이스 페이지를 엽니다
2. 페이지 우측 상단의 "..." 메뉴를 클릭합니다
3. "Connections" → "Add connections"를 선택합니다
4. 이전에 생성한 Integration (예: "Invoice Manager")을 선택합니다

### 4.2 Items 데이터베이스 공유

Items 데이터베이스에도 동일한 과정을 반복합니다.

⚠️ **중요**: 두 데이터베이스 모두 Integration과 공유되어야 API를 통해 접근할 수 있습니다!

## 5. 테스트 데이터 추가

### 5.1 테스트 인보이스 추가

Invoices 데이터베이스에 다음과 같은 테스트 데이터를 추가합니다:

#### 인보이스 1
- **Invoice Number**: `INV-2024-001`
- **Issue Date**: `2024-01-15`
- **Due Date**: `2024-02-15`
- **Client Name**: `테스트 고객사`
- **Client Email**: `client@example.com`
- **Client Address**: `서울시 강남구 테헤란로 123`
- **Issuer Name**: `내 회사명`
- **Issuer Email**: `me@example.com`
- **Issuer Address**: `서울시 서초구 서초대로 456`
- **Total Amount**: `1500000`
- **Currency**: `KRW`
- **Status**: `완료`
- **Notes**: `웹사이트 개발 프로젝트`

### 5.2 테스트 항목 추가

Items 데이터베이스에 위 인보이스에 대한 항목을 추가합니다:

#### 항목 1
- **Name**: `웹사이트 디자인`
- **Invoice**: INV-2024-001 (선택)
- **Quantity**: `1`
- **Unit Price**: `500000`
- **Amount**: (자동 계산: 500000)

#### 항목 2
- **Name**: `프론트엔드 개발`
- **Invoice**: INV-2024-001 (선택)
- **Quantity**: `1`
- **Unit Price**: `700000`
- **Amount**: (자동 계산: 700000)

#### 항목 3
- **Name**: `백엔드 개발`
- **Invoice**: INV-2024-001 (선택)
- **Quantity**: `1`
- **Unit Price**: `300000`
- **Amount**: (자동 계산: 300000)

### 5.3 Total Amount 확인

Invoices 데이터베이스의 Total Amount가 Items의 Amount 합계와 일치하는지 확인합니다:
- Items 합계: 500,000 + 700,000 + 300,000 = 1,500,000 ✅

## 6. 환경 변수 최종 확인

`.env.local` 파일이 다음과 같이 설정되어 있는지 확인합니다:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Invoices DB ID
NOTION_ITEMS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Items DB ID
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 7. 테스트

1. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```

2. 브라우저에서 [http://localhost:3000/invoices](http://localhost:3000/invoices)를 엽니다

3. 테스트 인보이스가 표시되는지 확인합니다

4. 인보이스를 클릭하여 상세 페이지로 이동합니다

5. PDF 다운로드 버튼을 클릭하여 PDF 생성을 테스트합니다

## 🎉 완료!

Notion 데이터베이스 설정이 완료되었습니다! 이제 Notion에서 인보이스를 생성하고 관리하면 자동으로 웹 애플리케이션에 반영됩니다.

## 🐛 문제 해결

### "Unauthorized" 에러
- Integration API 키가 올바른지 확인
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버를 재시작했는지 확인

### 데이터베이스를 찾을 수 없음
- 데이터베이스 ID가 정확한지 확인
- 데이터베이스가 Integration과 공유되었는지 확인

### 속성을 읽을 수 없음
- 속성 이름이 정확히 일치하는지 확인 (대소문자 구분)
- 속성 타입이 올바른지 확인

### Items가 표시되지 않음
- Items 데이터베이스의 Relation이 올바르게 설정되었는지 확인
- Items의 Invoice 필드에 올바른 인보이스가 선택되었는지 확인

## 📚 추가 리소스

- [Notion API 공식 문서](https://developers.notion.com/)
- [Notion Database 속성 가이드](https://developers.notion.com/reference/property-object)
- [프로젝트 README](../README.md)

---

문제가 계속되면 GitHub Issues에 문의해주세요!
