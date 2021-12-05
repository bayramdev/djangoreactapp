import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

import PrivateOutlet from "./auth/PrivateOutlet";
import { AuthProvider } from "./auth/useAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="account">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="settings" element={<PrivateOutlet />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
