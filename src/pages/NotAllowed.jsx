import { Link } from "react-router"

const NotAllowed = () => {
  return (
    <div className='flex h-screen w-screen p-4'>
        <div className="small-container">
            <div className="card">
                <h1 className="card-title">Attention!</h1>
                <p className="card-description">You are not authorized to view this page. <br/>If you think this is a mistake, contact the administrator or <Link to="/" className="link link-primary">go back to the homepage</Link></p>
                <Link to="/" className="button button-primary text-center">Back to home</Link>
            </div>
        </div>
    </div>
  )
}

export default NotAllowed