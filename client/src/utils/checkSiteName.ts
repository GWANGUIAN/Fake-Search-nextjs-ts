export default function checkSiteName(siteName: string) {
  const name = siteName;
  const checkForm = new RegExp(/^[A-Za-z가-힣]{2,10}$/);
  const checkDomain = [
    'naver',
    'daum',
    'kakao',
    'google',
    'nate',
    '네이버',
    '다음',
    '카카오',
    '구글',
    '네이트',
  ];

  return !(
    name === null ||
    name === '' ||
    checkDomain.some((el) => name.toLowerCase().includes(el)) ||
    !checkForm.test(name)
  );
}
