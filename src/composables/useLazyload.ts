import { ref, onMounted, onUnmounted } from "vue";

export function useLazyload(_loadMore: () => Promise<void>) {
  const selectElement = ref<HTMLSelectElement | null>(null);

  const handleScroll = () => {
    if (!selectElement.value) return;

    const { scrollTop, scrollHeight, clientHeight } = selectElement.value;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
    console.log(isNearBottom)
    if (isNearBottom) {
      _loadMore();
    }
  };

  onMounted(() => {
    if (selectElement.value) {
      selectElement.value.addEventListener("scroll", handleScroll);
    }
  });

  onUnmounted(() => {
    if (selectElement.value) {
      selectElement.value.removeEventListener("scroll", handleScroll);
    }
  });

  return {
    selectElement,
  };
}
