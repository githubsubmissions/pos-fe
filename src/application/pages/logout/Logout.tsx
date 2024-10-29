import {useNavigate} from 'react-router-dom';
import React, {useContext} from "react";
import UserContext from "../../../domain/contexts/user/UserContext";
import {toast} from "react-toastify";
import container from "../../../container";
import AuthRepository from "../../../domain/repositories/AuthRepository";

const Logout = () => {
  const navigate = useNavigate();
  let {setIsAuthenticated} = useContext(UserContext);
  const authRepository = container.resolve<AuthRepository>('AuthRepository');

  authRepository.logout()
    .then(() => {
      toast.success('Bye Bye');
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    })
    .catch((error: any) => {
      console.log(error)
      toast.error(error);
    });

  return (
    <React.Fragment>

      <h2>{process.env.REACT_APP_COMPANY_NAME}</h2>
      <h3>Come Back Soon </h3>

    </React.Fragment>

  )
}

export default Logout