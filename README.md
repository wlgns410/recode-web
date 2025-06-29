# Recode Frontend - 이력서 생성기

React와 TypeScript를 기반으로 한 맞춤형 이력서 생성 웹 애플리케이션입니다.

## 🚀 주요 기능

### Frontend 주요 내용

- **이력서 입력 탭**: 개인정보, 학력, 경력, 프로젝트, 수상, 자격증을 체계적으로 관리
- **스타일별 이력서 미리보기**: 모던, 클래식, 창의적 3가지 스타일로 이력서 미리보기 제공
- **PDF 다운로드 기능**: 생성된 이력서를 PDF 형태로 다운로드 가능

### 연결

- **Apollo Client**로 백엔드 GraphQL API 연동
- **html2canvas + jsPDF**로 PDF 생성 및 다운로드

## 🔗 관련 프로젝트

- **Frontend**: [recode-web](https://github.com/wlgns410/recode-web) (현재 프로젝트)
- **Backend**: [recode-backend](https://github.com/wlgns410/recode-backend)

## 🎬 시연영상

### 1. 로그인

![로그인](https://github.com/user-attachments/assets/a57548f6-b06e-4323-9694-72fa0568c5ce)

### 2. 오늘 한 일 입력

![오늘 한 일 입력](https://github.com/user-attachments/assets/66e8f8ee-ce06-49aa-9b06-9607647deb4b)

### 3. 달력으로 기록 보기

![달력으로 기록 보기](https://github.com/user-attachments/assets/cfb48ccb-c5be-4835-bdd2-bfedb591c36c)

### 4. 이력서 기본 내용 관리

![이력서 기본 내용](https://github.com/user-attachments/assets/b634dddd-f1d2-4b21-a812-4534491cf4bc)

### 5. PDF 스타일 선택 && 다운로드

![PDF 다운로드](https://github.com/user-attachments/assets/62bd6fbe-c8ee-4c20-b7f1-5407dc77b998)

## 🛠 기술 스택

### Frontend

- **React 18** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안정성 확보
- **Tailwind CSS** - 스타일링 및 반응형 디자인
- **Vite** - 빠른 개발 환경 및 빌드 도구
- **Lucide React** - 아이콘 라이브러리

### GraphQL & PDF

- **Apollo Client** - GraphQL 클라이언트
- **html2canvas** - DOM 요소를 캔버스로 변환
- **jsPDF** - PDF 생성 라이브러리

### 개발 도구

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **PostCSS** - CSS 후처리

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── resume/                    # 이력서 관련 컴포넌트
│   │   ├── graphql/              # GraphQL 쿼리/뮤테이션
│   │   │   ├── queries/          # GraphQL 쿼리
│   │   │   └── mutations/        # GraphQL 뮤테이션
│   │   ├── types/                # 이력서 관련 타입 정의
│   │   ├── constants/            # 상수 정의
│   │   ├── PersonalInfoTab.tsx   # 개인정보 탭
│   │   ├── EducationTab.tsx      # 학력 탭
│   │   ├── CareerTab.tsx         # 경력 탭
│   │   ├── ProjectsTab.tsx       # 프로젝트 탭
│   │   ├── AwardsTab.tsx         # 수상 탭
│   │   └── CertificationsTab.tsx # 자격증 탭
│   ├── ResumePreview.tsx         # 이력서 미리보기
│   ├── ResumeInfoScreen.tsx      # 이력서 정보 관리 화면
│   ├── HomeScreen.tsx            # 홈 화면
│   ├── authScreen.tsx            # 인증 화면
│   ├── CalendarScreen.tsx        # 캘린더 화면
│   └── SelectResume.tsx          # 이력서 선택 화면
├── auth/                         # 인증 관련
│   ├── graphql/                  # 인증 GraphQL
│   └── components/               # 인증 컴포넌트
├── types/                        # TypeScript 타입 정의
├── hooks/                        # 커스텀 훅
├── utils/                        # 유틸리티 함수
├── assets/                       # 정적 자산
├── App.tsx                       # 메인 앱 컴포넌트
└── main.tsx                      # 앱 진입점
```

## 🎯 핵심 기능 상세

### 1. 이력서 정보 관리

- **개인정보**: 이름, 이메일, 전화번호, 블로그 주소
- **학력**: 학교명, 전공, 기간, 학점
- **경력**: 회사명, 직책, 업계, 기간, 업무 요약
- **프로젝트**: 프로젝트명, 설명, 기간, 기술 스택, 역할
- **수상**: 수상명, 수상일, 발행기관
- **자격증**: 자격증명, 취득일, 발행기관

### 2. 이력서 스타일

- **모던 스타일**: 깔끔하고 현대적인 디자인
- **클래식 스타일**: 전통적이고 안정적인 디자인
- **창의적 스타일**: 창의적이고 독특한 디자인

### 3. PDF 생성

- 실시간 이력서 미리보기
- 고품질 PDF 다운로드
- 반응형 레이아웃 지원

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 🔧 환경 설정

### 필수 환경 변수

```env
VITE_GRAPHQL_ENDPOINT=your_graphql_endpoint
```

## 📝 아쉬웠던 점

### 1. 데이터 관리

- **상태 관리 복잡성**: 각 탭별로 개별 상태를 관리하여 데이터 동기화가 복잡했음
- **GraphQL 쿼리 중복**: 각 탭마다 별도의 쿼리를 사용하여 코드 중복 발생
- **에러 처리 부족**: GraphQL 에러 및 네트워크 에러에 대한 사용자 친화적 처리 부족

### 2. 사용자 경험

- **로딩 상태 부족**: 데이터 로딩 중 사용자 피드백 부족
- **폼 검증 미흡**: 입력 데이터에 대한 실시간 검증 기능 부족
- **반응형 디자인**: 모바일 환경에서의 최적화 부족

### 3. PDF 생성

- **PDF 품질**: html2canvas 변환 시 텍스트 품질 저하
- **페이지 분할**: 긴 이력서의 경우 페이지 분할 로직 부족
- **스타일 일관성**: PDF와 웹 미리보기 간 스타일 차이

### 4. 코드 품질

- **타입 안정성**: 일부 any 타입 사용으로 타입 안정성 저하
- **컴포넌트 분리**: 큰 컴포넌트들의 세분화 부족
- **테스트 코드**: 단위 테스트 및 통합 테스트 부족
- **테스트 코드 완전 부재**: Jest, React Testing Library 등 테스트 프레임워크 미설치
- **컴포넌트 테스트**: 각 탭 컴포넌트의 동작 검증 부족
- **GraphQL 테스트**: 쿼리/뮤테이션 동작 검증 부족
- **PDF 생성 테스트**: PDF 다운로드 기능 검증 부족

## 🎯 개선할 점

### 1. 상태 관리 개선

- **Zustand/Redux 도입**: 전역 상태 관리로 데이터 동기화 개선
- **React Query 도입**: 서버 상태 관리 및 캐싱 최적화
- **폼 라이브러리**: React Hook Form으로 폼 관리 개선

### 2. 사용자 경험 향상

- **로딩 스피너**: 데이터 로딩 중 시각적 피드백
- **토스트 알림**: 작업 완료/실패 알림
- **드래그 앤 드롭**: 이미지 업로드 기능
- **자동 저장**: 실시간 자동 저장 기능

### 3. PDF 생성 개선

- **Puppeteer 도입**: 서버 사이드 PDF 생성으로 품질 향상
- **템플릿 시스템**: 다양한 이력서 템플릿 추가
- **페이지 분할**: 긴 내용의 자동 페이지 분할

### 4. 코드 품질 향상

- **TypeScript 엄격 모드**: 타입 안정성 강화
- **컴포넌트 분리**: 더 작은 단위로 컴포넌트 분리
- **테스트 코드**: Jest + React Testing Library로 테스트 커버리지 향상
- **Storybook**: 컴포넌트 문서화 및 개발 환경 개선
- **테스트 환경 구축**: Jest, React Testing Library, MSW 설치
- **단위 테스트**: 각 컴포넌트별 독립적 테스트 작성
- **통합 테스트**: GraphQL 연동 및 PDF 생성 기능 테스트
- **E2E 테스트**: Cypress를 통한 전체 플로우 테스트

### 5. 성능 최적화

- **코드 스플리팅**: 라우트별 코드 분할
- **이미지 최적화**: WebP 포맷 및 lazy loading
- **번들 크기 최적화**: Tree shaking 및 불필요한 의존성 제거

### 6. 추가 기능

- **이력서 공유**: URL 공유 기능
- **템플릿 커스터마이징**: 사용자 정의 템플릿 생성
- **다국어 지원**: i18n을 통한 다국어 지원
- **다크 모드**: 테마 전환 기능

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
