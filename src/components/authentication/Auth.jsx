// import { useEffect, useCallback, useMemo } from "react"
// import { useNavigate } from "react-router-dom"
// import { register, Hanko } from "@teamhanko/hanko-elements"
// import './auth.css'
// const hankoApi = import.meta.env.VITE_REACT_APP_HANKO_API_URL
// const user = new Hanko(hankoApi)

// const Auth = () => {
//   const navigate = useNavigate()
//   const hanko = useMemo(() => user, [])

//   const redirectAfterLogin = useCallback(() => {
//     navigate('/')
//   }, [navigate])

//   useEffect(() =>
//     hanko.onAuthFlowCompleted(() => {
//       redirectAfterLogin()
//     }),
//     [hanko, redirectAfterLogin]
//   )

//   useEffect(() => {
//     register(hankoApi).catch((error) => {
//       // handle error
//       error
//     })
//     user.onSessionExpired(() => navigate('/auth'))
//   }, [navigate])

//   return (
//     <div className='auth' style={{ backgroundImage: `url(https://rb.gy/p2hphi)` }}>
//       <span>MovieBox</span>
//       <hanko-auth id="hankoAuth"/>
//     </div>
//   )
// }

// export {Auth, user}


// const hankoApi = "https://ea06f524-93a0-4733-976b-709615840a5f.hanko.io";



import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";
import './auth.css';

const hankoApi = import.meta.env.VITE_REACT_APP_HANKO_API_URL;
const user = new Hanko(hankoApi);

const Auth = () => {
  const navigate = useNavigate();

  const redirectAfterLogin = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const authListener = user.onAuthFlowCompleted(redirectAfterLogin);
    
    return () => {
      authListener();
    };
  }, [redirectAfterLogin]);

  useEffect(() => {
    register(hankoApi).catch(console.error);

    const sessionListener = user.onSessionExpired(() => navigate('/auth'));

    return () => {
      sessionListener();
    };
  }, [navigate]);

  return (
    <div className="auth" style={{ backgroundImage: `url(https://rb.gy/p2hphi)` }}>
      <span>MovieBox</span>
      <hanko-auth id="hankoAuth" />
    </div>
  );
};

export { Auth, user };
