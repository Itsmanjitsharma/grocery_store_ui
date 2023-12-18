import { faFacebook, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserProvider";
import { authenticateServiceUrl, registorServiceUrl } from "../../data";

interface UserData {
  isAuthenticated: boolean;
  userRole: string;
  username: string;
  login: (userData: UserData) => void; // Assuming login is a function that takes UserData as an argument
}

const Login = () => {
    const navigate = useNavigate();
    const user = useUser() as UserData;
    const { login} = user;


    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        businessname:"",
      });
      const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const toggleForm = () => {
        setIsSignUpActive(!isSignUpActive);
      };
      const signUpClick = () => {
        axios
          .post(registorServiceUrl, formData) // Replace with your actual signup API endpoint
          .then((response) => {
            // Handle successful signup here, e.g., show a success message
            setIsSignUpActive(false);
            console.log("Signup successful", response.data);
          })
          .catch((error) => {
            // Handle signup error, e.g., display an error message
            alert(error)
            console.error("Signup error", error);
          });
      };
      const signInClick = () => {
        // API call to sign in user
        axios
          .post(authenticateServiceUrl, formData)
          .then((response) => {
            login({
              isAuthenticated: response.data.isAuthenticated,
              userRole: response.data.userRole,
              username: response.data.userName,
              login: function (_userData: UserData): void {
                throw new Error("Function not implemented.");
              }
            });
            localStorage.setItem('isAuthenticated', 'true');
            if (response.data.authenticated && response.data.userRole === 'admin') {
              navigate("/Dashboard");
            } else if(response.data.authenticated && response.data.userRole === 'user'){
              navigate("/Customer");
            }else {
              // Handle failed authentication
              alert("Authentication failed");
              console.error("Authentication failed");
              localStorage.setItem('isAuthenticated', 'false');
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
                autoComplete="new-name"
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="new-email"
              />
              <input
                type="text"
                id="businessname"
                name="businessname"
                placeholder="Enter your Orgnisation Name"
                value={formData.businessname}
                onChange={handleInputChange}
                autoComplete="new-orgnisation"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
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
                autoCapitalize="new-name"
              />
              <input
                type="text"
                id="businessname"
                name="businessname"
                placeholder="Enter your Orgnisation Name"
                value={formData.businessname}
                onChange={handleInputChange}
                autoComplete="new-orgnisation"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
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
    )
}
export default Login;