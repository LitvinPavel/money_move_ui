import { inject } from "vue";

export function useError() {
  const errorHandler = inject<(error: string) => void>("errorHandler");

  function showError(err: string) {
    if (errorHandler) {
      errorHandler(err);
    }
  }
  return {
    showError
  };
}
