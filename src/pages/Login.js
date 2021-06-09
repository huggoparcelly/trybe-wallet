import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAPI, userAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const PASSWORD_MIN = 6;
    this.state = {
      email: '',
      password: '',
      passwordLength: PASSWORD_MIN,
    };
  }

  render() {
    const { email, password, passwordLength } = this.state;
    const { emailValue, getCoins } = this.props;
    const emailValidate = (
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    );
    const disabled = (password.length < passwordLength) || (!email.match(emailValidate));
    return (
      <form>
        <input
          type="email"
          placeholder="Email"
          value={ email }
          data-testid="email-input"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />

        <input
          type="password"
          placeholder="Senha"
          value={ password }
          data-testid="password-input"
          onChange={ (e) => this.setState({ password: e.target.value }) }
        />
        <Link to="/carteira">
          <button
            type="submit"
            disabled={ disabled }
            onClick={ () => {
              emailValue({ email });
              getCoins();
            } }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailValue: (email) => (dispatch(userAction(email))),
  getCoins: () => dispatch(fetchAPI()),
});

Login.propTypes = {
  emailValue: PropTypes.func.isRequired,
  getCoins: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
