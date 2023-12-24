import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import React, { memo } from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import { useAppDispatch } from '../../hooks';
import { fetchQuestsAction } from '../../store/api-actions';

function ErrorQuestsScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room: Ошибка загрузки</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className='container container--size-s'>
            <p className="title title--size-m title--uppercase page-content__title">Не удалось загрузить квесты</p>
            <button
              onClick={() => {
                dispatch(fetchQuestsAction);
              }}
              className="btn btn--cta"
              type="button"
            >
              Попробовать ещё раз
            </button>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

const ErrorQuestsScreen = memo(ErrorQuestsScreenComponent);
export default ErrorQuestsScreen;
