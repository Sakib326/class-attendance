const useAuth = () => {
  const authenticated = localStorage.getItem("auth");
  return authenticated ? true : false;
};

export default useAuth;
