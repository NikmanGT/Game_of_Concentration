import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DarkModeBtn from "../../Components/DarkModebtn";
import authBG from "../../assets/Signup-img.jpg";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GiCardRandom } from "react-icons/gi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { motion, scale } from "motion/react";

const Landing = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const RegisterUser = async () => {
    const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (
      userData.username == "" ||
      userData.email == "" ||
      userData.password == ""
    ) {
      toast.error("Please fill in all the fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: document.documentElement.classList.contains("dark")
          ? "light"
          : "dark",
        transition: Bounce,
      });
      return;
    } else {
      if (!usernameRegex.test(userData.username)) {
        toast.error("Invalid username", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
          transition: Bounce,
        });
        return;
      }

      if (!emailRegex.test(userData.email)) {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
          transition: Bounce,
        });
        return;
      }

      if (!passwordRegex.test(userData.password)) {
        toast.error("Weak password. Include upper, lower, number, symbol.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
          transition: Bounce,
        });
        return;
      }
    }

    try {
      const result = await axios.post(
        "http://localhost:8000/api/registerUser",
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status == 201) {
        navigate("/Homepage");
      }
    } catch (err) {
      if (err.response?.status == 400) {
        toast.error(err.response?.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Registration failed. Please Try Again!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
          transition: Bounce,
        });
      }
    }
  };

  const LoginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/loginUser", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const handleFormChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div
        className="absolute inset-0 -z-10 main-signup-container h-full w-full
       bg-gradient-to-b from-[#beb5b5] via-[#fefadf] to-[#d6d1ae] dark:bg-gradient-to-b
        dark:from-[#141417] dark:via-[#06001e] dark:to-[#332d02] font-[Nunito]"
      >
        <div
          className="working-container flex flex-col lg:flex-row h-full transform transition-transform duration-900 
          ease-in-out "
        >
          <div className="lg:hidden Upper-container items-center absolute flex p-4 justify-between w-full z-10">
            <DarkModeBtn />
            <div className="flex gap-2">
              <GiCardRandom className="size-7 dark:text-white" />
              <p className="text-lg dark:text-white font-semibold">
                Concentration
              </p>
            </div>
          </div>

          <div
            className={`image-container hidden lg:block w-1/2 p-5 transform transition-transform duration-900
          ease-in-out
            ${isLogin ? "lg:translate-x-full" : "lg:translate-x-0"}`}
          >
            <img
              src={authBG}
              className="h-full rounded-4xl object-cover relative"
              style={{
                clipPath: isLogin
                  ? "polygon(0 0, 0 0, 0 0, 90% 0%, 90% 9%, 100% 9%, 100% 100%, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 100%)"
                  : "polygon(0% 9%, 9% 9%, 9% 0%, 73% 0, 100% 0, 100% 29%, 100% 100%, 100% 100%, 85% 100%, 9% 100%, 0 100%, 0% 100%)",
              }}
            ></img>
            <div
              className={`darkmode-btn absolute ${
                isLogin ? "right-5" : "left-5"
              } top-5 z-10`}
            >
              <DarkModeBtn className="" />
            </div>
          </div>

          <div
            className={`signup-container lg:w-1/2 lg:static transform transition-transform duration-900
          ease-in-out my-auto lg:px-10 px-5
            ${isLogin ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
          >
            <div className="formBG-IMG inset-0 -z-8 fixed lg:hidden">
              <img
                src={authBG}
                className="h-full w-full inset-0 -z-8 fixed lg:hidden"
              ></img>
              <div className="absolute inset-0 bg-white/40 dark:bg-black/60"></div>
            </div>

            <div
              className="Signup-form lg:border-none rounded-3xl p-4 lg:p-8 flex flex-col ease-in-out
                mx-auto relative lg:bg-transparent dark:lg:bg-transparent transition-all duration-500 
                backdrop-blur-lg bg-white/30 dark:bg-black/30"
            >
              <p
                className=" text-3xl md:text-4xl lg:text-5xl text-center pb-3 font-semibold tracking-wide
              dark:text-white"
              >
                {isLogin ? "Welcome Back!" : "Create an account"}
              </p>
              <p
                className="text-md lg:text-lg text-center pb-5 tracking-wide font-semibold text-slate-700
              dark:text-rose-500"
              >
                {isLogin ? "Login to continue" : "Signup and Start Playing"}
              </p>

              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label className="font-semibold text-slate-500 dark:text-cyan-500">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleFormChange}
                  placeholder="Enter your username..."
                  className="bg-white rounded-4xl p-3 px-4 mb-2 outline-none"
                ></input>

                <label
                  className={`font-semibold text-slate-500 dark:text-cyan-500
                  ${isLogin ? "hidden" : ""}`}
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleFormChange}
                  placeholder="Enter your Email..."
                  className={`bg-white rounded-4xl p-3 px-4 outline-none ${
                    isLogin ? "hidden" : ""
                  }`}
                ></input>

                <label className="font-semibold text-slate-500 dark:text-cyan-500">
                  Password
                </label>

                <div className="relative mb-2 flex gap-3">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    value={userData.password}
                    onChange={handleFormChange}
                    placeholder="Enter your password..."
                    className="bg-white rounded-4xl p-3 px-4 outline-none w-full"
                  ></input>
                  <div className="my-auto">
                    {showPassword ? (
                      <IoEye
                        className="lg:w-8 w-9 lg:h-8 h-9 top cursor-pointer dark:text-white"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <IoEyeOff
                        className="lg:w-8 w-9 lg:h-8 h-9 top cursor-pointer dark:text-white"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    )}
                  </div>
                </div>

                <motion.button
                  className="Submit-button w-full bg-amber-300 p-3 lg:mt-10 mt-10 rounded-4xl cursor-pointer 
                  hover:scale-105 transition-all duration-300 ease-in-out font-bold shadow-xl/30 shadow-black
                  dark:shadow-amber-600"
                  onClick={() => {
                    isLogin ? LoginUser() : RegisterUser();
                  }}
                >
                  {isLogin ? "Login" : "Register"}
                </motion.button>

                <div className="bottom-form-section flex items-center justify-between p-3">
                  <p
                    className="hover:scale-105 cursor-pointer transition-transform duration-400 ease-in-out
                   lg:pt-3 pt-1 text-lg dark:text-white"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                  >
                    {isLogin
                      ? "Don't have an account?"
                      : "Have an account already?"}
                  </p>
                  <button
                    className="Google-btn flex shadow-xl/30 shadow-black dark:shadow-amber-200
                     gap-2 px-4 py-3 lg:py-2 rounded-xl cursor-pointer hover:scale-105 bg-gradient-to-b
                   from-amber-100 to-amber-200 dark:from-sky-950 dark:via-sky-950 dark:to-stone-800"
                    type="button"
                  >
                    <FcGoogle className="size-6" />
                    <p className="text-xl dark:text-white font-semibold">
                      Google
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
