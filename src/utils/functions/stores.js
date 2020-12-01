import { writable } from "svelte/store";
import { syncable } from "./localStorageStore";

export const loader = writable(false);

export const favoritesArticles = syncable("favoritesArticles", []);
export const favoritesAuthors = syncable("favoritesAuthors", []);
export const lastAcademy = syncable("lastAcademy", null);
