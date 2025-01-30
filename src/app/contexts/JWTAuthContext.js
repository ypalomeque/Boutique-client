import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// CUSTOM COMPONENT
import { BOUTIQUE_API } from "app/api/api";
import { BASE_URL_DEV } from "app/utils/constant";
import { jwtDecode } from "jwt-decode";
import { MatxLoading } from "app/components";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const setSession = (accessToken, id) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setSessionIdUser = (id) => {
  if (id) {
    localStorage.setItem("idUser", id);
  } else {
    localStorage.removeItem("idUser");
  }
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }

    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise,
  logout: () => Promise,
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (payload) => {
    try {
      const {
        data: { user, accessToken, data, status, msg }
      } = await BOUTIQUE_API.post("/login", payload);
      if (status === "ok") {
        if (Object.keys(user).length > 0) {
          setSession(accessToken);
          setSessionIdUser(user._id);
          dispatch({
            type: "LOGIN",
            payload: {
              user
            }
          });
          return new Promise((resolve, reject) => {
            resolve({ user });
          });
        }
      }
    } catch (error) {
      throw error;
    }
    // const response = await axios.post('/api/auth/login', {
    //     email,
    //     password,
    // })
    // const { accessToken, user } = response.data
    // setSession(accessToken)

    // dispatch({
    //     type: 'LOGIN',
    //     payload: {
    //         user,
    //     },
    // })
  };

  const register = async (values) => {
    // const response = await axios.post('/api/auth/register', {
    //     fullName,
    //     email,
    //     password,
    // })

    try {
      const {
        data: { data }
      } = await BOUTIQUE_API.post("/user", { data: { user: { ...values } } });

      if (data[0].status === "ok") {
        if (data.length > 0) {
          // setSession(accessToken)
          dispatch({
            type: "REGISTER",
            payload: {
              user: data
            }
          });
        }
      }
    } catch (error) {
      console.log("Error register : ", error);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
          // const response = await axios.get('/api/auth/profile')
          // https://ee51-181-62-56-224.ngrok-free.app/api/validate/token
          const {
            data: { Authorization, user }
          } = await BOUTIQUE_API.post(
            `validate-token`,
            {},
            { headers: { authorization: `Bearer ${accessToken}` } }
          );
          setSessionIdUser(user._id);
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: Authorization,
              user
            }
          });
        }
        //else {
        //   // console.log('User 1', window.localStorage.getItem('idUser'));
        //   let id = window.localStorage.getItem('idUser')
        //   if (id) {
        //     try {
        //       const { data: { data: { data }, status } }
        //         = await axios.post(`${BASE_URL_DEV}/user/logout`, { data: { user: { id } } })
        //       if (status === 'ok') {
        //         // console.log('Mostrando el estado de la autorizacion ', status);
        //         setSession(null)
        //         setSessionIdUser(null)
        //       }
        //     } catch (error) {
        //       console.log('Mostrando el error al desloguearse ', error);
        //     }
        //   }

        //   dispatch({
        //     type: 'INIT',
        //     payload: {
        //       isAuthenticated: false,
        //       user: null,
        //     },
        //   })
        // }
      } catch (err) {
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    })();
  }, []);

  // SHOW LOADER
  // console.log(state.isInitialized);
  // if (!state.isInitialized) {
  //   return <div class="matx-loader">
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  // }
  // console.log(state.isInitialized);
  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
