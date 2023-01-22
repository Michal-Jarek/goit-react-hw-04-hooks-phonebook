import PropTypes from 'prop-types';
import { useState } from 'react';

import scss from './SignForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const SignForm = ({handleSubmit}) => {
  
  const [contact, handleContact] = useState({...INITIAL_STATE})  

  // ************ Methods *****************
const  handleSubmitInside = e => {
  e.preventDefault();
  console.log(contact);
    handleSubmit(contact );
    reset();
  };

const handleChange = e => {
  handleContact({
    ...contact,
    [e.target.name]: e.target.value,
  });
};

 const reset = () => handleContact({ ...INITIAL_STATE });

  // ************ End Methods *****************

  const { name, number } = contact;

  return (
    <form className={scss.form} onSubmit={handleSubmitInside}>
      <label className={scss.label}>
        Name:
        <input
          className={scss.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
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
          onChange={handleChange}
          value={number}
          required
        />
      </label>
      <button className={scss.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

SignForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SignForm;
