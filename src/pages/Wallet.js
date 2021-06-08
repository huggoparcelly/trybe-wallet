import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">
            { email }
          </span>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="expenses">
            Valor:
            <input type="number" id="expenses" name="expenses" />
          </label>
          <label htmlFor="description">
            Descrição:
            <input type="text" id="description" name="description" />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select id="coin"> </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select id="payment">
              <option value="cash">Dinheiro</option>
              <option value="credt">Cartão de crédito</option>
              <option value="debt">Cartão de débito</option>
            </select>
          </label>
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
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
