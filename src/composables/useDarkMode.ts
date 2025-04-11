import { ref, onMounted, onUnmounted } from "vue";

export function useDarkMode() {
  const isDark = ref<boolean>(false);

  const checkDarkMode = () => {
    isDark.value = document.documentElement.classList.contains("dark");
  };

  const observer = ref<MutationObserver | null>(null);

  onMounted(() => {
    checkDarkMode();
    observer.value = new MutationObserver(checkDarkMode);
    observer.value.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
      observer.value = null;
    }
  });
  return {
    isDark,
  };
}
