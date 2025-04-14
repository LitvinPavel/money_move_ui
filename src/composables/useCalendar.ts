import { ref, computed } from 'vue';

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Дата в формате YYYY-MM-DD
}

export function useCalendar() {
  const currentDate = ref(new Date());
  const events = ref<CalendarEvent[]>([]);

  // Вычисляем дни для отображения в календаре
  const daysInMonth = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];

    // Начинаем неделю с понедельника
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Понедельник = 0

    // Добавляем дни из предыдущего месяца
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({ day: date.getDate(), date, isOutsideMonth: true });
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ day: date.getDate(), date, isOutsideMonth: false });
    }

    // Добавляем дни следующего месяца
    const totalDays = days.length;
    const nextMonthDays = 42 - totalDays; // 6 строк по 7 дней
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ day: date.getDate(), date, isOutsideMonth: true });
    }

    return days;
  });

  // Функции для переключения месяцев
  const prevMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  };

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  };

  const goToToday = () => {
    currentDate.value = new Date();
  }

  // Функция для выбора дня
  const selectDay = (date: Date) => {
    console.log('Selected date:', date.toLocaleDateString());
  };

  // Функция для добавления события
  const addEvent = (date: string, title: string) => {
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(2, 9), // Генерация уникального ID
      date,
      title,
    };
    events.value.push(newEvent);
  };

  // Функция для получения событий на конкретную дату
  const getEventsForDate = (date: string) => {
    return events.value.filter((event) => event.date === date);
  };

  return {
    currentDate,
    daysInMonth,
    prevMonth,
    nextMonth,
    goToToday,
    selectDay,
    addEvent,
    getEventsForDate,
  };
}