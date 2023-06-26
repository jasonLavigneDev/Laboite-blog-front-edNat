import {waitLocale} from 'svelte-i18n';

export async function load(args) {
  waitLocale();
  return args.data;
}
