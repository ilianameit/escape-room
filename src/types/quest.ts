import { QuestPreview } from './quest-preview';

export type Quest = QuestPreview & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}
