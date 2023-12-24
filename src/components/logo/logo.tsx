import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';

function LogoComponent(): JSX.Element {
  return(
    <Link className="logo header__logo" to={AppRoutes.Main} aria-label="Перейти на Главную">
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </Link>
  );
}

const Logo = memo(LogoComponent);
export default Logo;
