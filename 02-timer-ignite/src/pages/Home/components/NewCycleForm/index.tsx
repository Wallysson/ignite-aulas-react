/* eslint-disable prettier/prettier */
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from "../../../../contexts/CyclesContext"
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput 
      id="task" 
      placeholder="Dê um nome para o seu projeto"
      {...register('task')}
      disabled={!!activeCycle}
    />

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput 
      type="number" 
      id="minutesAmount"
      placeholder="00"
      step={5}
      min={5}
      max={60}
      disabled={!!activeCycle}
      {...register('minutesAmount', { valueAsNumber: true })}
    />

    <span>minutos.</span>
  </FormContainer>
  )
}