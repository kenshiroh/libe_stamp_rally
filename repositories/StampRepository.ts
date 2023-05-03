import { RepositoryBase } from "./RepositoryBase";

/**
 * Stampの取得履歴を管理する
 */
export class StampRepository extends RepositoryBase {
  static markStampAcquired(stampId: number) {
    const data = this.load("stampAcquired");
    if (data) {
      data[stampId] = true;
      this.save("stampAcquired", data);
    } else {
      this.save("stampAcquired", { [stampId]: true });
    }
  }

  static getStampAcquired(stampId: number) {
    const data = this.load("stampAcquired");
    if (data) {
      return data[stampId];
    }
    return false;
  }
}
