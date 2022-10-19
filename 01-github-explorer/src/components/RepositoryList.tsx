import { RepositoryItem } from "./RepositoryItem"
import '../styles/repositories.scss'
import { useState, useEffect } from 'react'

//https://api.github.com/users/Wallysson/repos

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList () {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/Wallysson/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  },[])



  return (
    <section className="repository-list">
      <h1>Lista de Repositório</h1>

      <ul>
          {repositories.map(enviarDados => {
            return <RepositoryItem  key={enviarDados.name} repository={enviarDados}  />
          })}
      </ul>
    </section>
  )
}