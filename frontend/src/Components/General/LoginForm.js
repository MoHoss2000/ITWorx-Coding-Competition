import '../App.css';
import { Button, Grid, Paper, Avatar, TextField, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React from 'react';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required()
})

const paperStyle = { padding: 20, height: '45vh', width: 280, margin: "60px auto" }
const avatarStyle = { backgroundColor: '#000090' }
const btnStyle = { margin: '8px 0' }

const LoginForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log(data)
    Axios.post('http://localhost:3001/login',{
        username: data.email,
        password: data.password,
    }).then((response) => {
        console.log(response)
    })
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} onSubmit={handleSubmit(submitForm)}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField label="Username" placeholder="Enter username" {...register("email")} fullWidth required></TextField>
        <p>{errors.username?.message}</p>
        <TextField label="Password" type="password" placeholder="Enter password"  {...register("password")} fullWidth required></TextField>
        <p>{errors.password?.message}</p>
       <br></br>
       <br></br>
        <Button type="submit" variant="contained" style={btnStyle} color="primary" onClick={handleSubmit(submitForm)} fullWidth>Sign in</Button>

    <Typography>
        <Link href="#">Forgot password ?</Link>
    </Typography>

    <Typography>Do you have an account ?
        <Link href="#">Sign Up</Link>
    </Typography>
      </Paper>
    </Grid>
  );
}
export default LoginForm;