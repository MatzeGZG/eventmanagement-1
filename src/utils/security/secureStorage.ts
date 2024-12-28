import { DataEncryption } from './encryption';

export class SecureStorage {
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const encryptedValue = await DataEncryption.encrypt(serializedValue);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('SecureStorage.setItem error:', error);
      throw new Error('Failed to securely store data');
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      const decryptedValue = await DataEncryption.decrypt(encryptedValue);
      return JSON.parse(decryptedValue) as T;
    } catch (error) {
      console.error('SecureStorage.getItem error:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('SecureStorage.removeItem error:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('SecureStorage.clear error:', error);
    }
  }
}