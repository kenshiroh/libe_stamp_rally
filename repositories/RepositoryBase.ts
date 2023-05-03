/**
 * localStorageに値を保存したり取得したりするラッパークラス
 */
export class RepositoryBase {
  static save(key: string, data: object) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
  static load(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}
