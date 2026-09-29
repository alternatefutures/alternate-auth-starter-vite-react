/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALTERNATE_CLOUDS_CLIENT_ID: string;
  readonly VITE_ALTERNATE_CLOUDS_ISSUER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
