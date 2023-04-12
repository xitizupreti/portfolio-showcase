import GoogleLoginButton from "react-google-login";
import { useContext } from "react";
import { GoogleIcon } from "image/icon-svg";
import Icon from "@ant-design/icons";
import { JwtService } from "services/jwtServiceClient";
import { LOGIN_USER_CLIENT, UserContext, UserLoginContext } from "context";
import {
  notificationError,
  notificationSuccess,
} from "app/web/components/notification";
import "./index.css";
import PropTypes from "prop-types";
import { handleError } from "services/util";
import {useHistory} from 'react-router-dom'
import routeURL from "config/routeURL";

export const GoogleLogin = ({ onSuccess, text = "" }) => {
  const history = useHistory()
  // const [isVisible, setVisible] = useContext(UserLoginContext);
  const { clientDispatch } = useContext(UserContext);

  const responseGoogle = (response) => {
    if (onSuccess && typeof onSuccess === "function")
      return onSuccess(response.tokenId);

    if (response.tokenId) {
      JwtService.signInWithGoogle(response.tokenId)
        .then((message) => {
          console.log("message", message);
          notificationSuccess(message);
          clientDispatch({ type: LOGIN_USER_CLIENT });
          history.push(routeURL.web.home)
          // setVisible(false);
        })
        .catch(handleError);
      // .finally(() => setSpinning(false));
    }
  };
  return (
    <GoogleLoginButton
      render={(renderProps) => {
      // console.log("Googlee renderProps", renderProps);
      return (
        <span
          className="auth-login google-login"
          // disabled={renderProps.disabled}
          onClick={renderProps.onClick}
        >
            <GoogleIcon
              component={GoogleIcon}
              style={{
                verticalAlign: 3,
              }}
            />
            <span
              style={{
                marginLeft: 8,
              }}
            >
              Google
            </span>
          </span>
        );
      }}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login With Google"
      onSuccess={responseGoogle}
      onFailure={(...rest) => {
        console.log("Googlee onfailure", ...rest);
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
};
GoogleLogin.prototype = {
  onSuccess: PropTypes.func,
  text: PropTypes.string,
};
