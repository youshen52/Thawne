import { Link } from "react-router-dom";

import useToken from '../hooks/useToken';


function NavBar({ openModal }) {
    const { logout } = useToken();

    const handleLogout = () => {
        logout();
        window.location.reload();
      };

    return(
        <>
            <div className="flex bg-gray-800 justify-between px-4 py-2">
                <p className="text-xl my-auto ml-4 font-bold text-white">Thawne <ion-icon name="flash"></ion-icon></p>
                <div className='flex items-center space-x-4'>
                    <button className="bg-transparent text-white" onClick={openModal}>
                        <ion-icon name="add-outline"></ion-icon>
                    </button>
                    <button className="bg-transparent text-white">
                        <Link to="/settings/profile" ><ion-icon name="settings-sharp"></ion-icon></Link>
                    </button>
                    <button className="bg-transparent text-white" onClick={handleLogout}>
                        
                        <ion-icon name="log-out-outline"></ion-icon>
                    </button>


                    
                </div>
            </div>
        </>
    )
}

export default NavBar