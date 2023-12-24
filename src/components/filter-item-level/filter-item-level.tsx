import { memo } from 'react';
import { LevelQuest } from '../../const/const';
import { ucFirst } from '../../utils/common';

type FilterItemLevelProps = {
  level: keyof typeof LevelQuest;
  nameLevel: string;
  onChangeLevel: (level: keyof typeof LevelQuest) => void;
  activeLevel: keyof typeof LevelQuest;
}

function FilterItemLevelComponent({onChangeLevel, level, nameLevel, activeLevel}: FilterItemLevelProps):JSX.Element {
  return(
    <li className="filter__item">
      <input type="radio" name="level" id={level} onChange={() => onChangeLevel(level)} checked={activeLevel === level}/>
      <label className="filter__label" htmlFor={level}><span className="filter__label-text">{ucFirst(nameLevel)}</span>
      </label>
    </li>
  );
}

const FilterItemLevel = memo(FilterItemLevelComponent);
export default FilterItemLevel;
