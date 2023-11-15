import { ChangeEvent } from 'react'

type SortProps = {
  optionArr: string[]
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void // type handleSearch is function
}

const Sort = ({ handleSortChange, optionArr }: SortProps) => {
  return (
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select name="sort" id="sort" onChange={handleSortChange}>
          {optionArr.map((optionSingle, index) => (
            <option key={index} value={optionSingle}>
              {optionSingle} {/* Adjusted to display the option as is */}
            </option>
          ))}
        </select>
      </div>
  )
}

export default Sort
