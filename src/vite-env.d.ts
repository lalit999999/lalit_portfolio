/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HASHNODE_TOKEN: string;
  readonly VITE_HASHNODE_USERNAME: string;
  readonly VITE_BLOG_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
