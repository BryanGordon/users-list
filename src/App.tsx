import './App.css'
import { useEffect, useRef, useState } from 'react'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const originalUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [countrySort, setCountrySort] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortCountry = () => {
    setCountrySort(!countrySort)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const sortedUsers = countrySort
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortCountry}>
          {countrySort ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
      </header>

      <main>
        <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDelete} />
      </main>
    </div>
  )
}

export default App
