// 라미스튜디오 홈페이지 생성기 (최종본: 홈페이지_최종 폴더)
// 가격·문구를 고친 뒤 이 폴더에서 `node _build.js` 를 실행하면 HTML 8개(홈·작업 사례·서비스별 6개)가 다시 만들어져요.
const fs = require('fs');
const path = require('path');

// ── 연락처 (주소가 생기면 여기만 바꾸세요) ─────────────────────
const KAKAO = 'https://pf.kakao.com/_xhnyFX/chat';      // 카카오톡 채널 주소 예: http://pf.kakao.com/_xxxx
const DANGGEUN = '#';   // 당근 비즈프로필 주소
const FORM = '#';       // 상담 신청서(구글폼·탈리) 주소

const ext = (href) => (href.startsWith('http') ? ' target="_blank" rel="noopener"' : '');

// ── 서비스 목록 (허브 카드 · 내비 · 다음 단계 공통) ───────────────
const SERVICES = [
  { slug: 'detail', nav: '상세페이지', key: 'Detail Page', name: '상세페이지 기획·문구·디자인',
    card: '손님이 첫 화면에서 왜 사야 하는지 알게 만들어요. 문구와 순서를 먼저 확인받고 디자인해요.',
    hook: '<b>첫 화면 진단 19,000원</b>부터',
    when: '제품은 있는데 상세페이지가 막혔다면', xd: '문구와 순서를 먼저 잡고, 확인받은 뒤 디자인해요. 6섹션 기본형.' },
  { slug: 'homepage', nav: '홈페이지', key: 'Local Homepage', name: '동네 가게 홈페이지',
    card: '소개·메뉴·가격·영업시간·지도·자주 묻는 질문을 휴대폰 한 페이지에. 네이버와 AI 검색이 읽기 좋게 만들어요.',
    hook: '<b>첫 3곳 99,000원</b>',
    when: '가게를 검색하면 아무것도 안 나온다면', xd: '휴대폰 한 페이지에 가게 정보를 모으고, AI 검색이 읽기 좋게 정리해요.' },
  { slug: 'store', nav: '스토어 세팅', key: 'Store Setup', name: '스마트스토어 세팅·상품 등록',
    card: '스토어 화면과 기본 설정, 검색에 맞춘 상품 등록까지. 막 연 스토어를 바로 팔 수 있게 채워요.',
    hook: '<b>59,000원</b>부터',
    when: '스마트스토어를 이제 막 열었다면', xd: '화면 꾸미기, 기본 설정, 검색 맞춤 상품 등록까지 한 번에.' },
  { slug: 'thumbnail', nav: '썸네일', key: 'Thumbnail · Banner', name: '썸네일·배너·광고 이미지',
    card: '목록에서 눌리는 대표이미지, 이벤트 배너, 광고 소재. 넣을 말이 없으면 문구부터 써 드려요.',
    hook: '<b>1장 10,000원</b>부터',
    when: '목록에서 클릭이 안 된다면', xd: '작게 봐도 읽히는 대표이미지·배너·광고 이미지. 1장부터.' },
  { slug: 'ai-image', nav: 'AI 이미지', key: 'AI Image', name: 'AI 제품 연출컷·모델 이미지',
    card: '촬영 없이 휴대폰 사진 한 장으로 연출컷과 모델 이미지를 만들어요. 제품 모양·라벨은 그대로 둬요.',
    hook: '<b>1장 15,000원</b>부터',
    when: '사진 찍을 시간·장소가 없다면', xd: '휴대폰 사진 한 장으로 연출컷과 모델컷. 제품은 원본 그대로.' },
  { slug: 'content', nav: '콘텐츠 운영', key: 'Monthly Content', name: '카드뉴스·블로그 월 운영',
    card: '한 달 주제표를 먼저 드리고 인스타 카드뉴스와 블로그 글을 꾸준히 쌓아요. 올리기 전에 원고를 꼭 보여 드려요.',
    hook: '<b>체험 39,000원</b>부터',
    when: 'SNS·블로그를 올릴 시간이 없다면', xd: '한 달 주제표부터. 카드뉴스와 블로그 글을 대신 쌓아요.' },
];
const bySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
const file = (slug) => `${slug}.html`;

// ── 공통 조각 ────────────────────────────────────────────────
const NAV = [
  ['services', '서비스', 'index.html#services'],
  ['work', '작업 사례', 'work.html'],
];
const nav = (on) => {
  const group = bySlug[on] ? 'services' : on;
  return `
<nav class="nav"><div class="nav-in">
  <a class="nav-logo" href="index.html">라미스튜디오</a>
  <div class="nav-right">
${NAV.map(([k, label, href]) => `    <a class="nav-link${group === k ? ' on' : ''}" href="${href}">${label}</a>`).join('\n')}
  </div>
  <a class="nav-cta" href="${KAKAO}"${ext(KAKAO)}>무료 상담</a>
</div></nav>${bySlug[on] || on === 'services' ? `
<div class="subnav"><div class="subnav-in">
  <a href="index.html#services">전체</a>
${SERVICES.map((s) => `  <a class="${on === s.slug ? 'on' : ''}" href="${file(s.slug)}">${s.nav}</a>`).join('\n')}
</div></div>` : ''}`;
};

const footer = () => `
<div class="container"><footer class="foot">
  <div class="foot-links">
    <a href="index.html">홈</a>
    <a href="work.html">작업 사례</a>
  </div>
  <div class="foot-biz">
    <span><span class="k">상호</span>라미스튜디오</span>
    <span><span class="k">문의</span>카카오톡 채널</span>
    <span><span class="k">답장</span>평일 저녁 · 주말</span>
  </div>
  <div class="foot-c">&copy; 2026 라미스튜디오. 1인 판매자·동네 가게 디자인.</div>
</footer></div>`;

const page = ({ slug, title, desc, body, ld }) => `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="assets/site.css">
<link rel="stylesheet" href="assets/pages.css">
${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
</head>
<body>
${nav(slug)}
${body}
${footer()}
</body>
</html>
`;

const hero = ({ label, h1, sub, meta = [] }) => `
<div class="hero-bg"><header class="hero container">
  <div class="hero-label"><span class="dot"></span>${label}</div>
  <h1>${h1}</h1>
  <p class="hero-sub">${sub}</p>
  ${meta.length ? `<div class="hero-meta">${meta.map((m) => `<span>${m}</span>`).join('')}</div>` : ''}
</header></div>`;

const part = (tag, h, d, inner, extra = '') => `
<section class="part container"${extra}>
  <div class="part-tag">${tag}</div>
  <div class="part-h">${h}</div>
  ${d ? `<div class="part-d">${d}</div>` : ''}
  ${inner}
</section>`;

const qs = (items) => `<div class="qs">${items.map((q) => `<div class="q">${q}</div>`).join('')}</div>`;

const steps = (items) => `<div class="part-rule"></div><div class="flow">${items
  .map(([n, h, p, key]) => `
  <div class="step${key ? ' key' : ''}"><div class="step-num">${n}</div><h3>${h}</h3><p>${p}</p></div>`)
  .join('')}</div>`;

// cols: [{name, sub}], rows: [[label, v1, v2, v3]], hi: 강조할 열 번호(0~2)
const pkgTable = (cols, rows, hi = 1) => `
<div class="tbl-wrap"><table>
  <thead><tr><th></th>${cols.map((c, i) => `<th${i === hi ? ' class="hi"' : ''}>${c.name}${c.sub ? `<small>${c.sub}</small>` : ''}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(([label, ...vals]) => `
    <tr><th>${label}</th>${vals.map((v, i) => `<td${i === hi ? ' class="hi"' : ''}>${v}</td>`).join('')}</tr>`).join('')}
  </tbody>
</table></div>`;

const duo = (inc, exc, incTitle = '기본으로 들어가요', excTitle = '기본 범위에 없어요') => `
<div class="duo">
  <div class="dcard on"><div class="dk">Included</div><div class="dt">${incTitle}</div>
    <ul>${inc.map((x) => `<li>${x}</li>`).join('')}</ul></div>
  <div class="dcard"><div class="dk">Not included</div><div class="dt">${excTitle}</div>
    <ul>${exc.map((x) => `<li>${x}</li>`).join('')}</ul></div>
</div>`;

const terms = ({ name, sub, price, brk, rows, refund }) => `
<div class="price">
  <div class="price-top">
    <div class="price-nm">${name}<span>${sub}</span></div>
    <div class="price-v"><div class="num">${price}</div>${brk ? `<div class="brk">${brk}</div>` : ''}</div>
  </div>
  <div class="price-rows">
${rows.map(([k, v]) => `    <div class="prow"><div class="pk">${k}</div><div class="pv">${v}</div></div>`).join('\n')}
    <div class="prow"><div class="pk">취소 · 환불</div><div class="pv">
      작업 단계에 따라 아래 기준으로 환불해요.
      <div class="refund-tbl"><table>
        <thead><tr><th>취소 시점</th><th>환불액</th></tr></thead>
        <tbody>${refund.map(([w, a]) => `<tr><td>${w}</td><td>${a}</td></tr>`).join('')}</tbody>
      </table></div>
    </div></div>
  </div>
</div>`;

const faq = (items) => `<div class="faq">${items
  .map(([q, a]) => `
  <details><summary>${q}</summary><p>${a}</p></details>`)
  .join('')}</div>`;

const xlinks = (slugs) => part('Next step', '다음은 어디로 가면 좋을까요',
  '지금 상황에 가까운 쪽을 고르세요. 순서대로 할 필요는 없어요.',
  `<div class="xlinks">${slugs.map((s) => {
    const x = bySlug[s];
    return `
  <a class="xl" href="${file(s)}"><div class="xl-k">${x.when}</div><div class="xl-t">${x.name}</div><div class="xl-d">${x.xd}</div><div class="xl-go">자세히 보기 →</div></a>`;
  }).join('')}</div>`);

const cta = (h2, p, main = '카카오톡으로 문의하기') => `
<div class="container"><div class="cta">
  <h2>${h2}</h2>
  <p>${p}</p>
  <div class="cta-btns">
    <a class="btn btn-main" href="${KAKAO}"${ext(KAKAO)}>${main}</a>
${DANGGEUN !== '#' ? `    <a class="btn btn-line" href="${DANGGEUN}"${ext(DANGGEUN)}>당근에서 문의하기</a>` : ''}
  </div>
</div></div>`;

const ba = (items) => `<div class="ba">${items
  .map(([src, cap]) => `<figure><img src="${src}" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption></figure>`)
  .join('')}</div>`;

// 휴대폰 화면(왼쪽) + 섹션 설명(오른쪽). screen: 휴대폰 안에 들어갈 HTML
const showcase = ({ screen, notes, href, label }) => `
<div class="show">
  <div class="phone-col">
    <div class="phone"><div class="phone-screen">${screen}</div></div>
    <a class="phone-link" href="${href}" target="_blank" rel="noopener">${label} ↗</a>
  </div>
  <ol class="show-notes">${notes.map(([h, p]) => `
    <li><b>${h}</b><span>${p}</span></li>`).join('')}
  </ol>
</div>`;

// ── 작업 사례 (기존 rami-studio 사이트에서 가져옴) ─────────────
// 이미지: assets/work/thumbs/<img>.jpg (목록용), assets/work/full/<img>.jpg (전체)
const CATS = { food: '식품·건강', living: '뷰티·리빙', kids: '키즈·유아', space: '공간·여행·재테크' };
const SIGNATURE = [
  { id: 'case-01', img: 'rural-shelter', cat: '공간 · 건축 — 모듈러 하우스 브랜드', title: '농촌체류형 프리미엄 쉼터',
    short: '제품 정보가 복잡한 문제를, 고객이 이해하기 쉬운 구매 순서로 다시 짰어요.',
    desc: '집을 사는 게 아니라 라이프스타일을 사는 것처럼 느껴지도록 정보의 순서를 다시 짰어요. 외관 → 평면도 → 내부 공간 → 차별점 → 스펙까지, 필요한 정보를 필요한 순서 그대로 배치했어요.',
    scope: ['정보 구조 설계', '공간 카피라이팅', '상세페이지 디자인'] },
  { id: 'case-02', img: 'goldnwise-bar', cat: '재테크 · 주얼리 — 골드바 판매 브랜드', title: '골드앤와이즈 골드바',
    short: '"금을 살까?"보다 "왜 여기서 사야 하나?"를 설계했어요.',
    desc: '금은 이미 신뢰받는 자산이에요. 문제는 "왜 이 판매자인가"였어요. 5년치 금 시세 추이와 품질보증서, 리뷰 이벤트를 근거의 순서대로 배치해 안전자산을 사는 사람의 신중함에 맞췄어요.',
    scope: ['리서치 기반 카피', '데이터 시각화', '상세페이지 디자인'] },
  { id: 'case-03', img: 'uk-tour', cat: '여행 · 서비스 — 프리미엄 가이드 투어', title: '웨스트민스터 블루배지 투어',
    short: '자격과 전문성을 먼저 보여 줘서, 예약 전 불안을 낮췄어요.',
    desc: '상품보다 "이 가이드를 믿어도 되는가"를 먼저 설득해야 했어요. 자격증과 라이선스를 신뢰 요소로 앞세우고, 한눈에 보이는 타임라인으로 예약 전 궁금증을 먼저 지웠어요.',
    scope: ['신뢰 요소 기획', '일정 정보 설계', '상세페이지 디자인'] },
];
const WORKS = [
  ['001', 'rural-shelter', 'space', '농촌체류형 프리미엄 쉼터', '라이프스타일을 파는 순서로 재구성한 정보 구조'],
  ['002', 'goldnwise-bar', 'space', '골드앤와이즈 골드바', '안전자산을 사는 사람의 신중함에 맞춘 설득 구조'],
  ['003', 'uk-tour', 'space', '웨스트민스터 블루배지 투어', '자격과 신뢰를 먼저 앞세운 예약 전환 설계'],
  ['004', 'mellowshop-mat', 'living', '멜로우샵 미끄럼방지 조각매트', '반려동물 안전을 소재 강점으로 설득한 신제품 런칭 페이지'],
  ['005', 'nestidante-soap', 'living', '네스티단테 비누 선물세트', '77년 전통을 선물 포장처럼 다정하게 풀어낸 헤리티지 스토리'],
  ['006', 'hijb-watergun', 'kids', '하이제이비 분수물총', '무게·수압 비교로 구매 이유를 숫자로 증명'],
  ['007', 'chakhan-sanyangsam', 'food', '착한산삼', '재배자의 얼굴과 인증서로 쌓아 올린 신뢰'],
  ['008', 'paulnbibi-tissue', 'kids', '폴앤비비 미니비데티슈', '예민한 첫 배변 훈련, FAQ까지 촘촘하게 설계'],
  ['009', 'slodam-grape', 'food', '슬로담 샤인머스캣', '당도 16brix, 숫자로 증명한 프리미엄'],
  ['010', 'hera-guarantee', 'living', '헤라 정품인증 안내', '정품·배송·환불, 불안 요소를 먼저 지우는 신뢰 섹션'],
  ['011', 'organic-vitamin', 'food', '루마니아산 유기농 비타민', '원산지부터 인증까지, 근거로 쌓은 설득'],
  ['012', 'kkalkkeum-cleaning', 'living', '깔끔마스터 매트리스 청소', 'Before / After 한 장으로 보여 주는 서비스 품질'],
  ['013', 'mellowshop-notice', 'living', '멜로우샵 리뉴얼 공지', '완판 제품의 업그레이드 이유를 짧고 명확하게'],
  ['014', 'yearend-coupon-banner', 'living', '연말 빅세일 쿠폰 배너', '구매 직전, 망설임을 지우는 한 장'],
];

// 사례 카드 3개 (홈 · 상세페이지 서비스에서 사용)
const caseCards = () => `
<div class="cases">${SIGNATURE.map((c, i) => `
  <a class="case" href="work.html#${c.id}">
    <div class="case-img"><span class="case-no">CASE 0${i + 1}</span><img src="assets/work/thumbs/${c.img}.jpg" alt="${c.title} 상세페이지" loading="lazy"></div>
    <div class="case-body"><div class="case-t">${c.title}</div><p>${c.short}</p><span class="case-go">프로젝트 보기 →</span></div>
  </a>`).join('')}
</div>
<div class="cases-more"><a class="btn btn-line" href="work.html">작업 사례 14건 모두 보기 →</a></div>`;

const R = {
  full: '<b>전액 환불</b>',
  half: '50% 환불 <span class="cut">(50% 차감)</span>',
  none: '<span class="cut">환불 불가</span> · 남은 수정 횟수 안에서 수정',
};

// ── 허브 페이지 ──────────────────────────────────────────────
const PICK = [
  ['상세페이지는 있는데 안 팔려요', 'detail', '첫 화면 진단', '2일'],
  ['제품은 있는데 상세페이지가 없어요', 'detail', '상세페이지 제작', '10일'],
  ['가게를 검색해도 아무것도 안 나와요', 'homepage', '가게 홈페이지', '1회 + 월 관리'],
  ['스마트스토어를 이제 막 열었어요', 'store', '스토어 세팅', '4~12일'],
  ['목록에서 클릭이 안 돼요', 'thumbnail', '썸네일', '2~4일'],
  ['사진 찍을 시간도 장소도 없어요', 'ai-image', 'AI 이미지', '2~5일'],
  ['SNS·블로그 올릴 시간이 없어요', 'content', '월 운영', '매월'],
];

// ── 상세 페이지 데이터 ────────────────────────────────────────
const PAGES = {};

PAGES.detail = {
  title: '상세페이지 기획·문구·디자인 — 라미스튜디오',
  desc: '제품의 장점이 첫 화면에서 보이도록, 상세페이지의 순서와 문구를 먼저 설계하고 디자인해요. 첫 화면 진단 19,000원, 6섹션 기본형 199,000원.',
  body: () => `
${hero({ label: 'Detail Page · 6 sections', h1: '손님이 첫 화면에서<br><em>왜 사야 하는지</em> 알게 만들어요',
  sub: '예쁜 것보다 먼저 정할 게 있어요. <b>무슨 말을 어떤 순서로 할지</b>를 먼저 잡고, 확인받은 뒤에 디자인해요.',
  meta: ['기획·문구·디자인 한 번에', '문구 먼저 확인', '수정 2회', '납품 후 2주 간단 수정'] })}
<main>
${part('Result first', '먼저, 만든 상세페이지부터 보세요', '가상 브랜드 \'소담\' 1인분 냉동밥 용기로 만든 개인 작업 샘플이에요. 휴대폰 화면 안을 스크롤해 보세요.', showcase({
  screen: '<img src="assets/img/sodam-detail.jpg" alt="소담 냉동밥 용기 상세페이지 샘플 전체" loading="lazy">',
  href: 'assets/img/sodam-detail.jpg', label: '전체 크게 보기',
  notes: [
    ['도입 — 한 줄로 끝내기', '"주말에 한 번 지어서, 평일 저녁은 3분." 제품 설명보다 <b>손님이 얻는 결과</b>를 먼저 보여 줘요.'],
    ['문제 — "이런 적 없으세요?"', '지퍼백에 얼린 밥이 딱딱해지는 경험처럼, <b>손님이 이미 겪은 불편</b>을 꺼내요.'],
    ['해결 — 다른 점 3가지', '1공기 높이 · 뚜껑까지 전자레인지 · 사각 모양. 장점은 <b>세 개까지만</b> 골라요.'],
    ['비교 — 한눈에 표로', '지퍼백 vs 소담. 수치를 지어내지 않고 <b>사용 방식으로만</b> 비교해요.'],
    ['사용법 — 세 단계면 끝', '쓰는 장면이 그려져야 사요. 사진과 짧은 문장 세 줄로 정리해요.'],
    ['구매 안내 — 고르기 쉽게', '4개입 / 8개입을 <b>누구에게 맞는지</b>로 나누고, 세척·보관 안내로 마무리해요.'],
  ],
}))}
${part('Client work', '실제 작업 사례', '업종은 매번 달랐지만, 고객이 망설이는 지점을 먼저 찾는 방식은 같았어요.', caseCards())}
${part('For you', '이런 분께 맞아요', '하나라도 해당되면 시작해도 돼요.', qs([
  '제품 사진은 있는데 <b>상세페이지 구성과 문구가 막혔어요</b>',
  '스마트스토어·쿠팡·자사몰에 <b>올릴 상세페이지가 필요해요</b>',
  '지금 상세페이지가 <b>길기만 하고 핵심이 안 보여요</b>',
  '맡기기 전에 <b>지금 페이지의 문제부터</b> 알고 싶어요',
]))}
${part('How it runs', '이렇게 만들어요', '', steps([
  ['01', '손님이 궁금한 것 정리', '제품 정보와 판매 페이지를 보고 <b>손님이 사기 전에 궁금한 것</b>을 정리해요.'],
  ['02', '경쟁 상품 비교', '같은 검색어의 경쟁 상품 상세페이지를 비교해서 우리 제품만 할 수 있는 말을 찾아요.'],
  ['03', '섹션 구성과 문구', '문제 → 해결 → 확신 순서로 섹션을 잡고, <b>섹션별 문구를 먼저 보내 드려요.</b> 이 단계가 핵심이에요.', true],
  ['04', '디자인과 납품', '확인받은 문구로 디자인하고, 취합 수정 2회 후 JPG·PNG로 납품해요.'],
]))}
${part('Packages', '패키지', '상세페이지가 이미 있다면 <b>첫 화면 진단</b>부터. 진단 후 제작을 맡기시면 진단 비용만큼 빼 드려요.', pkgTable(
  [{ name: '첫 화면 진단' }, { name: '기본형 오픈 특가', sub: '선착순 3분' }, { name: '기본형' }],
  [
    ['가격', '<b>19,000원</b>', '<b>149,000원</b>', '<b>199,000원</b>'],
    ['내용', '지금 페이지에서 손님이 놓치는 점 3가지 + 첫 화면 개선 문구 (디자인 없음)', '6섹션 기획·문구·디자인', '6섹션 기획·문구·디자인'],
    ['조건', '—', '후기 작성·포트폴리오 사용 동의, 2026년 11월 30일까지', '조건 없음'],
    ['작업일', '2일', '10일', '10일'],
    ['수정', '1회', '2회', '2회'],
  ]))}
${part('Scope', '들어가는 것과 빠지는 것', '', duo([
  '6섹션: 도입 · 문제 · 해결 · 특징 · 사용법 · 구매 안내',
  '섹션 구성과 <b>문구 작성</b> (모든 패키지)',
  '가로 860px JPG·PNG 납품',
  '납품 후 2주 동안 <b>오탈자·가격·옵션 수정 무료</b>',
], [
  '제품·모델 촬영 (<a href="ai-image.html">AI 이미지</a>로 대신할 수 있어요)',
  '움직이는 이미지(GIF·영상)',
  '편집 원본 파일(PSD) — 결제 금액의 20%로 추가',
  '건강기능식품·의료기기 효능 문구 (광고 심의 대상)',
]))}
${part('Price &amp; terms', '진행 안내', '', terms({
  name: '상세페이지 기본형', sub: '6섹션 · 기획·문구·디자인', price: '199,000원', brk: '오픈 특가 149,000원 (25% 할인, 선착순 3분)',
  rows: [
    ['추가 옵션', '섹션 추가 1섹션당 <b>25,000원</b> · 원본 파일(PSD) 결제 금액의 <b>20%</b>'],
    ['준비할 것', '제품명과 판매 페이지 주소 · 제품 사진 · 자랑하고 싶은 점 3가지 · 참고 상세페이지 1~2개 · 원하는 오픈 날짜'],
    ['진행 방식', '문의 → 가능 범위 확인 → 결제 → 섹션 구성·문구 확인 → 디자인 시안 → 취합 수정 2회 → 납품'],
  ],
  refund: [['작업 시작 전', R.full], ['섹션 구성·문구 전달 후', R.half], ['디자인 시안 전달 후', R.none]],
}))}
${part('FAQ', '자주 묻는 것', '', faq([
  ['어떤 패키지를 골라야 하나요', '상세페이지가 이미 있다면 <b>첫 화면 진단</b>으로 문제부터 확인해 보세요. 새로 만들거나 전체를 바꿔야 한다면 기본형이 맞아요.'],
  ['사진이 몇 장 있어야 하나요', '섹션당 1~2장이면 충분해요. 부족하면 아이콘·배경 디자인으로 구성하고, 더 필요한 사진을 미리 알려 드려요.'],
  ['수정은 어디까지 되나요', '취합해서 2회까지 가능해요. 문구·사진 교체·배치 조정이 포함되고, 구성 전체를 바꾸는 요청은 추가 비용을 안내드려요.'],
  ['납품 후에 가격이 바뀌면요', '납품 후 2주 동안 오탈자·가격·옵션 같은 <b>간단한 수정은 무료</b>예요.'],
  ['건강기능식품·화장품도 되나요', '디자인은 가능해요. 다만 효능 문구는 판매자님이 심의·근거를 확인한 문구로만 작성해요.'],
]))}
${xlinks(['thumbnail', 'ai-image', 'store', 'content'])}
${cta('상세페이지가 막혔다면,<br>문구부터 같이 잡아요', '제품명과 판매 페이지 주소만 보내 주시면 가능한 범위를 먼저 알려 드려요.')}
</main>`,
};

PAGES.homepage = {
  title: '동네 가게 홈페이지 — 라미스튜디오',
  desc: '휴대폰으로 열면 메뉴·가격·영업시간·위치가 한 번에 보이는 한 페이지 홈페이지. 네이버와 AI 검색이 가게 정보를 잘 읽도록 자주 묻는 질문까지 정리해요. 첫 3곳 99,000원.',
  body: () => `
${hero({ label: 'Local Homepage · 1 page', h1: '손님이 AI에게 물어봐도<br><em>우리 가게</em>가 나오게',
  sub: '요즘 손님은 "○○동 반찬가게 추천해 줘"를 네이버뿐 아니라 AI에게도 물어요. <b>가게 정보를 한 페이지에 잘 정리해 두면</b>, 네이버와 AI가 우리 가게를 더 정확하게 소개해요.',
  meta: ['휴대폰 한 페이지', '네이버·AI 검색 구조', '수정 2회', '월 관리 선택'] })}
<main>
${part('For you', '이런 사장님께 맞아요', '', qs([
  '가게 이름을 검색하면 <b>지도 말고는 아무것도 안 나와요</b>',
  '메뉴·가격·영업시간을 <b>매번 전화로 설명하고 있어요</b>',
  '인스타·당근·블로그에 흩어진 정보를 <b>한 곳에 모으고 싶어요</b>',
  '홈페이지는 비싸고 <b>관리가 어려울 것 같아서</b> 미뤄 왔어요',
]))}
${part('Live sample', '실제로 만든 홈페이지를 눌러 보세요', '가상 반찬가게 \'소담찬방\'으로 만든 샘플이에요. 휴대폰 화면 안에서 스크롤하고, 자주 묻는 질문도 눌러 보세요.', showcase({
  screen: '<iframe src="samples/sodam-banchan.html" title="소담찬방 샘플 홈페이지" loading="lazy"></iframe>',
  href: 'samples/sodam-banchan.html', label: '새 창에서 열기',
  notes: [
    ['첫 화면 — 가게 이름과 버튼 두 개', '어디 있는 가게인지, 무엇을 파는지 한 줄로. <b>전화 예약 · 당근 채팅</b> 버튼을 바로 아래에 둬요.'],
    ['이런 가게예요', '사장님이 어떤 기준으로 만드는지 두 문장. 손님이 <b>믿고 살 이유</b>가 돼요.'],
    ['메뉴·가격', '가격을 숨기지 않아요. 매일 바뀌는 메뉴는 <b>당근 소식으로 연결</b>해요.'],
    ['영업시간·오시는 길', '영업시간 · 주소 · 주차 · 예약 마감. 전화로 가장 많이 묻는 네 가지예요.'],
    ['자주 묻는 질문', '손님이 실제로 묻는 질문을 그대로 넣어요. <b>AI 검색이 가게를 소개할 때 읽는 부분</b>이에요.'],
    ['보이지 않는 부분 — 검색 정보', '가게 종류·주소·영업시간·질문답변을 네이버와 AI가 읽는 형식(구조화 데이터)으로 함께 넣어요.'],
  ],
}))}
${part('How it runs', '이렇게 만들어요', '', steps([
  ['01', '가게 정보 받기', '메뉴·가격·영업시간·주소·사진, 손님이 자주 묻는 질문을 받아요. <b>전화로 자주 듣는 질문</b>이 제일 좋은 재료예요.'],
  ['02', '문구와 구성 확인', '한 페이지에 들어갈 순서와 문구를 먼저 보내 드려요.', true],
  ['03', '디자인과 검색 구조', '휴대폰 화면 기준으로 디자인하고, 네이버와 AI가 읽는 <b>가게 정보·자주 묻는 질문 구조</b>를 함께 넣어요.'],
  ['04', '공개와 연결', '수정 2회 후 공개하고, 인스타·당근·네이버 플레이스에 넣을 주소를 드려요.'],
]))}
${part('Packages', '가격', '', pkgTable(
  [{ name: '오픈 기념', sub: '첫 3곳' }, { name: '기본' }, { name: '월 관리', sub: '선택' }],
  [
    ['가격', '<b>99,000원</b>', '<b>190,000원</b>', '<b>월 30,000원</b>'],
    ['내용', '한 페이지 홈페이지 (기본과 같은 구성)', '소개·메뉴·가격·영업시간·지도·자주 묻는 질문', '메뉴·가격·공지 수정 월 2회 + 네이버·AI 검색 점검 보고 월 1회'],
    ['조건', '후기 작성 동의', '조건 없음', '홈페이지 제작 고객'],
    ['수정', '2회', '2회', '월 2회'],
  ], 0))}
${part('Scope', '들어가는 것과 빠지는 것', '', duo([
  '휴대폰에 맞춘 <b>한 페이지 홈페이지</b>',
  '가게 소개 · 메뉴·가격 · 영업시간 · 오시는 길 · 자주 묻는 질문',
  '네이버·AI 검색이 읽는 <b>가게 정보 구조</b> (구조화 데이터)',
  '전화·당근·카카오 문의 버튼',
], [
  '주소(도메인) 구입 — 필요하면 실비 별도',
  '예약·결제·회원 가입 같은 기능',
  '가게 사진 촬영',
  '검색 순위 보장',
]))}
${part('Add-on', '같이 하면 좋은 것', '', `
<div class="duo"><div class="dcard on" style="grid-column:1 / -1;"><div class="dk">Menu board</div><div class="dt">메뉴판·가격표 디자인 39,000원</div>
<ul><li>A4 한 장 <b>인쇄용 파일 + 인스타·당근용 이미지</b></li><li>홈페이지와 같은 색·글꼴로 맞춰요 (인쇄비 별도)</li></ul></div></div>`)}
${part('FAQ', '자주 묻는 것', '', faq([
  ['홈페이지가 정말 AI 검색에 나오나요', 'AI가 어떤 가게를 소개할지는 약속할 수 없어요. 대신 <b>AI와 네이버가 읽기 좋은 형식</b>으로 가게 정보와 자주 묻는 질문을 정리해 넣어요. 월 관리를 하시면 실제로 어떻게 소개되는지 매달 확인해 드려요.'],
  ['메뉴가 자주 바뀌어요', '월 관리(월 30,000원)에 메뉴·가격·공지 수정 월 2회가 들어 있어요. 매일 바뀌는 메뉴는 당근·인스타 소식으로 연결해 드려요.'],
  ['주소(도메인)가 꼭 있어야 하나요', '없어도 무료 주소로 공개할 수 있어요. 가게 이름이 들어간 주소를 원하시면 실비(보통 1년 2만 원 안팎)로 연결해 드려요.'],
  ['직접 고칠 수도 있나요', '한 페이지라 구조가 단순해요. 원하시면 글자 고치는 방법을 한 장으로 정리해 드려요.'],
]))}
${xlinks(['content', 'thumbnail', 'detail', 'store'])}
${cta('우리 가게, 검색하면<br>한 번에 보이게 만들어요', '가게 이름과 지금 쓰는 인스타·당근 주소만 보내 주세요. 들어갈 구성을 먼저 보여 드려요.')}
</main>`,
};

PAGES.store = {
  title: '스마트스토어 세팅·상품 등록 — 라미스튜디오',
  desc: '스마트스토어 화면 꾸미기와 기본 설정, 검색에 맞춘 상품 등록, 상세페이지까지. 비밀번호 없이 부매니저 권한으로 작업해요. 59,000원부터.',
  body: () => `
${hero({ label: 'Store Setup · Smart Store', h1: '막 연 스마트스토어,<br><em>바로 팔 수 있게</em> 채워 드려요',
  sub: '기본 상태 그대로인 스토어는 손님이 믿기 어려워요. <b>화면 · 기본 설정 · 상품 등록</b>을 한 번에 정리하고, 무엇을 바꿨는지 한 장으로 남겨 드려요.',
  meta: ['비밀번호 안 받아요', '부매니저 권한 작업', '수정 2회', '정리표 제공'] })}
<main>
${part('For you', '이런 분께 맞아요', '', qs([
  '스토어를 막 열었는데 <b>무엇부터 채워야 할지</b> 모르겠어요',
  '스토어 첫 화면이 <b>기본 상태 그대로</b>예요',
  '상품은 올렸는데 <b>검색해도 내 상품이 안 보여요</b>',
  '세팅·등록·상세페이지를 <b>따로따로 맡기기 번거로워요</b>',
]))}
${part('How it runs', '이렇게 진행해요', '', steps([
  ['01', '자료 받기', '스토어 주소(또는 열 예정인 업종), 로고, 상품 정보를 받아요.'],
  ['02', '부매니저 초대', '판매자센터에서 <b>부매니저로 초대</b>해 주시면 그 권한으로만 작업해요. 방법은 안내해 드려요.'],
  ['03', '구성안 확인', '작업 전에 "이렇게 바꿀게요" 하고 <b>구성안을 먼저</b> 보여 드려요.', true],
  ['04', '세팅·등록과 정리표', '세팅·등록 후 수정 2회, 끝나면 <b>무엇을 어디서 바꿨는지 한 장</b>으로 정리해 드려요.'],
]))}
${part('Packages', '패키지', '', pkgTable(
  [{ name: '스토어 기본 세팅' }, { name: '세팅 + 상품 3개' }, { name: '세팅 + 상품 3개 + 상세페이지' }],
  [
    ['가격', '<b>59,000원</b>', '<b>89,000원</b>', '<b>239,000원</b>'],
    ['내용', '대표이미지·로고 · 배너 2개 · 화면 구성 · 소개·안내 문구 · 검색 노출 설정', '기본 세팅 + 상품 3개 검색 맞춤 등록 + 검색어 정리표', '위 내용 + 대표 상품 상세페이지 1건 (6섹션 기획·문구·디자인)'],
    ['작업일', '4일', '6일', '12일'],
    ['수정', '2회', '2회', '2회'],
  ]))}
${part('Scope', '들어가는 것과 빠지는 것', '', duo([
  '스토어 대표이미지·로고 정리 (없으면 <b>글자 로고</b>)',
  '메인 배너 + 자유 배너 (컴퓨터·휴대폰 모두)',
  '전시 방식 · 대표 색 · 상품 분류 정리',
  '소개글, 고객센터·배송·교환 안내 문구',
  '네이버 검색 노출 설정 · 톡톡 · 인스타·블로그 연결',
  '상품명·카테고리·속성·태그 <b>빈칸 없이</b> (등록 패키지)',
], [
  '스토어 가입·사업자 전환 (본인 인증 필요 — 순서는 안내해요)',
  '로고 새로 디자인하기, 제품 촬영',
  '광고 운영, 리뷰·찜·구매 수 늘리기',
  '검색 순위·매출 보장',
  '의약품·건강기능식품 등 심의가 필요한 표현',
]))}
${part('Price &amp; terms', '진행 안내', '', terms({
  name: '세팅 + 상품 3개 등록', sub: '가장 많이 고르는 패키지', price: '89,000원', brk: '기본 세팅만은 59,000원',
  rows: [
    ['추가 옵션', '상품 추가 등록 1개당 <b>9,900원</b> · 배너 추가 1개당 <b>10,000원</b> · 10개 이상 맞춤 견적'],
    ['준비할 것', '스토어 주소 · 로고(있다면) · 가게 소개 몇 줄 · 좋아하는 색 · 상품명·가격·옵션·재고 · 상품 사진'],
    ['권한', '비밀번호는 받지 않아요. <b>부매니저 권한</b>으로만 작업하고, 끝나면 권한을 지우시면 돼요.'],
  ],
  refund: [['작업 시작 전', R.full], ['구성안 전달 후, 세팅 전', R.half], ['세팅·등록 시작 후', '끝내지 않은 부분만큼 환불'], ['작업 완료 후', R.none]],
}))}
${part('FAQ', '자주 묻는 것', '', faq([
  ['아직 스토어를 안 열었는데 맡길 수 있나요', '네. 가입은 본인 인증 때문에 직접 하셔야 하지만 순서를 안내해 드려요. 가입이 끝나면 바로 세팅을 시작해요.'],
  ['세팅하면 검색 상위에 뜨나요', '순위는 판매량·리뷰 등 여러 요소로 정해져서 약속드릴 수 없어요. <b>검색에 걸릴 수 있게 정보를 빠짐없이 맞춰 드리는</b> 서비스예요.'],
  ['상품 등록만 따로 맡길 수 있나요', '네. 1개당 9,900원으로 맞춤 견적을 드려요.'],
  ['쿠팡도 되나요', '상품명·태그 정리표는 쿠팡에도 쓸 수 있어요. 쿠팡 화면 세팅과 직접 등록은 상담 후 안내해 드려요.'],
]))}
${xlinks(['detail', 'thumbnail', 'ai-image', 'content'])}
${cta('스토어를 열었다면,<br>팔 수 있는 상태로 만들어요', '스토어 주소와 등록할 상품 수만 알려 주세요. 맞는 패키지를 골라 드려요.')}
</main>`,
};

PAGES.thumbnail = {
  title: '썸네일·배너·광고 이미지 — 라미스튜디오',
  desc: '스마트스토어·쿠팡 대표이미지, 인스타 광고 이미지, 이벤트 배너, 블로그 썸네일. 휴대폰 목록 크기로 줄여서 확인하고 보내요. 1장 10,000원부터.',
  body: () => `
${hero({ label: 'Thumbnail · Banner · Ad', h1: '목록에서 눌리는 이미지,<br><em>작게 봐도 읽히게</em> 만들어요',
  sub: '손님은 휴대폰 목록에서 1초 안에 누를지 정해요. <b>휴대폰 목록 크기로 줄여서 확인한 뒤</b> 보내 드려요.',
  meta: ['1장부터', '마켓 규정 확인', '수정 2회', '주말 작업'] })}
<main>
${part('What we make', '이런 걸 만들어요', '', qs([
  '스마트스토어·쿠팡 <b>대표이미지</b>, 상품 추가 이미지',
  '인스타그램·페이스북 <b>광고 이미지</b>, 공지·이벤트 이미지',
  '블로그·유튜브 <b>썸네일</b>, 스토어 배너',
]))}
${part('For you', '이런 분께 맞아요', '', qs([
  '넣을 말은 정해졌는데 <b>디자인할 시간이 없어요</b>',
  '직접 만들어 봤는데 <b>글자가 안 읽히고 정돈이 안 돼요</b>',
  '광고 이미지는 필요한데 <b>무슨 말을 넣을지 모르겠어요</b> → 문구 기획 + 3장',
]))}
${part('How it runs', '이렇게 진행해요', '', steps([
  ['01', '용도·사이즈·문구 받기', '어디에 쓸지, 사이즈, 넣을 문구와 사진을 받아요.'],
  ['02', '(문구 기획) 문구 3안', '문구 기획 패키지는 <b>강조점이 다른 문구 3안</b>(가격 / 편리함 / 후기)을 먼저 확인받아요.', true],
  ['03', '시안과 휴대폰 확인', '시안을 만들고 <b>휴대폰 목록 크기</b>로 줄여서 읽히는지 확인해요.'],
  ['04', '수정과 납품', '취합 수정 2회 후 JPG·PNG로 납품해요. 오타·가격 수정은 2주 동안 무료예요.'],
]))}
${part('Packages', '패키지', '', pkgTable(
  [{ name: '1장 기본형' }, { name: '3장 세트' }, { name: '문구 기획 + 3장' }],
  [
    ['가격', '<b>10,000원</b>', '<b>27,000원</b>', '<b>49,000원</b>'],
    ['내용', '문구를 주시면 이미지 1장', '같은 톤으로 3장 (문구 제공 시)', '광고 문구 3안 + 이미지 3장 + 게시글 본문'],
    ['작업일', '2일', '3일', '4일'],
    ['수정', '2회', '2회', '2회'],
  ], 2))}
${part('Scope', '들어가는 것과 빠지는 것', '', duo([
  '기본 1000×1000 또는 1080×1080 (세로형·스토리용 가능)',
  '여러 장은 <b>색·글꼴·배치 통일</b>',
  '마켓 대표이미지 규정(글자·테두리) 확인',
  '납품 후 2주 동안 <b>오타·가격 수정 무료</b>',
], [
  '광고 계정 세팅·집행, 클릭률·매출 보장',
  '제품 촬영, 저화질 사진 복원',
  '심의가 필요한 효능·다이어트 전후 소재',
  '당일 납품',
]))}
${part('Price &amp; terms', '진행 안내', '', terms({
  name: '문구 기획 + 3장', sub: '넣을 말이 없을 때', price: '49,000원', brk: '문구가 있으면 1장 10,000원부터',
  rows: [
    ['추가 옵션', '사이즈 추가 1장당 <b>3,000원</b> · 원본 파일 결제 금액의 <b>20%</b> · 10장 이상 맞춤 견적'],
    ['준비할 것', '용도와 사이즈 · 넣을 문구(복사 가능한 글자로) · 사진·로고 · 참고 이미지 1~2개 · 원하는 완료 날짜'],
  ],
  refund: [['작업 시작 전', R.full], ['(문구 기획) 문구 전달 후, 이미지 전', R.half], ['여러 장 주문', '시안을 안 보낸 장수만큼 환불'], ['시안 전달 후', R.none]],
}))}
${part('FAQ', '자주 묻는 것', '', faq([
  ['넣을 문구가 없어요', '<b>문구 기획 + 3장</b>을 골라 주세요. 제품 정보를 보고 문구 3안을 먼저 써서 보여 드려요.'],
  ['광고 효과를 보장하나요', '보장하지 않아요. 성과는 예산·대상·제품에 따라 달라져요. 대신 강조점이 다른 3안을 드려서 직접 비교할 수 있게 해요.'],
  ['대표이미지에 글자를 넣어도 되나요', '마켓마다 규정이 달라요. 규정에 맞춰 글자 없이 만들거나 추가 이미지에만 넣는 방식으로 제안드려요.'],
  ['핸드폰으로 찍은 사진밖에 없어요', '밝기·배경 정리로 보완할 수 있어요. 장면 자체를 바꾸고 싶다면 <a href="ai-image.html">AI 연출컷</a>이 맞아요.'],
]))}
${xlinks(['ai-image', 'detail', 'store', 'content'])}
${cta('클릭이 안 된다면,<br>첫 이미지부터 바꿔요', '용도와 사이즈, 넣을 문구만 보내 주세요. 1장부터 시작해요.')}
</main>`,
};

PAGES['ai-image'] = {
  title: 'AI 제품 연출컷·모델 이미지 — 라미스튜디오',
  desc: '촬영 없이 휴대폰 사진 한 장으로 제품 연출컷과 AI 모델 이미지를 만들어요. 제품 모양·색·라벨은 원본 그대로. 1장 15,000원부터.',
  body: () => `
${hero({ label: 'AI Image · Product &amp; Model', h1: '휴대폰 사진 한 장으로,<br><em>촬영한 것 같은</em> 연출컷을',
  sub: '촬영 비용 없이 계절·이벤트 이미지를 바꿀 수 있어요. <b>제품 모양·색·라벨은 원본 그대로</b> 두고 장면만 바꿔요.',
  meta: ['촬영 없음', '콘셉트 먼저 확인', '과장 연출 안 함', '상업적 사용 가능'] })}
<main>
${part('Result first', '먼저, 결과부터 보여 드릴게요', '왼쪽 위 작은 사진이 받은 원래 사진이에요. 개인 작업 샘플이에요.', ba([
  ['assets/img/soap.jpg', '수제 비누 · 휴대폰 사진 → 욕실 연출컷'],
  ['assets/img/syrup.jpg', '수제청 · 휴대폰 사진 → 연출컷'],
  ['assets/img/board.jpg', '원목 도마 · 휴대폰 사진 → 연출컷'],
]))}
${part('For you', '이런 분께 맞아요', '', qs([
  '제품 사진이 <b>흰 배경 사진뿐</b>이라 상세페이지가 밋밋해요',
  '촬영 비용 없이 <b>계절·이벤트 이미지</b>를 빨리 바꾸고 싶어요',
  '사람이 <b>들거나 쓰는 장면</b>이 필요한데 모델 촬영이 부담돼요',
  '무료 이미지 사이트 사진이 <b>다른 가게와 겹쳐요</b>',
]))}
${part('How it runs', '이렇게 만들어요', '', steps([
  ['01', '장면 정하기', '제품 사진과 판매 페이지를 보고 손님이 볼 장면을 정해요 (주방, 식탁, 선물 등).'],
  ['02', '콘셉트 3줄 확인', '배경·색·소품(모델컷은 나이대·분위기·포즈)을 <b>글로 먼저 확인</b>받아요.', true],
  ['03', 'AI 연출과 다듬기', 'AI로 연출한 뒤 <b>제품 부분은 원본 기준으로</b> 다듬어요. 손가락·눈처럼 AI가 자주 틀리는 부분은 확대해서 확인해요.'],
  ['04', '납품', '원하는 비율(1000×1000, 상세페이지 860px 등)로 JPG·PNG 납품해요.'],
]))}
${part('Packages · Product', '제품 연출컷', '', pkgTable(
  [{ name: '연출컷 1장' }, { name: '연출컷 4장', sub: '상세페이지 한 세트' }, { name: '10장 + 대표이미지' }],
  [
    ['가격', '<b>15,000원</b>', '<b>39,000원</b>', '<b>79,000원</b>'],
    ['내용', '배경·소품 연출 1컷', '한 콘셉트로 4컷', '10컷 + 목록용 대표이미지 1장'],
    ['작업일', '2일', '3일', '5일'],
    ['수정', '1회', '2회', '2회'],
  ]))}
${part('Packages · Model', 'AI 모델 이미지', '', pkgTable(
  [{ name: '모델컷 1장' }, { name: '맞춤 모델컷 1장' }, { name: '제품 든 모델컷 3장' }],
  [
    ['가격', '<b>15,000원</b>', '<b>35,000원</b>', '<b>79,000원</b>'],
    ['내용', '상반신 위주, 단순한 배경', '나이대·표정·포즈·배경 맞춤 (시안 2개 중 선택)', '같은 모델이 내 제품을 들거나 쓰는 장면 3장'],
    ['작업일', '2일', '3일', '5일'],
    ['수정', '1회', '2회', '2회'],
  ], 2))}
${part('Scope', '약속하는 것과 하지 않는 것', '', duo([
  '제품 모양·색·라벨은 <b>원본과 같게</b> (다르면 다시 만들어요)',
  '시안 전에 콘셉트를 <b>글로 먼저 확인</b>',
  'AI 도구 약관상 <b>상업적 사용이 가능한 방식</b>으로만 제작',
  '판매·광고에 자유롭게 사용',
], [
  '크기·구성을 부풀리는 <b>과장 연출</b>',
  '사진에 안 보이는 면(뒷면 등) 만들기',
  '제품 실물 촬영, 움직이는 영상',
  '효능·인증을 표시하는 문구',
], '이렇게 약속해요', '하지 않아요'))}
${part('Price &amp; terms', '진행 안내', '', terms({
  name: '연출컷 4장', sub: '상세페이지 한 세트 분량', price: '39,000원', brk: '1장만 필요하면 15,000원',
  rows: [
    ['준비할 것', '제품 사진(가장 화질 좋은 것, 여러 각도면 더 좋아요) · 판매 페이지 주소 · 원하는 분위기 · 쓸 곳'],
    ['사진 확인', '밝고 흔들리지 않은 휴대폰 사진이면 돼요. <b>구매 전에 보내 주시면</b> 가능한지 먼저 알려 드려요.'],
  ],
  refund: [['작업 시작 전', R.full], ['콘셉트 확인 후, 시안 전', R.half], ['시안 전달 후', R.none]],
}))}
${part('FAQ', '자주 묻는 것', '', faq([
  ['제품이 원본과 다르게 나오진 않나요', '제품 모양·색·라벨은 원본 사진 기준으로 맞추고, 다르면 수정해 드려요.'],
  ['저작권은요', '납품 이미지는 판매·광고에 자유롭게 쓰셔도 돼요. 상업적 사용이 가능한 방식으로만 만들어요.'],
  ['실제 사람처럼 보이나요', '네. 다만 실존 인물과 닮게 만들지 않고, 손가락·눈·치아처럼 AI가 자주 틀리는 부분은 확대해서 확인하고 보내 드려요.'],
]))}
${xlinks(['detail', 'thumbnail', 'store', 'content'])}
${cta('사진 찍을 시간이 없다면,<br>사진 한 장만 보내 주세요', '휴대폰 사진으로도 돼요. 가능한지 먼저 확인해 드려요.')}
</main>`,
};

PAGES.content = {
  title: '카드뉴스·블로그 월 운영 — 라미스튜디오',
  desc: '한 달 주제표를 먼저 드리고 인스타그램 카드뉴스와 가게 블로그 글을 꾸준히 쌓아요. 올리기 전에 원고를 꼭 보여 드려요. 체험 39,000원부터.',
  body: () => `
${hero({ label: 'Monthly Content · Instagram &amp; Blog', h1: '올릴 시간이 없다면,<br><em>한 달 치</em>를 먼저 짜 드려요',
  sub: '무엇을 올릴지부터 막히는 게 보통이에요. <b>한 달 주제표를 먼저</b> 드리고, 카드뉴스와 블로그 글을 꾸준히 쌓아요.',
  meta: ['한 달 주제표', '원고 먼저 확인', '월말 보고서', '비밀번호 안 받아요'] })}
<main>
${part('For you', '이런 분께 맞아요', '', qs([
  '가게 인스타·블로그에 <b>꾸준히 올릴 시간이 없어요</b>',
  '<b>무엇을 올려야 할지</b>부터 막혀요',
  '손님이 검색하는 말(지역 + 업종)로 <b>블로그 글을 쌓고 싶어요</b>',
  '상세페이지·홈페이지와 <b>같은 톤으로</b> SNS도 맞추고 싶어요',
]))}
${part('How it runs', '한 달은 이렇게 흘러가요', '', steps([
  ['1주', '한 달 주제표', '업종과 손님층을 보고 <b>이번 달 주제</b>를 먼저 정해 드려요. 확인받고 시작해요.', true],
  ['2~3주', '원고 확인 → 디자인', '모든 글은 <b>올리기 전에 원고를 보여 드려요.</b> 카드뉴스는 문구 확인 후 디자인해요.'],
  ['4주', '월말 보고서', '올린 글의 반응과 다음 달에 바꿀 점을 한 장으로 정리해요.'],
]))}
${part('Instagram', '인스타그램 카드뉴스', '저장되는 구성(문제 → 정보 → 요약 → 행동)으로 만들어요. 직접 운영하는 계정에도 같은 방식으로 올리고 있어요.', pkgTable(
  [{ name: '1세트', sub: '문구 제공 시' }, { name: '1세트 기획 포함' }, { name: '월 4세트' }],
  [
    ['가격', '<b>39,000원</b>', '<b>79,000원</b>', '<b>290,000원</b>'],
    ['내용', '보내 주신 문구로 6장', '주제만 주시면 8장 기획·문구·디자인 + 캡션', '한 달 주제 4개 + 8장 세트 4개 (세트당 약 72,500원)'],
    ['작업일', '4일', '5일', '30일 (세트별 순차)'],
    ['수정', '2회', '2회', '세트당 1회'],
  ], 2))}
${part('Blog', '가게 블로그 운영', '손님이 실제로 검색하는 말로 글을 꾸준히 쌓는 게 먼저예요.', pkgTable(
  [{ name: '체험 2건' }, { name: '월 8건', sub: '주 2회' }, { name: '월 12건 + 스레드 12개' }],
  [
    ['가격', '<b>39,000원</b>', '<b>169,000원</b>', '<b>249,000원</b>'],
    ['내용', '키워드 선정 + 원고 2건 + 썸네일 2장', '한 달 주제 기획 + 원고 8건 + 썸네일 + 월말 보고서', '원고 12건 + 같은 주제 스레드 글 12개 + 월말 보고서'],
  ]))}
${part('Scope', '들어가는 것과 빠지는 것', '', duo([
  '한 달 주제표 (월 패키지)',
  '원고·문구 작성, 카드뉴스 디자인, 블로그 썸네일',
  '인스타 세로형 1080×1350 · 게시용 캡션',
  '월말 보고서 (월 패키지)',
], [
  '게시 대행 — 완성본을 드리고 <b>게시는 직접</b> (비밀번호를 받지 않아요)',
  '사진 촬영, 영상·릴스 편집',
  '광고 집행, 팔로워·방문자 수 보장',
]))}
${part('Price &amp; terms', '진행 안내', '', terms({
  name: '블로그 월 8건', sub: '주 2회 · 가장 많이 고르는 패키지', price: '월 169,000원', brk: '먼저 체험 2건 39,000원',
  rows: [
    ['준비할 것', '인스타·블로그 주소(또는 업종) · 원하는 주제(없으면 3개 제안) · 브랜드 색·로고 · 가게 사진(있다면)'],
    ['진행 방식', '첫 주에 한 달 주제를 확인받고 시작해요. 이후 원고 확인 → 디자인 → 납품을 반복해요.'],
  ],
  refund: [['작업 시작 전', R.full], ['문구·원고 전달 후', R.half], ['디자인 전달 후', '<span class="cut">환불 불가</span>'], ['월 패키지', '납품하지 않은 회차만큼 환불']],
}))}
${part('FAQ', '자주 묻는 것', '', faq([
  ['게시까지 해 주시나요', '아니요. 완성 이미지와 캡션·원고를 드리고 게시는 직접 하세요. 계정 비밀번호는 받지 않아요.'],
  ['주제를 못 정했어요', '업종과 손님층을 알려 주시면 주제 3개를 먼저 제안드려요.'],
  ['사진이 없어도 되나요', '글자·도형·일러스트 위주로 만들 수 있어요. 가게 사진이 있으면 함께 쓰면 더 좋아요.'],
  ['바로 월 운영을 맡기기 부담돼요', '블로그 <b>체험 2건(39,000원)</b>이나 카드뉴스 1세트로 먼저 맞는지 보세요.'],
]))}
${xlinks(['homepage', 'thumbnail', 'detail', 'ai-image'])}
${cta('매달 올릴 게 걱정이라면,<br>주제표부터 받아 보세요', '업종과 지금 쓰는 계정만 알려 주세요. 이번 달 주제 3개를 먼저 제안드려요.')}
</main>`,
};

// ── 홈 (기존 rami-studio 사이트 내용 + 새 서비스) ───────────────
const out = __dirname;
const hasProfile = fs.existsSync(path.join(out, 'assets/img/profile.jpg')); // 프로필 사진을 이 이름으로 넣으면 자동으로 나와요

const home = page({
  slug: 'index',
  title: '라미스튜디오 — 팔리는 이유를 디자인합니다',
  desc: '1인 판매자와 동네 가게를 위한 라미스튜디오. 상세페이지 · 가게 홈페이지 · 스마트스토어 세팅 · 썸네일 · AI 이미지 · 카드뉴스·블로그 운영. 지금 필요한 만큼만 고르세요.',
  ld: { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: '라미스튜디오', alternateName: 'RAMI STUDIO',
    description: '1인 판매자·동네 가게 상세페이지와 홈페이지, 문구 기획부터 디자인까지',
    hasOfferCatalog: { '@type': 'OfferCatalog', name: '라미스튜디오 서비스',
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.card } })) } },
  body: `
${hero({ label: 'RAMI STUDIO', h1: '팔리는 이유,<br><em>어디서부터</em> 만들까요?',
  sub: '1인 판매자와 동네 가게의 상세페이지·홈페이지·스토어를 <b>기획부터 디자인까지 혼자 직접</b> 해요. 아래에서 하나만 골라도 시작할 수 있어요.' })}
<main>
<section class="container" id="services">
  <div class="rows">
${SERVICES.map((s, i) => `
    <a class="row" href="${file(s.slug)}">
      <div class="row-n">${String(i + 1).padStart(2, '0')}</div>
      <div class="row-l">
        <div class="row-k">${s.key}</div>
        <div class="row-t">${s.name}</div>
        <div class="row-d">${s.card} <b>${s.hook.replace(/<\/?b>/g, '')}</b></div>
      </div>
      <div class="row-ar">→</div>
    </a>`).join('')}
  </div>

  <div class="situ">
    <div class="situ-head">
      <div class="situ-k">어디서부터 할지 모르겠다면</div>
      <div class="situ-h">지금 내 말 같은 걸 하나 골라 보세요</div>
      <p>고른 곳에서 시작하면 돼요. 순서는 상관없어요.</p>
    </div>
    <div class="situ-grid">
${PICK.map(([q, sl, l, t]) => `      <a class="situ-c" href="${file(sl)}"><span class="situ-q">“${q}”</span><span class="situ-a"><b>${l}</b><i>${t}</i></span></a>`).join('\n')}
      <a class="situ-c etc" href="${KAKAO}"${ext(KAKAO)}><span class="situ-q">“로고나 릴스도 필요해요”</span><span class="situ-a"><b>브랜드 로고 · 미니 가이드 · 릴스·쇼츠</b><i>상담 후 안내</i></span></a>
    </div>
  </div>
</section>

${part('Work', '이렇게 만들었어요', '업종은 매번 달랐지만, 손님이 망설이는 지점을 먼저 찾는 방식은 같았어요.', caseCards())}

<div id="contact">${cta('어떤 것부터 할지 몰라도 괜찮아요', '지금 고민만 알려 주세요. 필요한 것부터 함께 정해요. 상담하는 사람이 디자인까지 직접 해요.', '카카오톡으로 상담하기')}</div>
</main>`,
});

// ── 작업 사례 페이지 ──────────────────────────────────────────
const work = page({
  slug: 'work',
  title: '작업 사례 — 라미스튜디오',
  desc: '식품, 뷰티, 키즈, 공간, 재테크, 여행까지 상세페이지 작업 14건. 업종은 매번 달랐지만 고객이 망설임 없이 선택하게 만드는 구조는 같았어요.',
  body: `
${hero({ label: 'Work archive · No. 001–014', h1: '업종은 달라도,<br><em>만든 건 늘 같았어요</em>',
  sub: '식품, 뷰티, 키즈, 공간, 재테크, 여행까지. 예쁜 디자인이 아니라 <b>손님이 망설임 없이 고르게 만드는 구조</b>예요. 우리 브랜드와 가장 가까운 사례부터 보세요.',
  meta: ['14개 프로젝트', '10개 산업군', '1인 스튜디오 직접 진행'] })}
<main>
${part('Signature work', '깊이 들어간 프로젝트 세 편', '무엇을, 왜 그 순서로 풀었는지 세 편만 골라 보여 드려요. 이미지를 누르면 상세페이지 전체가 열려요.', `
<div class="sig">${SIGNATURE.map((c, i) => `
  <div class="sig-card" id="${c.id}">
    <button class="sig-media" data-full="assets/work/full/${c.img}.jpg" data-title="${c.title}" data-cat="${c.cat}">
      <span class="case-no">0${i + 1}</span><img src="assets/work/thumbs/${c.img}.jpg" alt="${c.title} 상세페이지" loading="lazy">
    </button>
    <div class="sig-text">
      <div class="case-cat">${c.cat}</div>
      <div class="sig-t">${c.title}</div>
      <p>${c.desc}</p>
      <div class="sig-scope">${c.scope.map((x) => `<span>${x}</span>`).join('')}</div>
    </div>
  </div>`).join('')}
</div>`)}

${part('Full archive', '지금까지의 작업 기록', '카테고리를 눌러 우리 상황과 비슷한 사례부터 찾아보세요. 누르면 상세페이지 전체를 볼 수 있어요.', `
<div class="filters">
  <button class="on" data-f="all">전체</button>
${Object.entries(CATS).map(([k, v]) => `  <button data-f="${k}">${v}</button>`).join('\n')}
</div>
<div class="grid">${WORKS.map(([no, img, cat, title, desc]) => `
  <button class="card" data-cat="${cat}" data-full="assets/work/full/${img}.jpg" data-title="${title}" data-cat-label="${CATS[cat]}">
    <div class="card-img"><span class="card-no">${no}</span><img src="assets/work/thumbs/${img}.jpg" alt="${title} 상세페이지" loading="lazy"></div>
    <div class="card-body"><div class="case-cat">${CATS[cat]}</div><div class="card-t">${title}</div><p>${desc}</p></div>
  </button>`).join('')}
</div>`)}

${cta('비슷한 작업이 필요하다면,<br>지금 고민부터 들려주세요', '어떤 업종이든 괜찮아요. 손님이 망설이는 지점을 함께 찾아요.', '비슷한 작업 문의하기')}
</main>

<div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="상세페이지 전체 보기">
  <button class="modal-x" aria-label="닫기">✕</button>
  <div class="modal-in"><div class="modal-cap"><div class="case-cat"></div><h4></h4></div><img alt=""></div>
</div>
<script>
const modal=document.getElementById('modal'),mImg=modal.querySelector('img'),mCat=modal.querySelector('.case-cat'),mT=modal.querySelector('h4');
document.querySelectorAll('[data-full]').forEach(el=>el.addEventListener('click',()=>{
  mImg.src=el.dataset.full; mImg.alt=el.dataset.title+' 상세페이지 전체';
  mCat.textContent=el.dataset.catLabel||el.dataset.cat; mT.textContent=el.dataset.title;
  modal.classList.add('open'); modal.scrollTop=0; document.body.style.overflow='hidden';
}));
function closeModal(){modal.classList.remove('open');document.body.style.overflow='';}
modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('modal-x'))closeModal();});
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.grid .card').forEach(c=>c.hidden=!(b.dataset.f==='all'||c.dataset.cat===b.dataset.f));
}));
</script>`,
});

// ── 쓰기 ─────────────────────────────────────────────────────
fs.writeFileSync(path.join(out, 'index.html'), home);
fs.writeFileSync(path.join(out, 'work.html'), work);
for (const s of SERVICES) {
  const p = PAGES[s.slug];
  fs.writeFileSync(path.join(out, file(s.slug)), page({ slug: s.slug, title: p.title, desc: p.desc, body: p.body(),
    ld: { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: p.desc, provider: { '@type': 'Organization', name: '라미스튜디오' } } }));
}
console.log('done:', ['index', 'work', ...SERVICES.map((s) => s.slug)].map(file).join(', '));
