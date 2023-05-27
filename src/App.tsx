import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import Account from "./pages/Account/Account";
import Teacher from "./pages/Account/Teacher";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/teacher" element={<Teacher />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
