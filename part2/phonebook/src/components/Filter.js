const Filter = ({searchName, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input onChange={handleSearchChange} />
    </div>
  )
}

export default Filter