import tippy from 'tippy.js'; 
import 'tippy.js/dist/tippy.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', {
    mounted(el, binding) {
      tippy(el, {
        content: binding.value,
      });
    },
  });
});
