/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}