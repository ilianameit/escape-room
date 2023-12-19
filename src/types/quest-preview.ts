import { LevelQuest, TypeQuest } from '../const/const';

export type QuestPreview = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: keyof typeof LevelQuest;
  type: keyof typeof TypeQuest;
  peopleMinMax: [number, number];
}
