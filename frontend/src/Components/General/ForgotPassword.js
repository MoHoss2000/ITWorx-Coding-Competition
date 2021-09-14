import { Button, Grid, Paper, Avatar, TextField, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

const paperStyle = { padding: 20, height: '50vh', width: 300, margin: "10% auto" }
const avatarStyle = { backgroundColor: '#000090' }
const btnStyle = { margin: '8px 0' }

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = async (data) => {

    try {
      const res = await axios.post('http://localhost:3001/resetPassword', { email: data.email });
      window.alert('An email has been sent. Please check your inbox');
    } catch (e) {
      window.alert(e.response.data);
    }
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} onSubmit={handleSubmit(submitForm)}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Request password reset</h2>
        </Grid>
        <TextField label="Email" placeholder="Enter email" {...register("email")} fullWidth required></TextField>
        <p>{errors.username?.message}</p>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained" style={btnStyle} color="primary" onClick={handleSubmit(submitForm)} fullWidth>Submit</Button>

      </Paper>
    </Grid>
  );
}
export default ForgotPassword;
