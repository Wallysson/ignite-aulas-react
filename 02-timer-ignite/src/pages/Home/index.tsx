/* eslint-disable prettier/prettier */
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";
import { useContext } from 'react'

const newCycleFormValidationScheme = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidationScheme>

export function Home() {
  const { activeCycle, createNewCycle, interruptedCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormDataProps>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: '',
      minutesAmount: 25
    }
  })

  const { handleSubmit, watch, reset} = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormDataProps) {

    createNewCycle(data)
    reset()
  }

  // Transforma em um componente Controlled para bloquear ou desbloquear o começar
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      <FormProvider {...newCycleForm}>
        <NewCycleForm />
      </FormProvider>
      <Countdown />

      {activeCycle ? (
        <StopCountdownButton type="button" onClick={interruptedCurrentCycle} >
          <HandPalm size={24}/>
            Interromper
        </StopCountdownButton>
      ) : (
        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24}/>
            Começar
        </StartCountdownButton>
      )}
    </form>
  </HomeContainer>
  )
}