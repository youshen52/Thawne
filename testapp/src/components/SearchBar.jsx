
function SearchBar(){
    return(
        <>
            <div className="border-r border-gray-300 lg:col-span-1">
                <div className="mx-3 my-3">
                    <div className="relative text-gray-600">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <ion-icon name="search-outline"></ion-icon>
                        </span>
                        <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                        placeholder="Search" required />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar