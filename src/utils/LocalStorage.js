export const storeDataOnLocalStorage = async (
  user_info,
  token,
  logged,
  platform,
  userType,
  picture,
  loggedTime
) => {
  console.log(loggedTime, "loggedTime");
  try {
    localStorage.setItem("user_info", JSON.stringify(user_info));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("logged", JSON.stringify(logged));
    localStorage.setItem("platform", JSON.stringify(platform));
    localStorage.setItem("userType", JSON.stringify(userType));
    localStorage.setItem("picture", JSON.stringify(picture));
    localStorage.setItem("loggedTime", JSON.stringify(loggedTime));
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    // localStorage.setItem("user_info", null);
    // localStorage.setItem("token", null);
    // localStorage.setItem("logged", false);
    // localStorage.setItem("platform", null);

    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
