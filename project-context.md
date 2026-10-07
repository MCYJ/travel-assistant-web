# Travel Assistant 소개 사이트 — 프로젝트 컨텍스트

## 범위 및 운영 기준 (2026-10-08)
- 사용자 요청: Chrome 확장 소개 웹사이트, affiliate partner 제출 중심, 다국어, GitHub Pages 공개 배포.
- 사이트 전용 공개 저장소 MCYJ/travel-assistant-web. 비공개 확장 저장소의 코드는 공개하지 않음.
- 제품명 Travel Assistant / 운영자 RushLabs / 문의 june1012june@gmail.com.
- 검증 기준: aff-extension-project README, registry, store/submission.json, worker privacy, 버전0.4.2.
- 62개 소비자 서비스 인식, 최대3추천, 수동 클릭 이동, 실제 서비스 자동 attribution 비활성. 개별 프로그램 승인·허용 필요. Store 제출 보류. 출시/제휴/실적/할인 주장 금지.
- 영어 기본 + 한국어/일본어/중국어 간체·번체/독일어/프랑스어/스페인어/포르투갈어/이탈리아어/아랍어/인도네시아어 완전한 사이트 번역. 확장87 locale의 전체 번역 완료와 구분.
- 빌드: 의존성 없는 Node 정적 생성기. docs/를 GitHub Pages main/docs로 게시. 언어별 index/privacy, hreflang, sitemap, 커스텀404, RTL/키보드/모바일.
- 공개 자료: 자체 제품 아이콘 + 실제 compiled popup QA 이미지. 제3자 로고 월/허위 혜택 목업 없음.
- 사용자에게 이메일을 발송하지 않음. CTA는 mailto를 사용.

## 구현 및 로컬 QA (2026-10-08)
- Blue #356df3 + neutral 토큰, 시스템 글꼴, 실제 팝업 이미지, user journey/coverage/partner principles/readiness/contact 구조. 모바일·keep-all·키보드·reduced motion·print 스타일 적용.
- 12개 언어별 overview/privacy 정적 HTML, 영어 root, canonical/hreflang13개, sitemap24URL, no-Jekyll/404 생성. 번역은 완전한 작성 초안이며 원어민 검수는 미완료.
- 사이트 privacy summary는12개 언어, 전체 확장 policy는 기존 공식 공개KO/EN문서로 연결. GitHub호스팅 메타데이터/선택언어 저장/mailto 외부전송 안내 포함.
- Node4tests PASS: 전체locale스키마·번역내용,24locale routes 포함 모든상대links/assets,실제readyBody/사업자identity/RTL/SEO, sitemap.
- Chrome 데스크톱 시각검증: 정상render, 실제제품capture, 추천·HOLD·contact내용 확인.
