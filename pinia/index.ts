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

export const useGroupStore = defineStore("group", {
  state: (): State => ({
    groups: _.cloneDeep(STAMP_SETTING),
  }),
  getters: {
    getGroupById: (state: State) => (id: number) => {
      return state.groups.find((group) => group.id === id);
    },
    getStampById: (state: State) => (id: number) => {
      return state.groups
        .map((group) => group.stamps)
        .flat()
        .find((stamp) => stamp.id === id);
    },
    getStamps: (state: State) => {
      return getStamps(state.groups);
    },
    isPrizeCollectable: (state: State) => (id: number) => {
      const group = state.groups.find((group) => group.id === id);
      if (group) {
        const allStampCollected = group.stamps.every(
          (stamp) => stamp.isCollected
        );
        return allStampCollected && !group.isPrizeCollected;
      }
      return false;
    },
  },
  actions: {
    loadData() {
      this.groups = _.cloneDeep(STAMP_SETTING);
      const stamps = getStamps(this.groups);
      stamps.forEach((stamp) => {
        stamp.isCollected = StampRepository.getStampCollected(stamp.id);
      });
      this.groups.forEach((group) => {
        group.isPrizeCollected = PrizeRepository.getPrizeCollected(group.id);
      });
    },
    resetAllStamps() {
      StampRepository.resetStampCollected();
      this.loadData();
    },
    setStampCollected(id: number) {
      const stamp = getStamps(this.groups).find((stamp) => stamp.id === id);
      if (stamp) {
        StampRepository.markStampCollected(id);
        stamp.isCollected = true;
      }
    },
    toggleStampCollected(id: number) {
      const stamp = getStamps(this.groups).find((stamp) => stamp.id === id);
      if (stamp) {
        if (stamp.isCollected) {
          StampRepository.markStampNotCollected(id);
          stamp.isCollected = false;
        } else {
          StampRepository.markStampCollected(id);
          stamp.isCollected = true;
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
        PrizeRepository.markPrizeCollected(id);
        group.isPrizeCollected = true;
      }
    },
    togglePrizeCollected(id: number) {
      const group = this.groups.find((group) => group.id === id);
      if (group) {
        if (group.isPrizeCollected) {
          PrizeRepository.markPrizeNotCollected(id);
          group.isPrizeCollected = false;
        } else {
          PrizeRepository.markPrizeCollected(id);
          group.isPrizeCollected = true;
        }
      }
    },
  },
});
