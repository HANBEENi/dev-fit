# DevFit - 개발자 협업 성향 테스트

> 20문항으로 알아보는 나의 개발 스타일과 팀 궁합

![DevFit Preview](./docs/preview.png)

## 🎯 프로젝트 소개

DevFit은 개발자의 업무 성향과 팀 궁합을 진단하는 웹 서비스입니다.

기존 MBTI 같은 "고정된 성격" 분류가 아닌, **조직심리학의 상황-행동 프레임**을 적용하여 "특정 상황에서 선호하는 행동 경향"을 분석합니다.

### 주요 기능

| 기능                       | 설명                                                       |
| -------------------------- | ---------------------------------------------------------- |
| **개발자 작업유형 테스트** | 20문항으로 6가지 업무 유형 + 스트레스 반응 패턴 진단       |
| **팀 궁합 분석기**         | 팀원 유형 조합에 따른 시너지/충돌 분석 및 협업 가이드 제공 |

### 6가지 개발자 유형

| 유형             | 설명                            |
| ---------------- | ------------------------------- |
| 🏗️ 구조 설계자   | 큰 그림을 먼저 그립니다         |
| 🔥 돌진형 실행가 | 일단 만들어보면서 답을 찾습니다 |
| 🤝 협업 촉진자   | 함께할 때 더 좋은 답이 나옵니다 |
| 🔍 신중한 분석가 | 충분히 검토한 후에 움직입니다   |
| 🔬 몰입형 해결사 | 깊이 파고들어 답을 찾습니다     |
| 🌊 유연한 적응자 | 상황에 맞게 유연하게 대응합니다 |

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Analytics**: Google Analytics 4
- **Deploy**: Vercel

## 📁 프로젝트 구조

```
src/
├── app/                    # 페이지
│   ├── page.tsx           # 랜딩/메인
│   ├── diagnosis/         # 개발자 성향 진단
│   └── team/              # 팀 궁합 분석
├── components/            # 컴포넌트
│   ├── common/            # 공통 UI
│   ├── landing/           # 랜딩 페이지
│   ├── diagnosis/         # 진단 관련
│   └── team/              # 팀 분석 관련
├── data/                  # 정적 데이터
│   ├── questions.ts       # 질문
│   ├── types.ts           # 유형 정보
│   ├── stressTypes.ts     # 스트레스 유형
│   └── synergy.ts         # 시너지 매트릭스
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티
├── types/                 # 타입 정의
└── constants/             # 상수
```

## 🚀 시작하기

### 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/devfit.git
cd devfit

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에서 NEXT_PUBLIC_GA_ID 설정

# 개발 서버 실행
npm run dev
```

### 환경 변수

| 변수명              | 설명                       | 필수 |
| ------------------- | -------------------------- | ---- |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 측정 ID | 선택 |

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변화 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 파일 수정
```

### 예시

```bash
git commit -m "feat: 결과 공유 기능 추가"
git commit -m "fix: 모바일에서 버튼 클릭 안되는 문제 수정"
git commit -m "docs: README 설치 가이드 추가"
```

## 🎨 이론적 배경

- **상황-행동 프레임**: 고정된 성격이 아닌 상황에서의 행동 경향 분석
- **Lazarus 스트레스-대처 이론**: 스트레스 반응 패턴 분류
- **심리적 안전감 모델**: 유형별 안정감 조건 분석
- **인지편향 연구**: 유형별 빠지기 쉬운 사고의 함정

## ⚠️ 주의사항

이 테스트는 **재미와 가벼운 자기 인식을 위한 콘텐츠**입니다.

- 사람을 6가지 유형으로 완벽히 분류할 수 없습니다
- 결과를 맹신하거나 사람에게 라벨을 붙이는 용도로 사용하지 마세요
- "이런 경향이 있을 수 있구나" 정도로 가볍게 참고해주세요

## 📄 라이선스

MIT License

## 🙋‍♂️ 만든 사람

- **이름**: Your Name
- **이메일**: your@email.com
- **GitHub**: [@your-username](https://github.com/your-username)
