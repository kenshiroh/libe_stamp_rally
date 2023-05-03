import { defineStore } from "pinia";
import { Group } from "~/types";
import { STAMP_SETTING } from "~/constants/stamps";
import _ from "lodash";

type State = {
  groups: Group[];
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
  },
});
