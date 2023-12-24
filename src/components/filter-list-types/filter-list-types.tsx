import { memo } from 'react';
import { TypeQuest, definitionTypes } from '../../const/const';
import FilterItemType from '../filter-item-type/filter-item-type';

type FilterListTypesProps = {
  onChangeType: (type: keyof typeof TypeQuest) => void;
  activeType: keyof typeof TypeQuest;
}

function FilterListTypesComponent({onChangeType, activeType}: FilterListTypesProps): JSX.Element {
  return(
    <ul className="filter__list">
      {
        Object.entries(definitionTypes).map(([type, {def, img}]) => (
          <FilterItemType key={type} onChangeType={onChangeType} activeType={activeType} filterType={type as keyof typeof TypeQuest} filterName={def} imgValue={img}/>
        ))
      }
    </ul>
  );
}

const FilterListTypes = memo(FilterListTypesComponent);
export default FilterListTypes;
