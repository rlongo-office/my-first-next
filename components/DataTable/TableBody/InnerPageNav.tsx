import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'

interface InnerNavProps {
  lowerBound: number
  upperBound: number
  num: number
  span: number
  cur: number
  pageHandler: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * This component represents the view layer of the page navigation action bar.
 * There's a lot of upper and lower bound computations in here along with some
 * utility functions that might need to be abstracted out to utils/page-nav-utils.ts
 * but for now this is fine.
 *
 * @param lowerBound
 * @param upperBound
 * @param num
 * @param span
 * @param cur
 * @param pageHandler
 * @constructor
 */
interface NavProps {
  tableID: string
  numPages: number
  pageHandler: React.MouseEventHandler<HTMLButtonElement>
}

function InnerPageNav({ tableID, numPages, pageHandler }: NavProps) {
  // Utility functions (prior to render):
  const { tableConfig, setTableConfig } = useAppContext()
  const ellipsis = '…'

  /**
   * This is really just a wrapper (syntatical sugar) for initializing an array and filling it.
   *
   * @param size of array to initialize
   * @param fillVal defaults to undefined
   */
  const initArray = (size: number, fillVal: number | string | undefined = undefined) => {
    return new Array(size).fill(fillVal)
  }

  /**
   * This function takes a start and end number and returns a range of numbers based on that.
   * Ex: start => 5 end => 12 would yield [5, 6, 7, 8, 9, 10, 11, 12]
   *
   * @param start of range
   * @param end of range
   */
  const range = (start: number, end: number): Array<number> => {
    return initArray(end - start + 1).map((_, idx) => start + idx)
  }

  const { tableSpan, upperBound, lowerBound, current } = tableConfig[tableID]
  const setRange = range(lowerBound, upperBound)

  console.log('InnerPageNav lowerBound: ', JSON.stringify(tableConfig[tableID].lowerBound))
  console.log('InnerPageNav upperBound: ', JSON.stringify(tableConfig[tableID].upperBound))

  console.log("Range is ", setRange)

  return (
    <>
      {
        // IF
        numPages <= tableSpan || current <= Math.round(tableSpan / 2)
          ? initArray(numPages <= tableSpan ? numPages : tableSpan).map((val, idx) => (
              <button onClick={pageHandler} className="pageBox" key={`main-${idx}`}>
                {idx + 1}
              </button>
            ))
          : // ELSE
            //range(getLower(), getUpper())
            setRange.map((val, idx) => (
              <button onClick={pageHandler} className="pageBox" key={`secondary-${idx}`}>
                {val}
              </button>
            ))
      }
      {
        // IF
        numPages > tableSpan && upperBound < numPages && (
          <button className="pageBox" key={'ellipsis'}>
            {ellipsis}
          </button>
        )
      }
    </>
  )
}

export default InnerPageNav
