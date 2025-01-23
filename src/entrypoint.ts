import type { Alpine as AlpineType } from 'alpinejs';
// @ts-ignore
import sticky from 'alpinejs-sticky'

declare global {
  const Alpine: AlpineType;
}
export default (Alpine: AlpineType) => {
    Alpine.plugin(sticky);
    Alpine.store('cache', {
      banner: null,
      theme: null,
      pageTop: false,
      scrollHeight: 0,
  });
}