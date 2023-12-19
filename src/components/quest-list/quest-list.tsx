import { QuestPreview } from '../../types/quest-preview';
import QuestCard from '../quest-card/quest-card';

type QuestListProps = {
  quests: QuestPreview[];
}

function QuestList({quests}: QuestListProps): JSX.Element {
  return(
    <div className="cards-grid">
      {
        quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest}/>
        ))
      }
    </div>
  );
}

export default QuestList;
