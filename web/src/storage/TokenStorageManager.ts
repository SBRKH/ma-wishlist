import {StorageManager} from "./StorageManager";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

export class TokenManager {
  private storageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  setToken(token: string) {
    this.storageManager.store(TokenManager.TOKEN_KEY, token);
  }

  setRefreshToken(token: string) {
    this.storageManager.store(TokenManager.REFRESH_TOKEN_KEY, token);
  }


  existToken() {
    return this.storageManager.exist(TokenManager.TOKEN_KEY);
  }

  getToken() {
    return this.storageManager.get(TokenManager.TOKEN_KEY);
  }

  getRefreshToken() {
    return this.storageManager.get(TokenManager.REFRESH_TOKEN_KEY);
  }

  deleteToken() {
    this.storageManager.delete(TokenManager.TOKEN_KEY);
  }

  deleteRefreshToken() {
    this.storageManager.delete(TokenManager.REFRESH_TOKEN_KEY);
  }

  getBearerToken() {
    return "Bearer " + this.getToken();
  }

  static get TOKEN_KEY() {
    return TOKEN_KEY;
  }

  static get REFRESH_TOKEN_KEY() {
    return REFRESH_TOKEN_KEY;
  }
}
