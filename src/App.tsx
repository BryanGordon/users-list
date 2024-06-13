import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h1>Lista de usuarios</h1>
      {
        JSON.stringify(users)
      }
    </div>
  )
}

export default App
