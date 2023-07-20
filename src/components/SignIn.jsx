import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import BlogContext from '../contexts/BlogContext'
import { getUserByUsername } from '../api'


function SignIn() {

  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
  const {user, setUser} = useContext(BlogContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserByUsername(username).then((user) => {
        setIsLoading(true)
        setUser(user[0].username)
        localStorage.setItem('user', user[0].username)
        navigate('/my_account')
      
    }).catch((err) => {
      setError(true)
      setIsLoading(false)
    })
  }

	if (isLoading) {
		return <Loading />;
	}

  return (
    <main className="SignInContainer">
      <h2>Welcome back!</h2>
    <form onSubmit={handleSubmit} className="SignInForm">
      <label htmlFor="Username"></label>
      <input type="text" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
      <button className='btn'>Sign-in</button>
    </form>
    {error ? <p className='signInError'>Invalid Username</p> : null}
    </main>
  )
}

export default SignIn
