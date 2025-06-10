import { useRef, useState } from "react";
import formValidation from "../utils/formValidation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [isSignIn, setIsSignIn] = useState(false)

    const [errMessage, setErrMessage] = useState(null)

    const email = useRef(null)

    const password = useRef(null)

    const navigate = useNavigate()


    const handleClick = () => {
        setIsSignIn((prev) => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isSignIn) {
            const res = formValidation(email.current.value, password.current.value)
            setErrMessage(res)
            if (res) return
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsSignIn((prev) => !prev)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMessage(errorCode + ":" + errMessage)
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + ":" + errMessage)
                });
        }
    }

    return (
        <div className="relative w-full h-screen">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_large.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>

            {/* Navbar */}
            <div className="relative z-10 p-4">
                <img
                    src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                    alt="Netflix Logo"
                    className="w-32 md:w-40"
                />
            </div>

            {/* Form */}
            <div className="relative z-10 flex justify-center items-center h-[calc(100vh-80px)]">
                <div className="bg-[rgba(0,0,0,0.6)] p-10 rounded-lg w-full max-w-md mx-4">
                    <h2 className="text-white text-3xl font-bold mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isSignIn && <input
                            type="text"
                            placeholder="Full name"
                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-80 text-white rounded focus:outline-none"
                        />}
                        <input
                            type="email"
                            ref={email}
                            placeholder="Email"
                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-80 text-white rounded focus:outline-none"
                        />
                        <input
                            type="password"
                            ref={password}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-80 text-white rounded focus:outline-none"
                        />
                        <button type="submit" className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </button>
                    </form>
                    <>
                        <p className="text-gray-400 mt-4 text-sm text-center cursor-pointer font-bold" onClick={handleClick}>
                            {isSignIn ? "New to Netflix? Sign up now." : "Already have an account? Sign in now"}
                        </p>
                        {errMessage && <p className="text-red-500 text-center mt-2">{errMessage}</p>}
                    </>

                </div>
            </div>

        </div>

    );
};

export default Signup;
