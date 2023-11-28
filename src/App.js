import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [form, setform] = useState({});
  const [user, setUser] = useState([]);

  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const data = await response.json();
    setUser(data)
  };
  useEffect(()=>{
getUsers();
  },[])
  return (
    <div className="main">
      <form onSubmit={handleOnsubmit} >
        <div className="form_div">
        <label>User Name</label>
        <input type="text" name="UserName" onChange={handleForm}></input>
        <span>Password</span>
        <input type="password" name="Password" onChange={handleForm}></input>
        <input type="submit" className="submit"></input>
        </div>
      </form>
      <ul>
        {user.map(user=><li key={user._id}>{user.UserName},{user.Password}</li>)}
       
      </ul>
    </div>
  );
}

export default App;
