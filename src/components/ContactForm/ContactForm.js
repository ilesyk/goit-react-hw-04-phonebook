import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { FormWrap, ErrMsg } from './ContactForm.styled';

const quizSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore Artagnan'
    )
    .required('Required'),
  number: Yup.string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const ContactForm = ({ onAdd }) => (
  <Formik
    initialValues={{
      name: '',
      number: '',
    }}
    validationSchema={quizSchema}
    onSubmit={(values, actions) => {
      onAdd(values);
      actions.resetForm();
    }}
  >
    <FormWrap>
      <label htmlFor="Name">Name</label>
      <Field id="name" name="name" type="text" placeholder="Add contact name" />
      <ErrMsg name="name" component="div" />
      <label htmlFor="number">Number</label>
      <Field
        id="number"
        name="number"
        type="text"
        placeholder="Example: 123-45-67"
      />
      <ErrMsg name="number" component="div" />
      <button type="submit">Add contact</button>
    </FormWrap>
  </Formik>
);
