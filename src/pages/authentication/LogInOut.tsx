import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogInOut.scss";
import {faGoogle, faFacebook, faInstagram,} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {authenticateServiceUrl, registorServiceUrl} from '../../data';

const LogInOut = () => {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUpClick = () => {
    // API call to register user
    axios
      //.post("http://localhost:8080/registor", formData) // Replace with your actual signup API endpoint
      .post(registorServiceUrl, formData)
      .then((response) => {
        // Handle successful signup here, e.g., show a success message
        setIsSignUpActive(false);
        console.log("Signup successful", response.data);
      })
      .catch((error) => {
        // Handle signup error, e.g., display an error message
        console.error("Signup error", error);
      });
  };

  const signInClick = () => {
    // API call to sign in user
    axios
      //.post("http://localhost:8080/authentication", formData) // Replace with your actual signin API endpoint
      .post(authenticateServiceUrl, formData)
      .then((response) => {
        if (response.data.authenticated) {
          // Redirect to the main page
          navigate("/main");
        } else {
          // Handle failed authentication
          console.error("Authentication failed");
        }
      })
      .catch((error) => {
        // Handle signin error, e.g., display an error message
        console.error("Signin error", error);
      });
  };

  return (
    <div className="authcontainer">
      <div className="signUp">
        <form action="#">
          {isSignUpActive ? (
            <div className="innersignUp">
              <h1>Create Account</h1>
              <div className="icons">
                <a href="#" className="social">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    size="2x"
                    style={{ marginRight: "40px" }}
                  />
                </a>
                <a href="#" className="social">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    style={{ marginRight: "40px" }}
                  />
                </a>
                <a href="#" className="social">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    style={{ marginRight: "40px" }}
                  />
                </a>
              </div>
              <p>Or use your email for registration</p>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <p>Forgot your Password?</p>
              <button type="button" onClick={signUpClick}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="signInPart">
              <h1>Welcome Back!</h1>
              <p>Use your credentials to Sign In</p>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <p>Forgot your Password?</p>
              <button type="button" onClick={signInClick}>
                Sign In
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="signIn">
        <div className="innnerSignIn">
          <div>
            <h1>Hello, User</h1>
          </div>
          <div>
            <p>Enter your personal details and start your journey with us</p>
          </div>
          <div>
            {isSignUpActive ? (
              <button onClick={toggleForm}>SIGN IN</button>
            ) : (
              <button onClick={toggleForm}>SIGN UP</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInOut;
