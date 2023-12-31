import { memo } from 'react';
import { LevelQuest, definitionLevels } from '../../const/const';
import FilterItemLevel from '../filter-item-level/filter-item-level';

type FilterListLevelsProps = {
  onChangeLevel: (type: keyof typeof LevelQuest) => void;
  activeLevel: keyof typeof LevelQuest;
}

function FilterListLevelsComponent({onChangeLevel, activeLevel}: FilterListLevelsProps): JSX.Element {
  return(
    <ul className="filter__list">
      {
        Object.entries(definitionLevels).map(([level, nameLevel]) => (
          <FilterItemLevel key={level} onChangeLevel={onChangeLevel} level={level as keyof typeof LevelQuest} nameLevel={nameLevel} activeLevel={activeLevel}/>
        ))
      }
    </ul>
  );
}

const FilterListLevels = memo(FilterListLevelsComponent);
export default FilterListLevels;
