import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log("Sign out error:", error);
            });
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent z-50 flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <img
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="Netflix Logo"
                className="w-28 md:w-36 cursor-pointer"
                onClick={() => navigate("/browse")}
            />

            {/* Right Side */}
            {user && (
                <div className="flex items-center gap-4">
                    {/* GPT Search Button */}
                    <button
                        onClick={() => navigate("/GPTsearch")}
                        className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition font-semibold"
                    >
                        GPT Search
                    </button>

                    {/* User Avatar */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="User"
                        className="w-8 h-8 rounded"
                    />

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
