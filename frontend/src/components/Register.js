import Header from "./Header"
import { Link, useHistory } from "react-router-dom"
import { useState }  from 'react';

const Register = ({handleRegister, waiting}) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const history = useHistory()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data
    handleRegister(email, password)
  }

  return (
    <>
    <Header
      buttonText="Войти"
      mailHandler=""
      linkHandler={() => history.push('/sign-in')}
      buttonClass=""
    />
    <section className="register">
      <h2 className="popup__title register__title">Регистрация</h2>
      <form className="popup__form register__form" onSubmit={handleSubmit}>
          <input
            required
            name="email"
            type="email"
            className="register__input register__input_type_email"
            placeholder="Email"
            minLength="5"
            maxLength="40"
            value={data.email}
            onChange={handleChange}
          />
          <input
            required
            name="password"
            type="password"
            className=" register__input register__input_type_password"
            placeholder="Пароль"
            minLength="1"
            maxLength="40"
            value={data.password}
            onChange={handleChange}
          />
        <button type="submit" className="popup__save register__button" aria-label={waiting || 'Зарегистрироваться'}>{waiting || 'Зарегистрироваться'}</button>
      </form>
      <div className="register__login">
        <p className="register__login_text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="register__link" aria-label='Войти'>Войти</Link>
      </div>
    </section>
    </>
  )
}

export default Register
