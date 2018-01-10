export const isAuthenticated = () => {
  return localStorage.getItem('@JumpstartTools:token');
}
