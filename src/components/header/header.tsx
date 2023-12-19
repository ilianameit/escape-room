import { Link } from 'react-router-dom';
import { AppRoutes, currAuthorizationStatus } from '../../const/const';
import { checkAuthorizationStatus } from '../../utils/check-authorization-status/check-authorization-status';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const isLogged = checkAuthorizationStatus(currAuthorizationStatus);
  return(
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link not-disabled active" to={AppRoutes.Main}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoutes.Contacts}>Контакты</Link>
            </li>
            {
              isLogged ? (
                <li className="main-nav__item">
                  <Link className="link" to={AppRoutes.MyQuests}>Мои бронирования</Link>
                </li>
              ) : false
            }

          </ul>
        </nav>
        <div className="header__side-nav">
          {
            isLogged ?
              <a className="btn btn--accent header__side-item" href="#">Выйти</a>
              : <Link className="btn header__side-item header__login-btn" to={AppRoutes.Login}>Вход</Link>
          }
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
