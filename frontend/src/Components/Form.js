import React, { useState } from "react";
import "../css/App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from 'axios';
import { isAdmin } from "../../../backend/middleware/authorization";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  isAdmin: yup.bool.oneOf([True, False]),
  isDeveloper: yup.bool.oneOf([True, False])
});

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const reg = () => {
    Axios.post('https://ocalhost:8080/register',{
        first_name: firstName,
        last_name: lastName,
        username: email,
        password: password,
        is_developer: isDeveloper,
        isAdmin: isAdmin

    }
    )
  };

  return (
    <div className="Form">
      <div className="title">Sign Up</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(submitForm)}>
        <div>
            <label>First Name </label>
            <input type="text"  
            placeholder="First Name..." 
            {...register("firstName")} />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          
          <div>
            <label>Last Name </label>
            <input type="text" 
              placeholder="Last Name..."
              {...register("lastName")} />
              {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          <div>
            <label> Email </label>
            <input type="text" 
              placeholder="Email..."
              {...register("email")} />
              {errors.email && <p>{errors.email}</p>}
          </div>
        
          <div>
            <label> Password </label>
            <input type="text" 
              placeholder="Password..."
              {...register("password")} />
              {errors.password && <p>{errors.password}</p>}
          </div>

         <div>
            <label> Confirm Password </label>
            <input type="text"
              placeholder="Confirm Password..." />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div>
            <label>Mark this chekbox if you're an admin</label>
            <input type="checkbox" 
            {...register('isAdmin')} />
            {errors.isAdmin && <p>{errors.isAdmin}</p>}
          </div>

          <div>
            <label>Mark this chekbox if you're a developer</label>
            <input type="checkbox" 
            {...register('isDeveloper')} />
            {errors.isDeveloper && <p>{errors.isDeveloper}</p>}
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;