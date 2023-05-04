import { RepositoryBase } from "./RepositoryBase";

/**
 * 景品の取得履歴を管理する
 */
export class PrizeRepository extends RepositoryBase {
  static markPrizeCollected(groupId: number) {
    const now = new Date();
    const data = this.load("prizeCollected");
    if (data) {
      data[groupId] = true;
      this.save("prizeCollected", data);
    } else {
      this.save("prizeCollected", { [groupId]: now });
    }
    return now;
  }

  static markPrizeNotCollected(groupId: number) {
    const data = this.load("prizeCollected");
    if (data) {
      data[groupId] = false;
      this.save("prizeCollected", data);
    } else {
      this.save("prizeCollected", { [groupId]: false });
    }
  }

  static resetPrizeCollected() {
    this.save("prizeCollected", {});
  }

  static getPrizeCollected(groupId: number) {
    const data = this.load("prizeCollected");
    if (data) {
      return data[groupId];
    }
    return false;
  }
}
