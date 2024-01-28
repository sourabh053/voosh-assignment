import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';
import TodoList from '../../components/TodoList';


function Home() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('refresh_token')){
      fetch("https://api.escuelajs.co/api/v1/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refresh_token'),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) =>{
          if (json.statusCode) {
            navigate("/login");
          }
          localStorage.setItem("access_token",json.access_token);
          localStorage.setItem("refresh_token",json.refresh_token);
          //  console.log(json);
          });
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]);
  return (
    <div>
      <MenuAppBar />
      <TodoList />
      </div>
  )
}

export default Home
