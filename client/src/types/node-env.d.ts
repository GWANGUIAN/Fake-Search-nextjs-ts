declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_API: string | undefined;
    NEXT_PUBLIC_KAKAO_JS_KEY: string | undefined;
    NEXT_PUBLIC_KAKAO_REST_KEY: string | undefined;
    NEXT_PUBLIC_REDIRECT_URI: string | undefined;
    NEXT_PUBLIC_NAVER_CLIENT_ID: string | undefined;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string | undefined;
  }
}
