import React, { useState } from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import QuestList from '../../components/quest-list/quest-list';
import FilterListTypes from '../../components/filter-list-types/filter-list-types';
import FilterListLevels from '../../components/filter-list-levels/filter-list-levels';
import { LevelQuest, TypeQuest } from '../../const/const';
import EmptyFilteredQuests from '../../components/empty-filtered-quests/empty-filtered-quests';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getQuests } from '../../store/slices/quests/selectors';

// type MainProps = {

// }

function MainScreen(): JSX.Element {
  //const dispatch = useAppDispatch();
  const quests = useAppSelector(getQuests);

  const [activeFilterTypeItem, setActiveFilterTypeItem] = useState<keyof typeof TypeQuest>('all');

  const [activeFilterLevelItem, setActiveFilterLevelItem] = useState<keyof typeof LevelQuest>('any');

  function handleFilterTypeChange(type: keyof typeof TypeQuest) {
    setActiveFilterTypeItem(type);
  }

  function handleFilterLevelChange(type: keyof typeof LevelQuest) {
    setActiveFilterLevelItem(type);
  }

  let filteredQuests = quests;

  if(activeFilterTypeItem !== 'all' && activeFilterLevelItem !== 'any') {
    filteredQuests = quests.filter((quest) => quest.type === activeFilterTypeItem && quest.level === activeFilterLevelItem);
  } else if(activeFilterTypeItem === 'all' && activeFilterLevelItem !== 'any') {
    filteredQuests = quests.filter((quest) => quest.level === activeFilterLevelItem);
  } else if(activeFilterTypeItem !== 'all' && activeFilterLevelItem === 'any') {
    filteredQuests = quests.filter((quest) => quest.type === activeFilterTypeItem);
  }

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге</h1>
              <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
            </div>
            <div className="page-content__item">
              <form className="filter" action="#" method="get">
                <fieldset className="filter__section">
                  <legend className="visually-hidden">Тематика</legend>
                  <FilterListTypes onChangeType={handleFilterTypeChange} activeType={activeFilterTypeItem}/>
                </fieldset>
                <fieldset className="filter__section">
                  <legend className="visually-hidden">Сложность</legend>
                  <FilterListLevels onChangeLevel={handleFilterLevelChange} activeLevel={activeFilterLevelItem}/>
                </fieldset>
              </form>
            </div>
            <h2 className="title visually-hidden">Выберите квест</h2>
            {filteredQuests.length > 0 ? <QuestList quests={filteredQuests}/> : <EmptyFilteredQuests />}
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainScreen;
