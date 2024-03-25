import {
  createToastInterface,
  EventBus,
  toastInjectionKey,
} from "vue-toastification";

const globalEventBus = new EventBus();

export function createGlobalToast(options) {
  return createToastInterface({ ...options, eventBus: globalEventBus });
}

export function useGlobalToast() {
  return createToastInterface({ eventBus: globalEventBus });
}

export function provideAppToast(app, options) {
  const toast = createGlobalToast(options);

  app.provide(toastInjectionKey, toast);

  app.config.globalProperties.$toast = toast;
}
