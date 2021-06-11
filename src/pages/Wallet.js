import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletAction } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currecy: '',
      method: '',
      tag: '',
    };
  }

  getHeader(email) {
    const { getExpenses } = this.props;
    let count = 0;
    getExpenses.forEach((expense) => {
      count += ((expense.value) * expense.exchangeRates[expense.currecy].ask);
    });
    return (
      <header>
        <span data-testid="email-field">
          Email:
          {' '}
          { email }
        </span>
        <p data-testid="total-field">
          Total:
          { count }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }

  getValue() {
    const { value } = this.props;
    return (
      <label htmlFor="expenses">
        Valor:
        <input
          type="number"
          id="expenses"
          name="value"
          value={ value }
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
      </label>);
  }

  getDescription() {
    const { description } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          id="description"
          name="description"
          value={ description }
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
      </label>
    );
  }

  getCoins() {
    const { currency } = this.props;
    const { coins } = this.props;
    const currencies = Object.keys(coins).filter((coin) => coin !== 'USDT');
    return (
      <label htmlFor="coin">
        Moeda:
        <select
          id="coin"
          name="currency"
          value={ currency }
          onChange={ (e) => this.setState({ currecy: e.target.value }) }
        >
          {currencies.map((coin) => (
            <option value={ coin } key={ coin }>
              {coin}
            </option>
          ))}
        </select>
      </label>
    );
  }

  getPayment() {
    const { method } = this.props;
    return (
      <label htmlFor="payment">
        Método de pagamento:
        <select
          id="payment"
          name="method"
          value={ method }
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="cash">Dinheiro</option>
          <option value="credt">Cartão de crédito</option>
          <option value="debt">Cartão de débito</option>
        </select>
      </label>
    );
  }

  getTag() {
    const { tag } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          value={ tag }
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  getBtn() {
    const { id, value, description, currecy, method, tag } = this.state;
    const { addExpense } = this.props;
    return (
      <button
        type="button"
        onClick={ () => addExpense(
          { id, value, description, currecy, method, tag },
        ) }
      >
        Adicionar despesa
      </button>
    );
  }

  countId() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  render() {
    const { email } = this.props;
    return (
      <>
        {this.getHeader(email)}
        <form>
          {this.getValue()}
          {this.getDescription()}
          {this.getCoins()}
          {this.getPayment()}
          {this.getTag()}
          {this.getBtn()}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coins: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(walletAction(value)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
