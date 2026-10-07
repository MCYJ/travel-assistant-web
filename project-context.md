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
- Chrome 390viewport/client375에서12개locale×overview/privacy=24pages 전부scroll=client,깨진image0. 실제select EN→ArabicRTL 및privacy KO→JA경로유지 검증.
- 추가320viewport/client305 독일어category overflow발견: minmax0/grid spanwrap 및360이하1열로수정. 이후12locale×2page 전체overflow0. 768tabletKO/client753정상. viewport override복구.
- privacy heading h1→h2계층수정,locale별windowtitle/hero제품분류번역갱신. 4tests재검증PASS.
- 최초GitHub공개repository 생성/push 완료: https://github.com/MCYJ/travel-assistant-web . 최초commit d56b661. Pages main/docs+HTTPS활성화,APIstatusbuilt.
- 최초Pages배포 https://github.com/MCYJ/travel-assistant-web/actions/runs/37648238870 및Node24CI https://github.com/MCYJ/travel-assistant-web/actions/runs/37648198965 success. 공개EN HTTP200 및기존extensionprivacy HTTP200.
- 최종소형화면수정은 후속커밋에 포함. audit:production은모든배포파일SHA256동일/24localizedHTML/assets/커스텀404/전체extensionprivacy를검사하여.qa에localreceipt저장.

## 최종 공개 검증 (2026-10-08)
- 최종구현8b095200be27678c6be5d609e510a5f35ae11941. Node24 Website checks https://github.com/MCYJ/travel-assistant-web/actions/runs/37648624998 success, Pages https://github.com/MCYJ/travel-assistant-web/actions/runs/37648624139 success.
- npm run audit:production PASS: 공개33파일 status200+SHA256 local동일,24localizedpages 포함. 없는route status404+자체404본문, 전체extensionprivacy GET200. PagesAPI built/public=true/https_enforced=true/main/docs 확인.
- 공개 https://mcyj.github.io/travel-assistant-web/en/ Chrome 실제시각확인 및tabdeliverable보존. .qa/site-live.png, .qa/mobile-checks.json, .qa/production-audit.json 로컬증거저장(Gitignore). 비공개extensionrepo visibilityPRIVATE 재확인.
- 남은조건: 원어민언어검수,개별affiliate프로그램승인,검증혜택/최종Store심사 등제품출시조건. 사이트자체배포완료. 소개를파트너에게실제제출/메일발송하지않음.
- printbutton/window.print 및printCSS 구현; 자동화click명령시간초과로실제인쇄미리보기/파일출력검증은미완료. 브라우저상태복구후사이트열림검증. 출력성공으로보고하지않음.
- 후속기록commit은공개docs/산출물변경없는문서수정이며불필요한빌드중복을피하기위해CI skip.

## pikvia 브랜드 개편 (2026-10-08)
- 확정브랜드pikvia(소문자), 의미pick via='~를 통해 선택하다'. 12locale별heroheadline/brandTitle/brandMeaning으로명시. pick+via→pikvia브랜드스토리,wordmark/header/meta/structureddata/footer/privacy문의subject전부갱신.
- 기술repository/sitepath/storageID는기존URL과선택정보보존. actualcompiledEnglishpopupv0.4.3로소개이미지교체;원래KOpopupjpg제거. 개발용메모리APIfixture이며설치/Store승인증거아님.
- website4tests PASS(12localefullschema/상대links/branding의oldname부재/brandmeaning/identity/RTL/SEO),Chrome320(client305)+390(client375)×24pages=48checks: overflow0/broken0/legacytext0. KO→AR실제select및RTL시각확인,viewport복구.
- 기존extensionprivacyWorker에pikvia반영,API0.1.5/version3a64c7be-1e48-4fe7-a791-522d9bfae9e8배포/live10APIchecksPASS. Store의도HOLD유지.
- 같은cwd별도앱스레드의새p마크작업파일은보존. 본사이트작업은기존아이콘과새실제popup으로브랜딩개편하며앱아이콘최종적용/배포와구분.
