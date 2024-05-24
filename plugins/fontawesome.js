import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faPlus, faEnvelope, faPlay, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

if (process.client) {
  library.add(faPlus, faCheck, faEnvelope, faPlay, faBars);
}

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
  }
});
