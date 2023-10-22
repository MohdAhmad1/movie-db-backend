import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthenticatedLayout from "./components/AuthenticatedLayout/AuthenticatedLayout";
import Movies from "./pages/Movies";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<AuthenticatedLayout />}>
        <Route index element={<Navigate to="/movies" />} />

        <Route path="movies" element={<Movies />} />
      </Route>
    </Routes>
  );
}

export default App;
