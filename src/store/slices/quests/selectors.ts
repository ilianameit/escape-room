import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getQuests = (state: State) => state[NameSpace.Quest].quests;

export const getQuestsLoading = (state: State) => state[NameSpace.Quest].isQuestsLoading;

export const getErrorQuests = (state: State) => state[NameSpace.Quest].hasErrorQuests;

export const getOneQuest = (state: State) => state[NameSpace.Quest].oneQuest;

export const getOneQuestLoading = (state: State) => state[NameSpace.Quest].isOneQuestLoading;

export const getErrorOneQuest = (state: State) => state[NameSpace.Quest].hasErrorOneQuest;
