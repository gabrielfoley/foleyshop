export const validate = (values) => {
  const errors ={}
  const usernameRegex = /^[A-Za-z0-9]{3,16}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

 if(!values.username){
  errors.username = "Username is required"
 } else if(!usernameRegex.test(values.username)){
  errors.username = "Username should be 3-16 characters and should not contain any specialcharacter"
 }

 if (!values.email) {
  errors.email = "Email is required"
 } else if (!emailRegex.test(values.email)){
  errors.email = 'Email is required'
 }

 if (!values.password) {
  errors.password = "Password is required"
 }else if (!passwordRegex.test(values.password)){
errors.password = "Password should be at least 8-20, must include and an uppercase letter and a special character"
 }
return errors
}
