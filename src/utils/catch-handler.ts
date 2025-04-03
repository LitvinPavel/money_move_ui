import { isAxiosError } from "@/api";

function catchHandler(err: unknown, defaultMessage: string) {
  return isAxiosError(err)
    ? err.response?.data.message || defaultMessage
    : "Неизвестная ошибка";
}

export default catchHandler;
