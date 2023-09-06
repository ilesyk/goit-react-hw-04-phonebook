import { Form, ErrorMessage } from 'formik';
import styled from 'styled-components';

export const FormWrap = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 15px;
`;
export const ErrMsg = styled(ErrorMessage)`
  color: red;
  border: 1px solid black;
  padding: 5px;
`;
