import Logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={Logo} alt="Логотип Россия" />
        <Routes>
          <Route
            path="/"
            element={
              <div className="profile__post">
                {props.userEmail}
                <Link
                  to="/sign-in"
                  className="header__enter"
                  onClick={props.handleUserLeave}
                >
                  Выйти
                </Link>
              </div>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__enter">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__enter">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
