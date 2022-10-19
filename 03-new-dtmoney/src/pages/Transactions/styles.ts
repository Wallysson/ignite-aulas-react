import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  margin-top: 4rem;
`

export const TransactionsMobileContainer = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

      strong {
        font-size: 1.125rem;
        font-weight: 700;
        color: ${props => props.theme['gray-300']}
      }

      span {
        color: ${props => props.theme['gray-500']}
      }
  }
`

export const TransactionsMobile = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background: #29292E;
    padding: 1.25rem;
    margin-top: 0.75rem;

    &:last-child {
      margin-bottom: 2rem;
    }

    h4 {
      font-weight: 400;
      line-height: 160%;
      color: ${props => props.theme['gray-300']}
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;

    div {
      display: flex;
      align-items: center;
      gap: 4px;

      span {
        line-height: 160%;
        color: ${props => props.theme['gray-500']}
      }
    }
  }
`

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme['gray-700']};

    &:first-child {
      width: 40%;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
}
`

interface PriceHightlight {
  variant: 'income' | 'outcome'
}

export const PriceHightlight = styled.span<PriceHightlight>`
  color: ${props => props.variant === 'income' ? 
    props.theme['green-300'] :
    props.theme['red-300']
  }
`