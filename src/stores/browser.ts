import { StoreApi, UseBoundStore, create } from 'zustand'

export type Browser = 'google-chrome' | 'chromium' | 'google-chrome-unstable' | 'firefox'

type BrowserStore = {
  browser: Browser
  setBrowser: (browser: Browser) => void
}

export const useBrowser: UseBoundStore<StoreApi<BrowserStore>> = create((set) => ({
  browser: 'google-chrome',
  setBrowser: (browser: Browser) => { set({ browser }); },
}));