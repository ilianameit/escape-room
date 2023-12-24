import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';

function NotFoundScreenComponent():JSX.Element {
  return(
    <div className="wrapper">
      <Helmet>
        <title>Can`t found: 404</title>
      </Helmet>
      <Header />
      <main className="decorated-page quest-page">
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">Страница не найдена</h1>
          </div>

          <Link className="link link--underlined" to={AppRoutes.Main}>На главную</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const NotFoundScreen = memo(NotFoundScreenComponent);
export default NotFoundScreen;

