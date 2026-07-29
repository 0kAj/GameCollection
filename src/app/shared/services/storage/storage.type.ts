import { StorageV1 } from './storage-v1';
import { StorageV2 } from './storage-v2';

export type CurrentStorageVersion = StorageV2;
export type Storage = StorageV1 | StorageV2;
