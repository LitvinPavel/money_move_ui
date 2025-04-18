import { ref, onMounted, onUnmounted, watch } from "vue";

export function useDarkMode() {
  const isDark = ref<boolean>(false);

  const checkTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = systemPrefersDark;
    }

    applyTheme();
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const watchSystemTheme = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          isDark.value = e.matches;
          applyTheme();
        }
      });
  };

  const updateThemeColor = () => {
    const themeColor = isDark.value ? "#111827" : "#f3f4f6";
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
    checkTheme,
    toggleTheme,
    watchSystemTheme
  };
}
