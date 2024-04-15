import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/auth/authSlice";

export default function useAxiosPrivate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          dispatch(signOut());
          navigate("/sign-in");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return api;
}
