import {Avatar, Button, Grid, Link, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, {useContext} from 'react';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Axios from 'axios';
import {UserContext} from "../../Context";
import {useHistory} from 'react-router-dom';
import {Redirect, Route} from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required()
})

const paperStyle = {padding: 20, height: '50vh', width: 300, margin: "10% auto"}
const avatarStyle = {backgroundColor: '#000090'}
const btnStyle = {margin: '8px 0'}

const LoginForm = () => {

  const history = useHistory()

  const {type, targetPath, setId, setToken, setCycleId, setType} = useContext(UserContext);

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log("hi")
    console.log(data)
    Axios.post('http://localhost:3001/login', {
      username: data.email,
      password: data.password,
    }).then((response) => {

      const {accessToken, cycleID, id, type} = response.data
      setId(id)
      setToken(accessToken)
      setCycleId(cycleID)
      setType(type)
      let user = {id, accessToken, cycleID, type}
      localStorage.setItem("user", JSON.stringify(user));


      (targetPath === "") ? history.replace(type === 'employee' ? '/employee/home' : '/admin/home') : history.replace(targetPath)


    }).catch((e) => {
        console.log(e)
    })
  }

  if(type==='employee'){
    <Redirect to={'/employee/home'}/>
  }
  else if(type==='admin'){
    <Redirect to={'/admin/home'}/>
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} onSubmit={handleSubmit(submitForm)}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField label="Email" placeholder="Enter email" {...register("email")} fullWidth required/>
        <p>{errors.username?.message}</p>
        <TextField label="Password" type="password" placeholder="Enter password"  {...register("password")} fullWidth
                   required/>
        <p>{errors.password?.message}</p>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained" style={btnStyle} color="primary" onClick={handleSubmit(submitForm)}
                fullWidth>Sign in</Button>

        <Typography>
          <Link to='/forgotPassword'> Forgot password ? </Link>
        </Typography>

        <Typography>Do you have an account ?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
export default LoginForm;
