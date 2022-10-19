import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import {  PriceHightlight, TransactionsMobileContainer, TransactionsContainer, TransactionTable, TransactionsMobile } from "./styles";
import { useMediaQuery } from 'react-responsive';
import { CalendarBlank, TagSimple } from "phosphor-react";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
      {isTabletOrMobile ? (
        <TransactionsMobileContainer>
          <header>
            <strong>Transações</strong>
            <span>{transactions ? transactions.length : 0} itens</span>
          </header>
          <SearchForm />

          <TransactionsMobile>
            {transactions.map(item => {
              return (
              <div key={item.id}>
                <h4>{item.description}</h4>
                <PriceHightlight variant={item.type}>
                  {item.type === 'outcome' && '- '}
                  {priceFormatter.format(item.price)}
                </PriceHightlight>

                <footer>
                  <div>
                    <TagSimple size={16} color="#7C7C8A"/>
                    <span>{item.category}</span>
                  </div>
                  <div>
                    <CalendarBlank size={16} color="#7C7C8A"/>
                    <span>{dateFormatter.format(new Date(item.createdAt))}</span>
                  </div>
                </footer>
              </div>
              )
            })}
          </TransactionsMobile>
        </TransactionsMobileContainer>
      ) : (
        <>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHightlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHightlight>
                  </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
        </>
      )}
      </TransactionsContainer>
    </div>
  )
}