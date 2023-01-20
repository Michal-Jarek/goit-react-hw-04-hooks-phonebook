import { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import SignForm from './SignForm/SignForm';
import UserList from './UserList/UserList';
import Filter from './Filter/Filter';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

class App extends Component {
  state = { ...INITIAL_STATE };

  // ********************* Methods **************

  componentDidMount() {
    if (localStorage.getItem('Contacts') !== null)
      this.setState({ contacts: JSON.parse(localStorage.getItem('Contacts')) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = ({ name, number }) => {
    const contactCopy = [...this.state.contacts];
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
    this.setState({
      contacts: contactCopy,
      filter: '',
    });
    console.log(`Signed up as: ${name}`);
  };

  handleFilter = (filter, array) => {
    if (filter.length === 0) return this.state.contacts;
    else {
      const arrayCopy = [];
      for (let a = 0; a < array.length; a++)
        if (array[a].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
          arrayCopy.push(array[a]);

      return arrayCopy;
    }
  };
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // ********************* End Methods **************

  render() {
    const { filter, contacts } = this.state;

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
          <SignForm handleSubmit={this.handleSubmit} />
        </Section>

        <Section title="Contacts">
          <UserList
            array={this.handleFilter(filter, contacts)}
            handleDelete={this.handleDelete}
          >
            <Filter filter={filter} handleChange={this.handleChange} />
          </UserList>
        </Section>
      </div>
    );
  }
}

export { App };
