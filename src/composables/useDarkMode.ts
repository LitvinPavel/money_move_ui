import { ref, onMounted, onUnmounted, watch } from "vue";

export function useDarkMode() {
  const isDark = ref<boolean>(false);

  const updateThemeColor = () => {
    const themeColor = isDark.value ? "#111827" : "#fafafa";
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.setAttribute("content", themeColor);
  };

  const checkDarkMode = () => {
    isDark.value = document.documentElement.classList.contains("dark");
    updateThemeColor();
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

  watch(isDark, updateThemeColor);

  return {
    isDark,
  };
}