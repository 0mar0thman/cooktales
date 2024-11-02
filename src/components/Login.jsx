import React from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./style-header/LoginForm.css";

const db = getFirestore();

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const saveUserToFirestore = async (userId, name) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await saveUserToFirestore(user.uid, name); 
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await saveUserToFirestore(user.uid, name);
        if (user) {
          localStorage.setItem("userName", name);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        await saveUserToFirestore(user.uid, user.displayName || name); // Save user details
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const user = result.user;
        await saveUserToFirestore(user.uid, user.displayName || name); // Save user details
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className=" d-flex justify-content-center align-items-center min-vh-100 mb-5">
      <div className="card shadow p-4 ">
        <Link to="/" className="text-center mb-3">
          <FontAwesomeIcon
            icon={faCookieBite}
            spin
            size="3x"
            className="text-warning"
          />
        </Link>
        <h2 className="text-center mb-4 logo-text">Sign In</h2>
        <div className="row">
          <div className="col-md-6 side-1 mb-3">
            <form onSubmit={signIn} className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Email or mobile phone number
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}

              <div className="col-md-8 mb-3">
                <button
                  className="btn btn-warning text-white w-100"
                  type="submit"
                >
                  Continue
                </button>
              </div>
              <p className="mt-3">
                By signing in, you agree to CookTales{" "}
                <Link to="/return_policy" className="blue">
                  Conditions of Use
                </Link>{" "}
                and <Link to="/return_policy">Privacy Notice</Link>.
              </p>
              <h6>
                <Link to="/return_policy" className="blue">
                  Need help?
                </Link>
              </h6>
            </form>
          </div>
          <div className="col-md-6 mb-3 sild-2">
            <div className="text-center mt-4 col-md-12 row">
              <div className="mb-4 text-center col-md-6 m-auto create">
                <span>New to CookTales?</span>
                <button className="btn btn-dark mt-2" onClick={register}>
                  Create your CookTales account
                </button>
              </div>
              <button
                className="btn btn-danger col-md-6 m-auto"
                onClick={signInWithGoogle}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </button>
              <button
                className="btn btn-primary col-md-6  m-auto mt-2"
                onClick={signInWithFacebook}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
