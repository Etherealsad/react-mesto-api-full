import {Link} from "react-router-dom"

function Header({buttonText, linkHandler, buttonClass, mailHandler}) {
  return (
  <header className="header">
    <Link className="header__logo" to="/" />
    <div className="header__info">
      <p className="header__mail">{mailHandler}</p>
      <button className={`header__button ${buttonClass}`} onClick={linkHandler}>{buttonText}</button>
    </div>
  </header>
  )
}

export default Header