import { Link } from "react-router-dom";
import Input from "./../components/input/input";
import { useState } from "react";
import Swal from 'sweetalert2'
import axios from "axios";

function Signup(): JSX.Element {

  const [name, setname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleInputs = (e: any, type: string) => {
    switch (type) {
      case 'name':
        setname(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  }



  const validateSubmition = () => {
    // validation
    if (name && username && email && password) {
      submitNewUser();
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Inputs",
        text: "Please enter valid inputs"
      });
    }
  }

  const submitNewUser = () => {

    const headers = { 'Content-Type': 'application/json' }

    let body = {
      username: username,
      name: name,
      email: email,
      password: password
    }

    axios.post("http://localhost:5000/user", body, { headers: headers }).then(r => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User saved successfully!"
      });
    }).catch(err => {
      Swal.fire({
        icon: "error",
        title: "Sorry!",
        text: "Something went wrong"
      });
    })
  }

  return (
    <section className={'flex justify-center items-center p-5'}>
      <div className={'w-fit p-10 border shadow-xl rounded-xl'}>
        <div className={'text-2xl font-bold text-[#0A3981] text-center mt-5'}>
          Sign Up
        </div>

        <div className={'mt-5 min-w-[400px]'}>

          <div className={'m-2'}>
            <Input
              type={'name'}
              name="name"
              label="Name"
              placeholder="Name"
              optional={false}
              callBack={handleInputs}
              value={name}

            />

          </div>



          <div className={'m-2'}>
            <Input
              type={'username'}
              name="username"
              label="username"
              placeholder="username"
              optional={false}
              callBack={handleInputs}
              value={username}
            />
          </div>

          <div className={'m-2'}>
            <Input
              type={'email'}
              name="email"
              label="Email"
              placeholder="Email"
              optional={false}
              callBack={handleInputs}
              value={email}
            />
          </div>

          <div className={'m-2'}>
            <Input
              type={'password'}
              name="password"
              label="Password"
              placeholder="Password"
              optional={false}
              callBack={handleInputs}
              value={password}
            />
          </div>
        </div>

        <div className={'text-center mt-5'}>
          <button className={'bg-[#0A3981] text-white px-5 py-3 hover:bg-[#0A3981]'} onClick={validateSubmition} >Sign In</button>
        </div>


        <div className={'text-center mt-5'}>
          Do have an account? <Link to={'/login'}><span className={'text-[#0A3981] underline'}>Sign in now</span></Link>
        </div>

      </div>
    </section>
  );
}

export default Signup;