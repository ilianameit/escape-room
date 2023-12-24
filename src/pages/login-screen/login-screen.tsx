import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthErrorStatus, getAuthProcessStatus, getAuthorizationStatus } from '../../store/slices/user/selectors';
import { checkAuthorizationStatus } from '../../utils/check-authorization-status/check-authorization-status';
import { useForm } from 'react-hook-form';
import { UserData } from '../../types/user-data';
import { loginAction } from '../../store/api-actions';
import styles from './style.module.css';
import ErrorSending from '../../components/error-sending/error-sending';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const/const';

type LocationState = {
  from: {
    pathname: string;
  };
}

function LoginScreenComponent():JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state as LocationState || { from: { pathname: AppRoutes.Main } };
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasError = useAppSelector(getAuthErrorStatus);
  const isAuthProcess = useAppSelector(getAuthProcessStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const { register, handleSubmit, formState: {
    errors,
    isValid
  }, } = useForm<UserData & {['user-agreement']: boolean}>({
    mode: 'onBlur'
  });

  const [formData, setFormData] = useState<UserData>({
    email: '',
    password: '',
  });

  const handleFormSubmit = () => {
    dispatch(loginAction({
      email: formData.email,
      password: formData.password
    }));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isLogged) {
      navigate(from);
    }
  }, [isLogged, navigate, from]);

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room: Авторизация</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
              <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="login__form">
              <form
                className="login-form"
                action="https://echo.htmlacademy.ru/"
                method="post"
                onSubmit={(event) =>
                  void handleSubmit(handleFormSubmit)(event)}
              >
                <div className="login-form__inner-wrapper">
                  <h1 className="title title--size-s login-form__title">Вход</h1>
                  <div className="login-form__inputs">
                    <div className="custom-input login-form__input">
                      <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                      <input
                        value={formData.email}
                        type="email"
                        id="email"
                        placeholder="Адрес электронной почты"
                        {...register('email', {
                          required: 'Укажите email',
                          pattern: {
                            value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w+)$/,
                            message: 'Введите корректный email'
                          }
                        })}
                        onChange={onInputChange}
                      />
                      {errors.email && <span className={styles.alert}>{errors.email?.message}</span>}
                    </div>
                    <div className="custom-input login-form__input">
                      <label className="custom-input__label" htmlFor="password">Пароль</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        {...register('password', {
                          required: 'Введите пароль',
                          pattern: {
                            value: /(?=^.{3,15}$)(?=.*\d)(?=.*[a-z]).*/,
                            message: 'Введите корректный пароль от 3 до 15 символов'
                          }
                        })}
                        onChange={onInputChange}
                      />
                      {errors.password && <span className={styles.alert}>{errors.password?.message}</span>}
                      {hasError && <ErrorSending />}
                    </div>
                  </div>
                  <button
                    className="btn btn--accent btn--general login-form__submit"
                    type="submit"
                    disabled={!isValid || isAuthProcess}
                  >
                    Войти
                  </button>
                </div>
                <label className="custom-checkbox login-form__checkbox">
                  <input
                    type="checkbox"
                    id="id-order-agreement"
                    {...register('user-agreement', {
                      required: true
                    }
                    )}
                  />
                  <span className="custom-checkbox__icon">
                    <svg width="20" height="17" aria-hidden="true">
                      <use xlinkHref="#icon-tick"></use>
                    </svg>
                  </span>
                  <span className="custom-checkbox__label">Я&nbsp;согласен с
                    <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
                  &nbsp;и пользовательским соглашением
                  </span>
                </label>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

const LoginScreen = memo(LoginScreenComponent);
export default LoginScreen;
