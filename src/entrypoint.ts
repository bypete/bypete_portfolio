import type { Alpine } from 'alpinejs'
import intersect from '@alpinejs/intersect'
import sticky from 'alpinejs-sticky'

export default (Alpine: Alpine) => {
    Alpine.plugin(intersect);
    Alpine.plugin(sticky)
    Alpine.store('banner', {
      state: null,
  });
}