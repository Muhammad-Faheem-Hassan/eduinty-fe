// utils/sessionService.js
import LocalStorageService from "./localStorage.js";

const SESSION_KEY = "users";

class SessionService {
  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  setLogin(info) {
    this.localStorageService.save(SESSION_KEY, info);
  }

  getLoggedIn() {
    return this.localStorageService.get(SESSION_KEY);
  }

  isAuthenticated() {
    const data = this.getLoggedIn();
    return data !== null && !!data.access_token;
  }

  logout() {
    this.localStorageService.remove(SESSION_KEY);
  }
}

export default new SessionService();
