import { TypeQuest } from '../../const/const';

type FilterItemTypeProps = {
  filterType: keyof typeof TypeQuest;
  filterName: string;
  imgValue: {
    width: number;
    height: number;
  };
  onChangeType: (level: keyof typeof TypeQuest) => void;
  activeType: keyof typeof TypeQuest;
}

function FilterItemType({filterType, filterName, imgValue, onChangeType, activeType}: FilterItemTypeProps): JSX.Element {
  const iconType = () => {
    if(filterType === 'all') {
      return `${filterType}-quests`;
    }
    if (filterType === 'adventures') {
      return 'adventure';
    }
    return filterType;
  };
  return(
    <li className="filter__item">
      <input type="radio" name="type" id={filterType} onChange={() => onChangeType(filterType)} checked={activeType === filterType}/>
      <label className="filter__label" htmlFor={filterType}>
        <svg className="filter__icon" width={imgValue.width} height={imgValue.height} aria-hidden="true">
          <use xlinkHref={
            `#icon-${iconType()}`
          }
          >
          </use>
        </svg><span className="filter__label-text">{filterName}</span>
      </label>
    </li>
  );
}

export default FilterItemType;
