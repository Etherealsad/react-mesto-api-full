import Header from "./Header"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ handleLogin, waiting }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
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
    const { email, password } = data;
    handleLogin(email, password);
  }

  return (
    <>
    <Header
      buttonText="Регистрация"
      mailHandler=""
      linkHandler={() => history.push('/sign-up')}
      buttonClass=""
    />
    <section className="register">
      <h2 className="popup__title register__title">Вход</h2>
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
        <button type="submit" className="popup__save register__button register__button_sign" aria-label={waiting || 'Войти'}>{waiting || 'Войти'}</button>
      </form>
    </section>
    </>
  )
}

export default Login
