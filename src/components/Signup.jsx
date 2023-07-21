import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../contexts/BlogContext';
import Loading from './Loading';
import { postUser } from '../api';

function Signup() {

const [newUser, setNewUser] = useState({
  username: '',
  name: '',
  avatar_url: ''
})
const [error, setError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const { user, setUser } = useContext(BlogContext)
const navigate = useNavigate();


const handleSubmit = (e) => {
  e.preventDefault()
  setIsLoading(true)
postUser(newUser).then(({postedUser}) => {
  setIsLoading(false)
  setUser(postedUser[0].username)
  navigate("/my_account")
}).catch((err) => {
  setError(true)
  setIsLoading(false)
})
}

if (error) {
  return (
    <p className="errorMessage">Something went wrong. Please try again.</p>
  );
}

if (isLoading) {
  return <Loading />;
}

  return (
    <form onSubmit={handleSubmit} className='signUpForm'>
       <h2>Hey there!</h2>
      <input id="username" type="text" value={newUser.username} placeholder='Enter your username' 	onChange={(e) =>
									setNewUser((newUser) => {
										return { ...newUser, username: e.target.value };
									})
								} required/>
      <input id="name" type="text" value={newUser.name} placeholder='Enter your name' onChange={(e) =>
									setNewUser((newUser) => {
										return { ...newUser, name: e.target.value };
									})
								} required/>
      <input id="avatar_url" type="text" value={newUser.avatar_url} placeholder='Enter the URL for your profile image' onChange={(e) =>
									setNewUser((newUser) => {
										return { ...newUser, avatar_url: e.target.value };
									})
								} required/>
      <button className='btn'>Sign-up</button>
    </form>
  )
}

export default Signup
