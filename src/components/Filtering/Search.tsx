import { ChangeEvent } from "react"

type SearchProps = {
    searchTerm: string,
    handleSearch: (event: ChangeEvent<HTMLInputElement>)=> void   // type handleSearch is function
}

const Search = ({searchTerm, handleSearch}: SearchProps)=>  {
  return <input type="text" name= "search" 
  placeholder="Search" value={searchTerm}
   onChange={handleSearch} />

}

export default Search