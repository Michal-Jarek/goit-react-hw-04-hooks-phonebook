import PropTypes from 'prop-types';
import { Component } from 'react';

import scss from './SignForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class SignForm extends Component {
  state = { ...INITIAL_STATE };

  // ************ Methods *****************
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({ ...this.state });
    this.reset();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  // ************ End Methods *****************

  render() {
    const { name, number } = this.state;

    return (
      <form className={scss.form} onSubmit={this.handleSubmit}>
        <label className={scss.label}>
          Name:
          <input
            className={scss.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleChange}
            value={name}
            required
          />
        </label>
        <label className={scss.label}>
          Number:
          <input
            className={scss.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
            value={number}
            required
          />
        </label>
        <button className={scss.button} type="submit">Add contact</button>
      </form>
    );
  }
}

SignForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SignForm;
