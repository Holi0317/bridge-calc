import {IDBStorageService} from './idb-storage-service';

/**
 * Decide and use storage service depending on environment
 */
export class StorageManagerService {
  constructor(private _idbStorage: IDBStorageService) {

  }
}
