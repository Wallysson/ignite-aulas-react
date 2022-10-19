/* eslint-disable prettier/prettier */
import styled from 'styled-components'

export const LayoutContainer = styled.div`
  background: ${props => props.theme['gray-800']};
  border-radius: 8px;

  max-width: 74rem;
  height: calc(100% - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  
`
