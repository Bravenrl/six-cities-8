import { ChangeEvent, FormEvent, useRef } from 'react';
import {  useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, Cities, rePassword, SortType } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';
import { changeCity, changeSorting } from '../../store/action';
import { loginAction } from '../../store/api-action';
import HeaderLogo from '../header-logo/header-logo';


function LoginPage(): JSX.Element {
  const dispatch = useDispatch();
  const cities = [...Cities.keys()];
  const cityName = cities[Math.floor(Math.random() * cities.length)];
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      const user = {
        email: loginRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(loginAction(user));
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (!rePassword.test(evt.target.value)) {
      evt.target.setCustomValidity('Password is not valid');
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  };

  const handleonCityClick = (): void => {
    dispatch(changeCity(cityName));
    dispatch(changeSorting(SortType.Popular));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} onClick={handleonCityClick} className="locations__item-link" href="#todo">
                <span>{cityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
export default withPreloader(LoginPage);
