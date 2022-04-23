import NextHead from 'next/head';
import Script from 'next/script';

const Head = () => (
  <NextHead>
    <Script src="https://developers.kakao.com/sdk/js/kakao.min.js" />
    <meta
      name="description"
      content="드라마, 영화 등에서 활용할 수 있도록 검색어와 검색 데이터를 커스터마이징할 수 있는 서비스"
    />
    <title>FAKESEARCH : 페이크서치</title>
  </NextHead>
);

export default Head;
