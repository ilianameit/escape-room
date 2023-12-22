import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';

function Logo(): JSX.Element {
  return(
    <Link className="logo header__logo" to={AppRoutes.Main} aria-label="Перейти на Главную">
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </Link>
  );
}

export default Logo;
