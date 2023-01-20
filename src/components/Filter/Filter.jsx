import PropTypes from 'prop-types';

import scss from './Filter.module.scss';

const Filter = ({ filter, handleChange }) => (
  <label className={scss.label}>
    Find contacts by name:
    <input
      className={scss.input}
      type="text"
      name="filter"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      onChange={handleChange}
      value={filter}
      required
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func,

};

export default Filter;
