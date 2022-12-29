import {StorageManager} from "./StorageManager";

const USER_KEY = "user";

export class UserManager {
  private storageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  setUser(user: any) {
    if (typeof user === "object") {
      user = JSON.stringify(user);
    }
    this.storageManager.store(UserManager.USER_KEY, user);
  }

  getUser() {
    const value = this.storageManager.get(UserManager.USER_KEY);
    return value ? JSON.parse(value) : null;
  }

  deleteUser() {
    this.storageManager.delete(UserManager.USER_KEY);
  }

  static get USER_KEY() {
    return USER_KEY;
  }
}
