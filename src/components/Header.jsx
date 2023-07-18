import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="headerContainer">
      <Link to='/'>
			<h1 className="header"> NC News</h1>
      </Link>
		</div>
  )
}

export default Header
