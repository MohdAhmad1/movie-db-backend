import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<AuthenticatedLayout />}></Route>
    </Routes>
  );
}

export default App;
