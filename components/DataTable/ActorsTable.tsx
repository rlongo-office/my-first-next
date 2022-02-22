import * as React from 'react'
import DataTable from './DataTable'
import { useAppContext } from '../../context/AppProvider'

/**
 * This is a wrapper for the DataTable and contains the configuration for actors.
 * As such this component pulls in actors context.
 *
 * @constructor
 */
function ActorsTable() {
  const { actors } = useAppContext()

  let actorsTableConfig = {
    sortColumns: [0, 1, 2, 3, 4],
    header: 'keys',
    stripe: true,
    border: true,
    pageSize: 15,
    data: actors,
  }

  return (
    <>
      <h2>Actors Table</h2>
      <DataTable config={actorsTableConfig} />
    </>
  )
}

export default ActorsTable
