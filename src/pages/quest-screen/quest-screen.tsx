import React from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { quests } from '../../mocks/quests';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoutes, definitionLevels, definitionTypes } from '../../const/const';


function QuestScreen(): JSX.Element {
  const {id} = useParams();
  const quest = quests.find((item) => item.id === id);

  if(!quest) {
    return <NotFoundScreen />;
  }

  const { title, type, level, peopleMinMax, description, coverImg, coverImgWebp } = quest;
  const [peopleMin, peopleMax] = peopleMinMax;

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room: {title}</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="decorated-page quest-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
              />
              <img
                src={coverImg}
                srcSet={`${coverImg} 2x`}
                width={1366}
                height={768}
                alt={title}
              />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="quest-page__content">
              <h1 className="title title--size-l title--uppercase quest-page__title">
                {title}
              </h1>
              <p className="subtitle quest-page__subtitle">
                <span className="visually-hidden">Жанр:</span>
                {definitionTypes[type]}
              </p>
              <ul className="tags tags--size-l quest-page__tags">
                <li className="tags__item">
                  <svg width={11} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>
                  {peopleMin}
                  &ndash;
                  {peopleMax}
                  &nbsp;
                  чел
                </li>
                <li className="tags__item">
                  <svg width={14} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>
                  {definitionLevels[level]}
                </li>
              </ul>
              <p className="quest-page__description">
                {description}
              </p>
              <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoutes.Booking}>Забронировать</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default QuestScreen;
