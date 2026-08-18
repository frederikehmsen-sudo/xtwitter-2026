import {useRef, type FormEvent, useState} from "react";
import {useNavigate} from "react-router";

export interface MyRegisterForm {
  email: string;
  password: string;
}

export function APITester() {
  const [myRegisterForm, setMyRegisterForm] = useState<MyRegisterForm>({
    email: 'your@email.com',
    password: ''
  })

  const navigate= useNavigate();

  const [responseFromServer, setResponseFromServer] = useState<any>("")

  async function sendMyForm() {
    const response = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(myRegisterForm),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = (await response.json());
    setResponseFromServer(json)
    navigate("/feed");
  }

  return (
      <div className="api-tester">
        {responseFromServer.message}
        <input type = "email" onChange={e => setMyRegisterForm({...myRegisterForm, email: e.target.value})}
               value={myRegisterForm.email}/>
        <input type = "password" onChange={e => setMyRegisterForm({...myRegisterForm, password: e.target.value})}
               value={myRegisterForm.password}/>
        <button onClick={() => sendMyForm()}>Send</button>
      </div>
  );
}
