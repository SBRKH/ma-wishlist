export enum StorageManagerTypeEnum {
  SESSION,
  LOCAL
}

export class StorageManager {
  private type;

  constructor(type = StorageManagerTypeEnum.LOCAL) {
    this.type = type;
  }

  getStorage() {
      return this.type === StorageManagerTypeEnum.LOCAL ? window.localStorage : window.sessionStorage;
  }

  store(key: string, item: any) {
    this.getStorage().setItem(key, item);
  }

  storeObject(key: string, item: any) {
    this.getStorage().setItem(key, JSON.stringify(item));
  }

  delete(key: string) {
    this.getStorage().removeItem(key);
  }

  get(key: string) {
    return this.getStorage().getItem(key);
  }

  exist(key: string) {
    return !!this.get(key);
  }

  getJson(key: string) {
    try {
      return JSON.parse(this.get(key)!);
    } catch (e) {}
    return null;
  }
}
