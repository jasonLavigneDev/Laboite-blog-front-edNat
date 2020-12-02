import { writable, derived } from "svelte/store";
import { beforeUpdate } from "svelte";

export const location = writable({
  current: undefined,
  previous: undefined,
});

export const routeHasChanged = derived(location, ($l) => {
  if (!$l.previous || !$l.current) return true;

  if ($l.previous.pathname !== $l.current.pathname) return true;

  return false;
});

export function trackLocation() {
  beforeUpdate(() => {
    if (typeof window !== "undefined") {
      location.update((l) => {
        if (l.current && l.current.pathname === window.location.pathname) {
          return {
            previous: l.previous,
            current: { ...window.location },
          };
        } else if (
          l.current &&
          l.previous &&
          window.location.href === l.previous.href
        ) {
          return {
            previous: null,
            current: { ...window.location },
          };
        }
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
  });
}
