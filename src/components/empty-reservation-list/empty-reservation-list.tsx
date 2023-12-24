import { memo } from 'react';

function EmptyReservationListComponent(): JSX.Element {
  return (
    <p>Вы ещё не забронировали ни одного квеста</p>
  );
}

const EmptyReservationList = memo(EmptyReservationListComponent);
export default EmptyReservationList;
