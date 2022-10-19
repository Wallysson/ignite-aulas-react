/* eslint-disable prettier/prettier */
import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useState, useReducer, useEffect } from 'react'
import { ActionTypes, addNewCycleAction, interruptedCurrentCycleAction, markCurrentCycleFinishedAction } from '../reducers/cycles/actions'
import { CyclesProps, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: CyclesProps[]
  activeCycle: CyclesProps | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amoutSecondPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptedCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState
  // Verifica se o ciclo está ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amoutSecondPassed, setAmoutSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startCycle),
      )
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0', stateJSON)
  }, [cyclesState])

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: CyclesProps = {
      id,
      task: data.task,
      numberAmount: data.minutesAmount,
      startCycle: new Date()
    }
    dispatch(addNewCycleAction(newCycle))
    setAmoutSecondPassed(0)
  }

  function interruptedCurrentCycle () {
    dispatch(interruptedCurrentCycleAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmoutSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
  dispatch(markCurrentCycleFinishedAction())
  }

  return (
    <CyclesContext.Provider 
      value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amoutSecondPassed, 
        setSecondsPassed,
        createNewCycle,
        interruptedCurrentCycle
      }}>
        {children}
    </CyclesContext.Provider>
  )
}