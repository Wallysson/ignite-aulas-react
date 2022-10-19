import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import logoSvg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContext } from "react";

export function Header() {
  const { open, closedModal } = useContext(TransactionsContext)

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoSvg}  />

        <Dialog.Root open={open} onOpenChange={closedModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}