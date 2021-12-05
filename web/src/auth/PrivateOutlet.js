import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import BounceProgress from "../components/BounceProgress";
import useAuth from "./useAuth";

const PrivateOutlet = () => {
  const { getUser } = useAuth();
  const [user, setUser] = useState({ loading: true });

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, [getUser]);

  if (user?.loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <BounceProgress />
      </div>
    );
  } else if (user === null) {
    return <Navigate to="/account/login" replace />;
  } else if (user === undefined) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-red-700 text-2xl">
          No response was received from server
        </h1>
      </div>
    );
  }
  return <Outlet />;
};

export default PrivateOutlet;
