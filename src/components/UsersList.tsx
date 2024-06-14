import { SortBy, type User } from "../types.d"

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (uuid: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList ({ users, showColors, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSorting(SortBy.LAST) }}>Apellidos</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
          <th style={{ cursor: 'pointer' }}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'

            return (
              <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                <td>

                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>
                  {user.name.first}
                </td>
                <td>
                  {user.name.last}
                </td>
                <td>
                  {user.location.country}
                </td>
                <td>
                  <button onClick={() => {
                    deleteUser(user.login.uuid)
                  }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
