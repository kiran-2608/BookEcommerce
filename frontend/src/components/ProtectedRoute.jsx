import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  // WAIT UNTIL USER LOADS

  if (loading) {

    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        Loading...
      </h2>
    );
  }

  // NOT LOGGED IN

  if (!user) {

    return <Navigate to="/login" />;
  }

  // LOGGED IN

  return children;
};

export default ProtectedRoute;