import { STORAGE_KEYS } from "../config/constants.js";

export const storage = {
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  },
  
  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
  
  savePlayer(userId, zoneId) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(STORAGE_KEYS.ZONE_ID, zoneId);
  },
  
  getSavedPlayer() {
    return {
      userId: localStorage.getItem(STORAGE_KEYS.USER_ID),
      zoneId: localStorage.getItem(STORAGE_KEYS.ZONE_ID)
    };
  }
};
