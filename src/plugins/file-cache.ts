import {CordovaInstance, Plugin} from './plugin';
declare var window: any;
declare var $q: any;
declare var CordovaFileCache: any;
declare var CordovaPromiseFS: any;
/**
 * @name File Cache
 * @description
 * Super awesome file cache for Cordova Apps
 * @usage
 * ```typescript
 * import {FileCache, FileCacheOptions} from 'ionic-native';
 *
 * let options: FileCacheOptions = {
 *     fsOptions: {
 *       storageSize: 50*1024*1024, // 50MB
 *       concurrency: 2 // download only 2 files at a time
 *     },
 *   };
 * ```
 */
@Plugin({
  plugin: 'cordova-file-cache',
  pluginRef: 'CordovaFileCache',
  repo: 'https://github.com/markmarijnissen/cordova-file-cache'
})
export class FileCache {
  private _objectInstance: any;
  constructor(options?: FileCacheOptions) {
    let promise: any;
    if (window.Promise) {
      promise = Promise;
    } else if (window.angular) {
      promise = $q;
    } else {
      console.warn('No promise support detected. Pass a promise library manually through the fs property of the options.');
      return;
    }
    options = options ? options : {};
    let fsOptions = options.fsOptions ? options.fsOptions : {};
    fsOptions.Promise = promise;
    options.fs = new CordovaPromiseFS(fsOptions);
    if (options.fsOptions) {
      delete options.fsOptions;
    }
    this._objectInstance = new CordovaFileCache(options);
  }

  /**
   * Returns a promise that resolves when the cache storage is ready to be used.
   * @return {Promise<any[]>} a promsie that resolves when the storage is ready
   */
  @CordovaInstance({sync: true})
  ready(): Promise<any[]> {return; }

  /**
   * Adds a file or multiple files to the cache
   * @param path {string|string[]} path(s) or URL(s) to file(s) that you wish to add
   * @return {boolean} returns a boolean that indicates whether the cache is dirty
   */
  @CordovaInstance({sync: true})
  add(path: string|string[]): boolean {return; }

  /**
   * Checks if cache is dirty (needs a download)
   * @return {boolean} returns a boolean that indicates whether the cache is dirty
   */
  @CordovaInstance({sync: true})
  isDirty(): boolean {return; }

  /**
   * Downloads all the files that are added to cache
   * @param onProgress {Function} optional callback to be called on progress
   * @param includeFileProgress {Boolean} optional boolean to indicate whether you want progress for single files or the whole operation
   */
  @CordovaInstance({sync: true})
  download(onProgress?: (e: {queueIndex; queueSize; }) => {}, includeFileProgress?: boolean): Promise<any> {return; }

  /**
   * Gets the cached internal URL of the file
   * @param fileName {string} name of the file you would like to retrieve
   */
  @CordovaInstance({sync: true})
  get(fileName: string): string {return; }

  /**
   * Gets the cached internal URL of the file
   * @param fileNameOrUrl {string} name or URL of the file
   */
  @CordovaInstance({sync: true})
  toInternalUrl(fileNameOrUrl: string): string {return; }

  /**
   * Get the URL of a file
   * @param fileName {string} name of the file
   */
  @CordovaInstance({sync: true})
  toURL(fileName: string): string {return; }

  /**
   * Gets Base64 encoded data URL
   * @param filename {string} name of file
   */
  @CordovaInstance({sync: true})
  toDataUrl(filename: string): Promise<string> {return; }

  /**
   * Abort all downloads
   */
  @CordovaInstance({sync: true})
  abort(): void {}

  /**
   * Clear cache (removes localRoot directory)
   */
  @CordovaInstance({sync: true})
  clear(): Promise<any> {return; }

  /**
   * Remove a single file
   * @param filename {string} file name
   * @returns {Promise<any>} returns a promise that resolves when the file is removed
   */
  @CordovaInstance({sync: true})
  remove(filename: string): Promise<any> {return; }

  /**
   * Returns path on Cordova Filesystem. i.e: '/cache/photo3.jpg'
   * @param fileName
   */
  @CordovaInstance({sync: true})
  toPath(fileName: string): string {return; }

  /**
   * Returns server URL to download
   * @param fileName
   */
  @CordovaInstance({sync: true})
  toServerURL(fileName: string): Promise<any> {return; }

  /**
   * Returns a list of server URLs that need to be downloaded
   */
  @CordovaInstance({sync: true})
  getDownloadQueue(): Promise<string[]> {return; }

  /**
   * Returns a list of paths that are cached
   */
  @CordovaInstance({sync: true})
  list(): Promise<any> {return; }
}
export interface FileCacheOptions {
  /**
   * @private
   * Promise library to use, must create instance of CordovaPromiseFS and pass fs parameter.
   * No need to define this, Ionic Native takes care of it.
   */
  fs?: any;
  /**
   * hash or mirror
   */
  mode?: string;
  /**
   * Folder to store data
   * Defaults to data
   */
  localRoot?: string;
  /**
   * This is needed for mirror mode
   */
  serverRoot?: string;
  /**
   * Defaults to false, if set to true, it will prepend the urls with a timestamp to avoid network cache
   */
  cacheBuster?: boolean;
  /**
   * CordovaFS (Filesystem library) Options
   */
  fsOptions?: {
    /**
     * Storage size in bytes.
     * Defaults to 20MB
     */
    storageSize?: number;
    /**
     * Defaults to true
     */
    persistent?: boolean;
    /**
     * How many concurrent uploads/downloads
     * defaults to 3
     */
    concurrency?: number;
    /**
     * @private
     * Promise library.
     * Ionic native handles this.
     */
    Promise: any;
  };
}
