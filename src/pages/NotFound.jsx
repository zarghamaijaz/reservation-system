import { Link } from "react-router"

const NotFound = () => {
  return (
    <div className='flex h-screen w-screen p-4'>
        <div className="small-container">
            <div className="card">
                <h1 className="card-title">404 Not Found</h1>
                <p className="card-description">The request page could not be found.</p>
                <Link to="/" className="button button-primary text-center">Back to home</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound