import { IoSearchOutline } from 'react-icons/io5'
import { Input } from './ui/Input'

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (val: string) => void }) => {
  return (
    <div className="relative w-60 md:w-96">
      <IoSearchOutline className="absolute top-0 bottom-0 w-4 h-4  my-auto text-gray-500 left-3" />
      <Input
        type="text"
        placeholder="Search products..."
        className="pl-12 pr-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
