import type { App } from "vue";
import { clickOutside } from './clickOutside';

export function registerDirectives(app: App) {
  app.directive('click-outside', clickOutside);
}
