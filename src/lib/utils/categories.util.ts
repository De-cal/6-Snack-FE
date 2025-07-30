/**
 * @Jam1eL1
 * 1. 이런 목데이터 같은 느낌의 코드는 constants 파일로 분리되는 것이 좋다고 합니다.(GPT)
 * 2. categoryStore.ts가 로직이 들어간 함수인거 같은데 그걸 util로 옮기는 것은 어떤가요?
 */

export const CATEGORIES = {
  parentCategory: [
    { id: 1, name: "스낵" },
    { id: 13, name: "음료" },
    { id: 23, name: "생수" },
    { id: 26, name: "간편식" },
    { id: 40, name: "신선식품" },
    { id: 46, name: "원두커피" },
    { id: 50, name: "비품" },
  ],
  childrenCategory: {
    스낵: [
      { id: 2, name: "과자" },
      { id: 3, name: "쿠키" },
      { id: 4, name: "파이" },
      { id: 5, name: "초콜릿류" },
      { id: 6, name: "캔디류" },
      { id: 7, name: "껌류" },
      { id: 8, name: "비스켓류" },
      { id: 9, name: "씨리얼바" },
      { id: 10, name: "젤리류" },
      { id: 11, name: "견과류" },
      { id: 12, name: "워터젤리" },
    ],
    음료: [
      { id: 14, name: "청량/탄산음료" },
      { id: 15, name: "과즙음료" },
      { id: 16, name: "에너지음료" },
      { id: 17, name: "이온음료" },
      { id: 18, name: "유산균음료" },
      { id: 19, name: "건강음료" },
      { id: 20, name: "차류" },
      { id: 21, name: "두유/우유" },
      { id: 22, name: "커피" },
    ],
    생수: [
      { id: 24, name: "생수" },
      { id: 25, name: "스파클링" },
    ],
    간편식: [
      { id: 27, name: "봉지라면" },
      { id: 28, name: "과일" },
      { id: 29, name: "컵라면" },
      { id: 30, name: "핫도그 및 소시지" },
      { id: 31, name: "계란" },
      { id: 32, name: "죽/스프류" },
      { id: 33, name: "컵밥류" },
      { id: 34, name: "시리얼" },
      { id: 35, name: "반찬류" },
      { id: 36, name: "면류" },
      { id: 37, name: "요거트류" },
      { id: 38, name: "가공안주류" },
      { id: 39, name: "유제품" },
    ],
    신선식품: [
      { id: 41, name: "샐러드" },
      { id: 42, name: "빵" },
      { id: 43, name: "햄버거/샌드위치" },
      { id: 44, name: "주먹밥/김밥" },
      { id: 45, name: "도시락" },
    ],
    원두커피: [
      { id: 47, name: "드립커피" },
      { id: 48, name: "원두" },
      { id: 49, name: "캡슐커피" },
    ],
    비품: [
      { id: 51, name: "커피/차류" },
      { id: 52, name: "생활용품" },
      { id: 53, name: "일회용품" },
      { id: 54, name: "사무용품" },
      { id: 55, name: "카페용품" },
      { id: 56, name: "일회용품(친환경)" },
    ],
  },
};
