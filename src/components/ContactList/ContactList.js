import { List, ListItem } from './ContactList.styled';

export const ContactsList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => {
        return (
          <ListItem key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button type="button" onClick={() => onDelete(contact.id)}>
              Delete
            </button>
          </ListItem>
        );
      })}
    </List>
  );
};
