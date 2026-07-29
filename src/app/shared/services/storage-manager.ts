import { Injectable } from '@angular/core';
import { CurrentStorageVersion, Storage } from './storage/storage.type';
import { StorageV1 } from './storage/storage-v1';
import { StorageV2 } from './storage/storage-v2';

@Injectable({
  providedIn: 'root',
})
export class StorageManager {
  private readonly STORAGE_KEY = 'dev.okaj.GameCollection';

  createDefaultStorage(): CurrentStorageVersion {
    return {
      version: 2,
      applesTotal: 0,
      applesEverCollected: 0,
      collectorHighestCombo: 0,
      longestSnake: 0,
    };
  }

  loadStorage(): CurrentStorageVersion {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      const storage = this.createDefaultStorage();
      this.saveStorage(storage);
      return storage;
    }

    const storage: Storage = JSON.parse(data);

    switch (storage.version) {
      case 1:
        const migrated = this.migrateV1(storage);
        this.saveStorage(migrated);
        return migrated;

      case 2:
        return storage;

      default:
        return this.createDefaultStorage();
    }
  }

  private migrateV1(storage: StorageV1): StorageV2 {
    return {
      version: 2,
      applesTotal: storage.applesTotal,
      applesEverCollected: storage.applesTotal,
      collectorHighestCombo: 0,
      longestSnake: 0,
    };
  }

  saveStorage(storage: CurrentStorageVersion): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storage));
  }
}
