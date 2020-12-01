import { writable, derived } from "svelte/store";
import { syncable } from "./localStorageStore";

export const loader = writable(false);

export const favoritesArticles = syncable("favoritesArticles", []);
export const favoritesAuthors = syncable("favoritesAuthors", []);
export const articlesRead = syncable("articlesRead", []);
export const lastAcademy = syncable("lastAcademy", null);

export const lastRead = derived(articlesRead, ($state, set) => {
  const list = [...$state];
  if (list.length > 4) {
    list.length = 4;
  }
  set(list);
});
