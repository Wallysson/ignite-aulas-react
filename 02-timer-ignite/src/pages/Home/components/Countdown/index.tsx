/* eslint-disable prettier/prettier */
import { useEffect, useContext } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amoutSecondPassed, setSecondsPassed } = useContext(CyclesContext)

  // Se o ciclo está ativo, ele pega a quantidade de minutos e transforma em segundos
  const totalSeconds = activeCycle ? activeCycle.numberAmount * 60 : 0

  useEffect(() => {
      let interval: number
  
      if (activeCycle) {
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(
            new Date(),
            new Date(activeCycle.startCycle),
          )
  
          if (secondsDifference >= totalSeconds) {
            markCurrentCycleAsFinished()
            setSecondsPassed(totalSeconds)
            clearInterval(interval)
          } else {
            setSecondsPassed(secondsDifference)
          }
        }, 1000)
      }
  
      return () => {
        clearInterval(interval)
      }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

  // Se o ciclo está ativo, diminui a quantidade de segundos inputado menos o o que já passou
  const currentSeconds = activeCycle ? totalSeconds - amoutSecondPassed : 0

  // Cálculo para encontrar minutos e segundos
  const minutesAmout = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // Para não ter necessidade fazer if, usa o String constructor e a função padStart(Valor que precisa preencher, 'o que preencher pra chegar até o preenchido')
  const minutes = String(minutesAmout).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Pomodoro - Ignite ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountdownContainer>
  )
}