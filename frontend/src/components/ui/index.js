import UiButton from './Button.vue';
import UiAvatar from './Avatar.vue';
import UiBadge from './Badge.vue';
import UiCard from './Card.vue';
import DesignTokens from './ColorVariables';

export {
  UiButton,
  UiAvatar,
  UiBadge,
  UiCard,
  DesignTokens
};

export default {
  install(app) {
    app.component('UiButton', UiButton);
    app.component('UiAvatar', UiAvatar);
    app.component('UiBadge', UiBadge);
    app.component('UiCard', UiCard);
  }
};