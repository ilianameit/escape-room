import { QuestPreview } from '../../types/quest-preview';
import { Reservation } from '../../types/reservation';
import QuestCard from '../quest-card/quest-card';

type QuestListProps = {
  quests?: QuestPreview[];
  reservations?: Reservation[];
  onCancelReserveClick?: (id: Reservation['id']) => void;
}

function QuestList({quests, reservations, onCancelReserveClick}: QuestListProps): JSX.Element {
  return(
    <div className="cards-grid">
      {
        !reservations ? quests?.map((quest) => (
          <QuestCard key={quest?.id} quest={quest}/>
        )) : reservations.map((reservation) => (
          <QuestCard key={reservation.id} quest={reservation.quest} reservation={reservation} onCancelReserveClick={onCancelReserveClick}/>
        ))
      }
    </div>
  );
}

export default QuestList;
