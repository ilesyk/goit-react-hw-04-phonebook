import { ContactForm } from './ContactForm/ContactForm';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    if (localStorage.getItem('contacts') !== null) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    }
  }
  addContact = newContact => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    return this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContact = filteredName => {
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filteredName.toLowerCase());
    });
  };

  findContact = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  render() {
    const filteredContacts = this.getFilteredContact(this.state.filter);
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter onSearch={this.findContact} />
        <ContactsList
          contacts={filteredContacts ? filteredContacts : this.state.contacts}
          onDelete={this.deleteContact}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
