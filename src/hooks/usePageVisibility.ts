import { useSyncExternalStore } from "react";

export const usePageVisibility = () =>
  useSyncExternalStore(
    (notify) => {
      document.addEventListener("visibilitychange", notify);
      return () => document.removeEventListener("visibilitychange", notify);
    },
    () => !document.hidden,
    () => true,
  );
