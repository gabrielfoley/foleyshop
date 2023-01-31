import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { signupFailure, signupStart, signupSuccess } from "../redux/userRedux";
import { publicRequest } from '../requestMethods';
import { validate } from "../Validate";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
color: red;
`




const Register = () => {
  const initialValues= {
    username:'',
    email:'',
    password:'',
  }
const [formValues, setFormValues] = useState(initialValues)
const [formErrors, setFormErrors] = useState({})
const [isSubmit, setIsSubmit] = useState(false)
  //const [ inputs, setInputs] = useState({});
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

const handleChange = (e) => { 
const {name , value} = e.target;
setFormValues({...formValues, [name]:value})
 }

 const handleClick = async(e) => {
e.preventDefault()
setFormErrors(validate(formValues))
setIsSubmit(true)

if (isSubmit === true) {
  dispatch(signupStart())
  try {
    const res = await publicRequest.post("/auth/register", formValues);
    dispatch(signupSuccess(res.data));
    setError(false)
    
  } catch (error) {
    dispatch(signupFailure())
    setError(true)
  }
}
 }


  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>  
          <Input value={formValues.username} type='text' name="username" placeholder="username" required onChange={handleChange}/>
          <Error>{formErrors.username}</Error>
          
          <Input value={formValues.email} type='email' name="email" placeholder="email" required onChange={handleChange}/>
          <Error>{formErrors.email}</Error>
          <Input value={formValues.password}  name="password" placeholder="password" required onChange={handleChange}/>
          <Error>{formErrors.password}</Error>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          { error && <Error>Invalid Details!</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
