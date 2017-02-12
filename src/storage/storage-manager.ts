import {lazy} from 'aurelia-framework'
import {IDBStorageService} from './idb-storage-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SerializerService} from '../services/serializer-service';
import {IStorageService} from './interfaces';

/**
 * Decide and use storage service depending on environment.
 * A high level service for interacting with storage
 */
export class StorageManager {
  private _storage: IStorageService;

  constructor(
    private _ea: EventAggregator,
    private _serializer: SerializerService,
    @lazy(IDBStorageService) _idb: () => IDBStorageService
  ) {
    // TODO Implement more storage engine and decide which to use.
    this._storage = _idb();
  }

  /**
   * Subscribe to changes emitted by GameService and save when there is a change.
   */
  subscribe() {
    this._ea.subscribe('gameService.start', this.add.bind(this));
  }

  add() {

  }
}
