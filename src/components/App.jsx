import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { useState, useEffect } from 'react';

const getInitialcontacts = () => {
  const initialContacts = localStorage.getItem('contacts');
  if (initialContacts !== null) {
    return JSON.parse(initialContacts);
  }
  return [];
};
export const App = () => {
  const [contacts, setContacts] = useState(getInitialcontacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    return setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const findContact = evt => {
    setFilter(evt.target.value);
  };
  const getFilteredContact = filteredName => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filteredName.toLowerCase());
    });
  };
  const filteredContacts = getFilteredContact(filter);
  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2>Contacts</h2>
      <Filter onSearch={findContact} />
      <ContactsList
        contacts={filteredContacts ? filteredContacts : contacts}
        onDelete={deleteContact}
      />
      <GlobalStyle />
    </Layout>
  );
};
