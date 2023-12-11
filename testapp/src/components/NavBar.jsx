function NavBar({ openModal }){

    return(
        <>
            <div className="flex bg-gray-800 justify-between ">
                <p className="text-xl my-auto ml-4 font-bold">Thawne <ion-icon name="flash"></ion-icon></p>
                <div>
                    <button className="bg-transparent" onClick={openModal}>
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                    <button className="bg-transparent">
                        <ion-icon name="settings-sharp"></ion-icon>
                    </button>
                    <button className="bg-transparent">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </button>


                    
                </div>
            </div>
        </>
    )
}

export default NavBar