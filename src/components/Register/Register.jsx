import { useEffect, useState } from "react";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateInput = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    switch (inputName) {
      case "name":
        !value.length
          ? setErrors({ ...errors, name: "required" })
          : delete errors[inputName] && setErrors({ ...errors });
        break;

      case "email":
        if (!value.length) setErrors({ ...errors, email: "required" });
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          setErrors({ ...errors, email: "please enter valid email" });
        else delete errors[inputName] && setErrors({ ...errors });
        break;

      case "userName":
        if (!value.length) setErrors({ ...errors, userName: "required" });
        else if (!/^\S*$/.test(value))
          setErrors({ ...errors, userName: "spaces not allowed" });
        else delete errors[inputName] && setErrors({ ...errors });
        break;

      case "password":
        if (!value.length) setErrors({ ...errors, password: "required" });
        else if (
          !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(value)
        )
          setErrors({
            ...errors,
            password:
              "contains at least one lowercase, one uppercase, at least one digit and special character",
          });
        else if (value.length < 8)
          setErrors({
            ...errors,
            password: "should contains at least 8 characters",
          });
        else delete errors[inputName] && setErrors({ ...errors });
        break;

      case "confirmPassword":
        if (!value.length)
          setErrors({ ...errors, confirmPassword: "required" });
        else if (value !== userInfo.password)
          setErrors({ ...errors, confirmPassword: "password dosen't match" });
        else delete errors[inputName] && setErrors({ ...errors });
        break;

      default:
        break;
    }
  };

  const onChange = (e) => {
    validateInput(e);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkRequiredInputs = () => {
    const erro = {};
    for (const item in userInfo) {
      if (!userInfo[item].length) erro[item] = "required";
    }
    setErrors({ ...erro });

    setIsValid(false);
    return !Object.keys(erro).length;
  };

  useEffect(() => {
    Object.keys(errors).length ? setIsValid(false) : setIsValid(true);
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length || checkRequiredInputs()) {
      console.log(userInfo);
      alert("form submitted successfully");
    }
  };

  return (
    <div className="container m-auto max-w-lg">
      <div className="md:mt-10 m-2 sm:mt-0">
        <form onSubmit={onSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              {/* start: name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ahmed Edrees"
                  autoComplete="Ahmed Edrees"
                  value={userInfo.name}
                  onChange={onChange}
                  onBlur={validateInput}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>

              {/* start: email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="test@test.com"
                  autoComplete="given-name"
                  value={userInfo.email}
                  onChange={onChange}
                  onBlur={validateInput}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </div>

              {/* start: userName */}
              <div className="mt-5">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="EdroVolt"
                  id="userName"
                  value={userInfo.userName}
                  onChange={onChange}
                  onBlur={validateInput}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.userName && (
                  <div style={{ color: "red" }}>{errors.userName}</div>
                )}
              </div>

              {/* start: password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  id="password"
                  value={userInfo.password}
                  onChange={onChange}
                  onBlur={validateInput}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>

              {/* start: confirmPassword */}
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  id="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={onChange}
                  onBlur={validateInput}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.confirmPassword && (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                )}
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:px-6">
              <button
                type="submit"
                disabled={!isValid}
                className="disabled:bg-gray-400 py-2 px-4 min-w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
