import { writable } from 'svelte/store';

export const toasts: any = writable([]);
export const notes: any = writable([
  {
    title: 'Note 1',
    preview: 'This is a preview of note 1',
    date: new Date(),
  },
  {
    title: 'Note 2',
    preview: 'This is a preview of note 2',
    date: new Date(),
  },
  {
    title: 'Note 3',
    preview: 'This is a preview of note 3',
    date: new Date(),
  }
]);