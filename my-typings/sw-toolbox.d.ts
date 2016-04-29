interface Options {
  /**
   * Determines whether extra information is logged to the browser's console.
   * @default false
   */
  debug: boolean;

  /**
   * A timeout that applies to the toolbox.networkFirst built-in handler.
   * If networkTimeoutSeconds is set, then any network requests that take longer than that amount of time will
   * automatically fall back to the cached response if one exists.
   * When networkTimeoutSeconds is not set, the browser's native networking timeout logic applies.
   * @default null
   */
  networkTimeoutSeconds: number;

  /**
   * Various properties of cache control the behavior of the default cache when set
   * via toolbox.options.cache, or the cache used by a specific request handler.
   */
  cache: CacheInterface;
}

interface CacheInterface {
  /**
   * The name of the Cache used to store Response objects.
   * Using a unique name allows you to customize the cache's maximum size and age of entries.
   * @default Generated at runtime based on the service worker's registration.scope value.
   */
  name: string;

  /**
   * Imposes a least-recently used cache expiration policy on entries cached via
   * the various built-in handlers.
   * You can use this with a cache that's dedicated to storing entries for a dynamic set of
   * resources with no natural limit.
   * Setting cache.maxEntries to, e.g., 10 would mean that after the 11th entry is cached,
   * the least-recently used entry would be automatically deleted.
   * The cache should never end up growing beyond cache.maxEntries entries.
   * This option will only take effect if cache.name is also set.
   * It can be used alone or in conjunction with cache.maxAgeSeconds.
   * @default null
   */
  maxEntries: number;

  /**
   * Imposes a maximum age for cache entries, in seconds.
   * You can use this with a cache that's dedicated to storing entries for a dynamic set of
   * resources with no natural limit.
   * Setting cache.maxAgeSeconds to, e.g., 60 * 60 * 24 would mean that any entries older than
   * a day would automatically be deleted.
   * This option will only take effect if cache.name is also set.
   * It can be used alone or in conjunction with cache.maxEntries.
   * @default null
   */
  maxAgeSeconds: number;
}

interface Handler {}

interface Router {
  get(urlPattern: string, handler: Handler, options: any): void;
  post(urlPattern: string, handler: Handler, options: any): void;
  put(urlPattern: string, handler: Handler, options: any): void;
  delete(urlPattern: string, handler: Handler, options: any): void;
  head(urlPattern: string, handler: Handler, options: any): void;
  any(urlPattern: string, handler: Handler, options: any): void;

  default: Handler;
}

declare var toolbox: {
  /**
   * All options can be specified globally via properties of toolbox.options.
   * Any individual options can be configured on a per-handler basis, via the Object
   * passed as the third parameter to toolbox.router methods.
   */
  options: Options;

  // Handlers
  /**
   * Try to handle the request by fetching from the network.
   * If it succeeds, store the response in the cache.
   * Otherwise, try to fulfill the request from the cache.
   * This is the strategy to use for basic read-through caching.
   * It's also good for API requests where you always want the freshest data when it is available but would rather have stale data than no data.
   */
  networkFirst: Handler;

  /**
   * If the request matches a cache entry, respond with that. Otherwise try to fetch the resource from the network.
   * If the network request succeeds, update the cache.
   * This option is good for resources that don't change, or have some other update mechanism.
   */
  cacheFirst: Handler;

  /**
   * Request the resource from both the cache and the network in parallel.
   * Respond with whichever returns first. Usually this will be the cached version, if there is one.
   * On the one hand this strategy will always make a network request, even if the resource is cached.
   * On the other hand, if/when the network request completes the cache is updated, so that future cache reads will be more up-to-date.
   */
  fastest: Handler;

  /**
   * Resolve the request from the cache, or fail.
   * This option is good for when you need to guarantee that no network request will be made, for example saving battery on mobile.
   */
  cacheOnly: Handler;

  /**
   * Handle the request by trying to fetch the URL from the network.
   * If the fetch fails, fail the request. Essentially the same as not creating a route for the URL at all.
   */
  networkOnly: Handler;

  router: Router;

  /**
   * Add each URL in arrayOfURLs to the list of resources that should be cached during the service worker install step.
   * Note that this needs to be called before the install event is triggered, so you should do it on the first run of your script.
   */
  precache(arrayOfURLs: string[]): void;

  /**
   * Causes the resource at url to be added to the cache and returns a Promise that resolves with void.
   * The options parameter supports the debug and cache global options.
   */
  cache(url: string, options: Options): Promise<void>;

  /**
   * Causes the resource at url to be removed from the cache and
   * returns a Promise that resolves to true if the cache entry is deleted.
   * The options parameter supports the debug and cache global options.
   */
  uncache(url: string, options: Options): Promise<boolean>;
}
