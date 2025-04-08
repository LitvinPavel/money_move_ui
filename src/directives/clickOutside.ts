import type { Directive, DirectiveBinding } from 'vue'

type ClickOutsideHandler = (event: MouseEvent) => void

interface ClickOutsideDirectiveBinding extends DirectiveBinding {
  value: ClickOutsideHandler
}

export const clickOutside: Directive<HTMLElement, ClickOutsideHandler> = {
  mounted(el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
    const handler: ClickOutsideHandler = (event: MouseEvent) => {
      // Проверяем, что клик был вне элемента и его потомков
      if (!el.contains(event.target as Node) && el !== event.target) {
        binding.value(event)
      }
    }

    // Сохраняем обработчик в элементе для последующего удаления
    el._clickOutsideHandler = handler
    
    // Добавляем обработчик на документ
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    // Удаляем обработчик при размонтировании компонента
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
      delete el._clickOutsideHandler
    }
  }
}

// Расширяем интерфейс HTMLElement для хранения обработчика
declare global {
  interface HTMLElement {
    _clickOutsideHandler?: ClickOutsideHandler
  }
}