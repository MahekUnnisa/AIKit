import { Link, useLocation } from "react-router-dom";
import { logo } from "../assets";

const Navbar = () => {
    const location = useLocation();
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
                {location.pathname === '/' ? (
                    <Link type='button' className='black_btn' to='/ai-image-generator'>
                        Image Generator
                    </Link>
                ) : (
                    <Link type='button' className='black_btn' to='/'>
                        AI Summarizer
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Navbar