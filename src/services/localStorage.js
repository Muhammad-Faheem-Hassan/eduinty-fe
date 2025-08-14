// utils/localStorage.js
export default class LocalStorageService {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}
