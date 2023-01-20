import PropTypes from 'prop-types';
import scss from './UserList.module.scss'

const UserList = ({ array, handleDelete, children }) => {


  return (
    <>
      {children}
      <ul className={scss.list}>
        {array.map(({ name, number, id }) => (
          <li className={scss.listItem} key={id}>
            {name}: {number}
            <button className={scss.button} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

UserList.propTypes = {
  array: PropTypes.array,
  handleDelete: PropTypes.func,
  children: PropTypes.element,
};

export default UserList;
