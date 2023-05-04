import { RepositoryBase } from "./RepositoryBase";

/**
 * Stampの取得履歴を管理する
 */
export class StampRepository extends RepositoryBase {
  static markStampCollected(stampId: number) {
    const now = new Date();
    const data = this.load("stampCollected");
    if (data) {
      data[stampId] = now;
      this.save("stampCollected", data);
    } else {
      this.save("stampCollected", { [stampId]: now });
    }
    return now;
  }

  static markStampNotCollected(stampId: number) {
    const data = this.load("stampCollected");
    if (data) {
      data[stampId] = false;
      this.save("stampCollected", data);
    } else {
      this.save("stampCollected", { [stampId]: false });
    }
  }

  static resetStampCollected() {
    this.save("stampCollected", {});
  }

  static getStampCollected(stampId: number) {
    const data = this.load("stampCollected");
    if (data) {
      return data[stampId];
    }
    return false;
  }
}
