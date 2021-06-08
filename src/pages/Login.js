import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // validateEmail = () => {
  //   const { email } = this.state;
  //   const validate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  //   document.getElementById('btn-enter').disabled = true;
  //   if (email.match(validate)) {
  //     document.getElementById('btn-enter').disabled = false;
  //   }
  // }

  render() {
    const { email, password } = this.state;
    const { emailValue } = this.props;
    // const PASSWORD_MIN = 6;
    // const emailValidate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    // capturar o botão
    return (
      <div>
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
        <button
          type="button"
          onClick={ () => emailValue({ email }) }
        >
          <Link to="/carteira">
            Entrar
          </Link>
        </button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailValue: (email) => (dispatch(userAction(email))),
});

Login.propTypes = {
  emailValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
