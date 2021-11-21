import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function HeaderLogo () : JSX.Element {
  return (

    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Root}>
        <img className="header__logo" src="/1781597-six-cities-8/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}

export {HeaderLogo};
export default memo(HeaderLogo);
