import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';

export interface SalesState {
  columns: any[];
  data: any[];
  sync: boolean;
}

export const SalesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('SalesStore'),
  withState<SalesState>({
    columns: [],
    data: [],
    sync: true
  }),
  withMethods((store: any) => {
    const http = inject(HttpClient);

    return {
      getData: (sync: boolean = true) => {
        if (sync) {
          http.get<any>('/data-sales.json').subscribe((res) => {
            patchState(store, {
              columns: res.column,
              data: res.data
            });
          });
        }
      },

      toggleSync: () => {
        patchState(store, { sync: !store.sync() });
      },

      addEntry: (entry: any) => {
        const data = store.data();
        patchState(store, {
          data: [...data, entry]
        });
      }
    };
  })
);
