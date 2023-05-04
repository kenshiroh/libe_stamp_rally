import { defineStore } from "pinia";
import { Group } from "~/types";
import { STAMP_SETTING } from "~/constants/stamps";
import _ from "lodash";
import { StampRepository } from "~/repositories/StampRepository";
import { PrizeRepository } from "~/repositories/PrizeRepository";

type State = {
  groups: Group[];
};

const getStamps = (groups: Group[]) => {
  return groups.map((group) => group.stamps).flat();
};

const isAllStampInGroupCollected = (group: Group) => {
  if (group) {
    return group.stamps.every((stamp) => stamp.collectedTime);
  }
  return false;
};

const latestStampCollectedTime = (group: Group) => {
  const stamps = group.stamps.filter((stamp) => stamp.collectedTime);
  const collectedTimeList = stamps.map((stamp) => stamp.collectedTime);
  const latestCollectedTime = _.max(collectedTimeList);
  return latestCollectedTime;
};

export const useGroupStore = defineStore("group", {
  state: (): State => ({
    groups: _.cloneDeep(STAMP_SETTING),
  }),
  getters: {
    getGroupsOrderByStampCollectedTime: (state: State) => {
      const result = state.groups.slice();
      return result.sort((a, b) => {
        const aLatestCollectedTime = latestStampCollectedTime(a);
        const bLatestCollectedTime = latestStampCollectedTime(b);
        if (aLatestCollectedTime && bLatestCollectedTime) {
          return aLatestCollectedTime > bLatestCollectedTime ? -1 : 1;
        }
        if (aLatestCollectedTime) {
          return -1;
        }
        if (bLatestCollectedTime) {
          return 1;
        }
        return 0;
      });
    },
    getGroupById: (state: State) => (groupId: number) => {
      return state.groups.find((group) => group.id === groupId);
    },
    getStampById: (state: State) => (stampId: number) => {
      return state.groups
        .map((group) => group.stamps)
        .flat()
        .find((stamp) => stamp.id === stampId);
    },
    getStamps: (state: State) => {
      return getStamps(state.groups);
    },
    isAllStampInGroupCollected: (state: State) => (groupId: number) => {
      const group = state.groups.find((group) => group.id === groupId);
      return group && isAllStampInGroupCollected(group);
    },
    isPrizeCollectable: (state: State) => (groupId: number) => {
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        return isAllStampInGroupCollected(group) && !group.collectedTime;
      }
      return false;
    },
  },
  actions: {
    loadData() {
      this.groups = _.cloneDeep(STAMP_SETTING);
      const stamps = getStamps(this.groups);
      stamps.forEach((stamp) => {
        stamp.collectedTime = StampRepository.getStampCollected(stamp.id);
      });
      this.groups.forEach((group) => {
        group.collectedTime = PrizeRepository.getPrizeCollected(group.id);
      });
    },
    resetAllStamps() {
      StampRepository.resetStampCollected();
      this.loadData();
    },
    setStampCollected(id: number) {
      const stamp = getStamps(this.groups).find((stamp) => stamp.id === id);
      if (stamp) {
        stamp.collectedTime = StampRepository.markStampCollected(id);
      }
    },
    toggleStampCollected(id: number) {
      const stamp = getStamps(this.groups).find((stamp) => stamp.id === id);
      if (stamp) {
        if (stamp.collectedTime) {
          StampRepository.markStampNotCollected(id);
          stamp.collectedTime = undefined;
        } else {
          stamp.collectedTime = StampRepository.markStampCollected(id);
        }
      }
    },
    resetAllPrizes() {
      PrizeRepository.resetPrizeCollected();
      this.loadData();
    },
    setPrizeCollected(id: number) {
      const group = this.groups.find((group) => group.id === id);
      if (group) {
        group.collectedTime = PrizeRepository.markPrizeCollected(id);
      }
    },
    togglePrizeCollected(id: number) {
      const group = this.groups.find((group) => group.id === id);
      if (group) {
        if (group.collectedTime) {
          PrizeRepository.markPrizeNotCollected(id);
          group.collectedTime = undefined;
        } else {
          group.collectedTime = PrizeRepository.markPrizeCollected(id);
        }
      }
    },
  },
});
