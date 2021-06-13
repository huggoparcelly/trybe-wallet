import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, walletAction } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  getHeader(email) {
    const { getExpenses } = this.props;
    let count = 0;
    getExpenses.forEach((expense) => {
      count += (expense.value * expense.exchangeRates[expense.currency].ask);
    });
    return (
      <header>
        <span data-testid="email-field">{ `Email: ${email}` }</span>
        <p data-testid="total-field">{ `Total: ${Number(count).toFixed(2)}` }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }

  getValue() {
    const { value } = this.state;
    return (
      <label htmlFor="expenses">
        Valor:
        <input
          type="number"
          id="expenses"
          name="value"
          value={ value }
          onChange={ (e) => this.handleChange(e) }
        />
      </label>);
  }

  getDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          id="description"
          name="description"
          value={ description }
          onChange={ (e) => this.handleChange(e) }
        />
      </label>
    );
  }

  getCoins() {
    const { currency } = this.state;
    const { coins } = this.props;
    const currencies = Object.keys(coins).filter((coin) => coin !== 'USDT');
    return (
      <label htmlFor="coin">
        Moeda:
        <select
          id="coin"
          name="currency"
          value={ currency }
          onChange={ (e) => this.handleChange(e) }
        >
          {currencies.map((coin) => (
            <option value={ coin } key={ coin }>{coin}</option>
          ))}
        </select>
      </label>
    );
  }

  getPayment() {
    const { method } = this.state;
    return (
      <label htmlFor="payment">
        Método de pagamento:
        <select
          id="payment"
          name="method"
          value={ method }
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  getTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          value={ tag }
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  getBtn() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    return (
      <button
        type="button"
        onClick={ () => {
          addExpense({ id, value, description, currency, method, tag });
          this.countId();
        } }
      >
        Adicionar despesa
      </button>
    );
  }

  getTable() {
    const { getExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { getExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td key={ expense.description }>{expense.description}</td>
              <td key={ expense.tag }>{expense.tag}</td>
              <td key={ expense.method }>{expense.method}</td>
              <td key={ expense.value }>{expense.value}</td>
              <td key={ expense.currency }>
                { expense.exchangeRates[expense.currency].name.split('/')[0] }
              </td>
              <td key="Price">
                { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
              </td>
              <td key="converted value">
                { Number((expense.value)
                  * (expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              <td key="BRL">Real</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
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
        {this.getTable()}
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
  getCoins: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
