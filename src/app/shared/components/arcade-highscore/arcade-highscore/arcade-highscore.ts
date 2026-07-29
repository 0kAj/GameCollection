import { StorageManager } from './../../../services/storage-manager';
import { Component } from '@angular/core';
import { ArcadeTitle } from "../../arcade-title/arcade-title";
import { CurrentStorageVersion } from '../../../services/storage/storage.type';

@Component({
  selector: 'app-arcade-highscore',
  imports: [ArcadeTitle],
  templateUrl: './arcade-highscore.html',
  styleUrl: './arcade-highscore.css',
})
export class ArcadeHighscore {

  storage: CurrentStorageVersion;

  constructor(storageManager: StorageManager) {
    this.storage = storageManager.loadStorage();
  }
}
