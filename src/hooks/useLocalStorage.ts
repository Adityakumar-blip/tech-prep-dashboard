/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";

function useLocalStorage(key: string) {
  const isClient = typeof window !== "undefined";

  const setValueToLocalStorage = (newValue: any) => {
    if (isClient) {
      window.localStorage.setItem(key, newValue);
      window.dispatchEvent(
        new StorageEvent("storage", { key, newValue } as StorageEventInit)
      );
    }
  };

  const getSnapshot = () =>
    isClient ? window.localStorage.getItem(key) : null;
  const getServerSnapshot = () => null;

  const subscribe = (listener: () => void) => {
    if (!isClient) return () => {};

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === key) {
        listener();
      }
    };
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  };

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [value, setValueToLocalStorage] as const;
}

export default useLocalStorage;
