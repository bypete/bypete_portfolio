import type { Alpine } from 'alpinejs'
import sticky from 'alpinejs-sticky'

export default (Alpine: Alpine) => {
    Alpine.plugin(sticky);
    Alpine.store('cache', {
      banner: null,
      theme: null,
      pageTop: false,
      scrollHeight: 0,
  });
}