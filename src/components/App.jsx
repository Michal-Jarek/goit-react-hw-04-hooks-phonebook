import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import SignForm from './SignForm/SignForm';
import UserList from './UserList/UserList';
import Filter from './Filter/Filter';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, handleContacts] = useState([...INITIAL_CONTACTS]);
  const [filter, setFilter] = useState('');
  console.log('po deklaracji');
  console.log(contacts);

  // ********************* Methods **************
  useEffect(() => {
    console.log('w montażu');
    if (localStorage.getItem('Contacts') !== null) {
      console.log('jestem w iF');
      handleContacts(JSON.parse(localStorage.getItem('Contacts')));
    }
    console.log(contacts);
    console.log('po montażu');
  }, []);

  // componentDidMount() {
  //   if (localStorage.getItem('Contacts') !== null)
  //     this.setState({ contacts: JSON.parse(localStorage.getItem('Contacts')) });
  // }

  // useEffect(() => {
  //   console.log('w update');
  //   localStorage.setItem('Contacts', JSON.stringify(contacts));
  //   console.log(contacts);
  //   console.log('po update');
  // }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts)
  //     localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
  // }

  const handleChange = e => {
    handleContacts({ [e.target.name]: e.target.value });
  };

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const handleSubmit = ({ name, number }) => {
    const contactCopy = [...contacts];
    if (
      contactCopy.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    contactCopy.push({
      name: name,
      number: number,
      id: nanoid(),
    });
    handleContacts([...contactCopy]);
    console.log(`Signed up as: ${name}`);
  };

  const handleFilter = (filter, array) => {
    if (filter.length === 0) return contacts;
    else {
      const arrayCopy = [];
      for (let a = 0; a < array.length; a++)
        if (array[a].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
          arrayCopy.push(array[a]);

      return arrayCopy;
    }
  };
  // handleDelete = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id),
  //   }));
  // };

  // ********************* End Methods **************

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
        alignItems: 'flex-start',
        fontSize: 40,
        color: '#010101',
        backgroundColor: '#e6e3e3',
      }}
    >
      <Section title="Phonebook">
        <SignForm handleSubmit={handleSubmit} />
      </Section>

      <Section title="Contacts">
        <UserList
          array={contacts}
          // array={handleFilter(filter, contacts)}
          // handleDelete={handleDelete}
        >
          <Filter filter={filter} handleChange={handleChange} />
        </UserList>
      </Section>
    </div>
  );
};
