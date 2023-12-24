import { createSlice } from '@reduxjs/toolkit';
import { QuestPreview } from '../../../types/quest-preview';
import { NameSpace } from '../../../const/const';
import { fetchOneQuestAction, fetchQuestsAction } from '../../api-actions';
import { Quest } from '../../../types/quest';

type QuestsStateType = {
  quests: QuestPreview[];
  isQuestsLoading: boolean;
  hasErrorQuests: boolean;
  oneQuest: Quest | null;
  isOneQuestLoading: boolean;
  hasErrorOneQuest: boolean;
}

const initialState: QuestsStateType = {
  quests: [],
  isQuestsLoading: false,
  hasErrorQuests: false,
  oneQuest: null,
  isOneQuestLoading: false,
  hasErrorOneQuest: false,
};

export const questsSlice = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {
    dropQuest: (state) => {
      state.oneQuest = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
        state.hasErrorQuests = true;
      })
      .addCase(fetchOneQuestAction.fulfilled, (state, action) => {
        state.isOneQuestLoading = false;
        state.oneQuest = action.payload;
      })
      .addCase(fetchOneQuestAction.rejected, (state) => {
        state.isOneQuestLoading = false;
        state.hasErrorOneQuest = true;
      })
      .addCase(fetchOneQuestAction.pending, (state) => {
        state.isOneQuestLoading = true;
      });
  },
});
export const {dropQuest} = questsSlice.actions;
