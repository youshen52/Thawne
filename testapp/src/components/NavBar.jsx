import useToken from './useToken';
import { Link } from "react-router-dom";

function NavBar({ openModal }){
    const { logout } = useToken();

    const handleLogout = () => {
        logout();
        window.location.reload();
      };

    return(
        <>
            <div className="flex bg-gray-800 justify-between ">
                <p className="text-xl my-auto ml-4 font-bold">Thawne <ion-icon name="flash"></ion-icon></p>
                <div>
                    <button className="bg-transparent" onClick={openModal}>
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                    <button className="bg-transparent">
                        <Link to="/settings/profile" className='text-white'><ion-icon name="settings-sharp"></ion-icon></Link>
                    </button>
                    <button className="bg-transparent" onClick={handleLogout}>
                        
                        <ion-icon name="log-out-outline"></ion-icon>
                    </button>


                    
                </div>
            </div>
        </>
    )
}

export default NavBar