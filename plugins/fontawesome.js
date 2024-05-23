import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faPlus, faEnvelope, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus, faCheck, faEnvelope, faPlay);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});