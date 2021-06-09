import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  getHeader(email) {
    return (
      <header>
        <span data-testid="email-field">
          Email:
          {' '}
          { email }
        </span>
        <p data-testid="total-field">Total: 0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }

  getValue() {
    return (
      <label htmlFor="expenses">
        Valor:
        <input type="number" id="expenses" name="expenses" />
      </label>);
  }

  getDescription() {
    return (
      <label htmlFor="description">
        Descrição:
        <input type="text" id="description" name="description" />
      </label>
    );
  }

  getCoins(coins) {
    return (
      <label htmlFor="coin">
        Moeda:
        <select id="coin">
          {coins.map((coin) => (
            <option value={ coin[0] } key={ coin }>
              {coin[0]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  getPayment() {
    return (
      <label htmlFor="payment">
        Método de pagamento:
        <select id="payment">
          <option value="cash">Dinheiro</option>
          <option value="credt">Cartão de crédito</option>
          <option value="debt">Cartão de débito</option>
        </select>
      </label>
    );
  }

  getTag() {
    return (
      <label htmlFor="tag">
        Tag:
        <select id="tag">
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { email, coins } = this.props;
    return (
      <>
        {this.getHeader(email)}
        <form>
          {this.getValue()}
          {this.getDescription()}
          {this.getCoins(coins)}
          {this.getPayment()}
          {this.getTag()}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coins: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
