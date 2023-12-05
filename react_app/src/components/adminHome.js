import React, { Component, useEffect, useState } from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AdminHome({ userData}) {
  
  const [data ,setData]= useState([]);
  useEffect(()=>{
   getAllUser();
},[]);

const getAllUser = () => {
  fetch("http://localhost:5000/getAllUser", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setData(data.data);
    });
};

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const deleteUser = (id, name ) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{width:"auto"}} >
        <h3>Welcome Admin</h3>
        
        <table style={{width:500 }}>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>UserType</th>
            <th>Delete</th>
        </tr>
          </thead>
          <tbody>
          {data.map((item)=>{
            return(
              
              < tr  key={item._id}>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.userType}</td>
                <td >
                  <FontAwesomeIcon icon={faTrash} onClick={()=>deleteUser(item._id,item.fname)} />
                </td>
              </tr>
            
            )
            })}
            </tbody>
        </table>
        
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    
  );
}