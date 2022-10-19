import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as zod from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContext } from 'react';

const newTransactionFormScheme = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormScheme>

export function NewTransactionModal() {
  const { createTransaction, closedModal } = useContext(TransactionsContext)

  const { 
    control,
    register, 
    handleSubmit,
    formState: 
      { isSubmitting }, 
      reset
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormScheme),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    await createTransaction({
      description, 
      price, 
      category, 
      type
    })
    reset()
    closedModal(false)
  }
  
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <Dialog.Title>Nova transação</Dialog.Title>

        <form 
          onSubmit=
          {handleSubmit(handleCreateNewTransaction)}

        >
          <input 
            type="text" 
            placeholder="Descrição" 
            required
            {...register('description')}
          />
          <input 
            type="text" 
            placeholder="Preço" 
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder="Categoria" 
            required
            {...register('category')}
          />

          <Controller 
            control={control}     
            name="type"
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value} >
                  <TransactionTypeButton variant="income" value="income" >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
      
                  <TransactionTypeButton variant="outcome" value="outcome" >
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
              </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting} >Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}