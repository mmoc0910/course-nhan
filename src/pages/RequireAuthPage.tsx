import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/configureStore";

const RequireAuthPage = ({
  children,
  rolePage,
}: {
  children: ReactNode;
  rolePage: 2 | 1 | 3|4;
}) => {
  const { auth} = useSelector((state: RootState) => state.auth);
  const navigation = useNavigate();
  useEffect(() => {
    if (auth) {
        const {role} = auth
      if (role !== rolePage && rolePage === 1) navigation('/');
      if (role !== rolePage && rolePage === 2) navigation('/parent/child');
      if (role !== rolePage && rolePage === 3) navigation('/teacher/dashboard');
      if (role !== rolePage && rolePage === 4) navigation('/admin/dashboard');
    } else {
      navigation("/sign-in");
    }
  }, [auth, navigation, rolePage]);
  if (!auth) return null;
  return <>{children}</>;
};

export default RequireAuthPage;
