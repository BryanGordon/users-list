import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App () {
  const originalUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortCountry = () => {
    const sortCountry = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(sortCountry)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredCountry = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    let compareFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if (sorting === SortBy.NONE) return filteredCountry

    if (sorting === SortBy.NAME) {
      compareFn = (a: User, b: User) => a.name.first.localeCompare(b.name.first)
    }

    if (sorting === SortBy.LAST) {
      compareFn = (a: User, b: User) => a.name.last.localeCompare(b.name.last)
    }

    return filteredCountry.toSorted(compareFn)
  }, [filteredCountry, sorting])

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
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
        <input
          type='text'
          placeholder='Filtrar por país'
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />

      </header>

      <main>
        <UsersList changeSorting={handleChangeSort} users={sortedUsers} showColors={showColors} deleteUser={handleDelete} />
      </main>
    </div>
  )
}

export default App
