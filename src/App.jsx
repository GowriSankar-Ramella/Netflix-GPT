import { useEffect, useState } from 'react'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import Browse from './components/Browse';
import GPTSearch from './components/GPTSearch';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(removeUser());
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <div className="text-white"><h1>Loading..in app</h1></div>;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/browse" element={<Browse />} />
          <Route path="/GPTsearch" element={<GPTSearch />} />
        </Route>
        <Route path="/" element={<Signup />} />

      </Routes>
    </>
  )
}

export default App



