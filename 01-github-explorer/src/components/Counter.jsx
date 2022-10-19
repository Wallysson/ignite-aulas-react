import { useState } from "react"

export function Counter () {
  const [items, setItems] = useState([])

  const addItem = () => {
    setItems([...items, {
      id: items.length,
      value: Math.floor(Math.random() * 10) + 1
    }])
  }

  return (
    <div>
      <h2>Clique no botão</h2>
      <button onClick={addItem}>
        Add a random number
        </button>
      <ul>
          {items.map(item => (
            <li key={item.id}>{item.value}</li>
          ))}
      </ul>
    </div>
  )
}