import { Injectable } from '@angular/core';
import { Storage } from './storage/storage.type';

@Injectable({
  providedIn: 'root',
})
export class StorageManager {
  private readonly STORAGE_KEY = 'dev.okaj.GameCollection';

  createDefaultStorage(): Storage {
    return {
      version: 1,
      applesTotal: 0
    };
  }

  loadStorage(): Storage {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return this.createDefaultStorage();
    }

    let storage = JSON.parse(data);

    switch (storage.version) {
      case 1:
        //     return this.migrateV1(storage);

        // case 2:
        return storage;
    }

    return storage;
  }

  saveStorage(storage: Storage): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storage));
  }
}
