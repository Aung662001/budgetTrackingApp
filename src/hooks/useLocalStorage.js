import { useEffect, useState } from "react";

export function useLocalStorage(key, IntitalValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (IntitalValue === "function") {
      return IntitalValue();
    } else {
      return IntitalValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
