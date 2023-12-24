import { memo } from 'react';

function EmptyFilteredQuestsComponent(): JSX.Element {
  return(
    <p className="title title--size-m">По заданным фильтрам квестов нет, попробуйте выбрать другие.</p>
  );
}

const EmptyFilteredQuests = memo(EmptyFilteredQuestsComponent);
export default EmptyFilteredQuests;
