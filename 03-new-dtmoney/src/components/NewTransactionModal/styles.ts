import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32.5rem;
  background: ${props => props.theme['gray-800']};
  padding: 2.5rem 3rem;
  border-radius: 6px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${props => props.theme['gray-900']};
      color: ${props => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${props => props.theme['gray-500']};
      }
    }

    button[type="submit"] {
      margin-top: 1.5rem;
      height: 58px;
      border: 0;
      background: ${props => props.theme['green-500']};
      color: ${props => props.theme['white']};
      padding: 0 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${props => props.theme['green-700']};
        transition: background-color 0.3s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButton {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButton>`
  background: ${props => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-300']};

  svg {
    color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']}
  }

  &[data-state='unchecked']:hover {
    background: ${props => props.theme['gray-600']};  
    transition: background-color 0.3s;
  }

  &[data-state='checked']:focus {
    box-shadow: none;
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white};
    background: ${props => props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};

    svg {
      color: ${props => props.theme.white};
    }
  }
`