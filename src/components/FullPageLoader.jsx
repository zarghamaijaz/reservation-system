import { ImSpinner } from "react-icons/im";

const FullPageLoader = () => {
  return (
    <div className='full-page-loader-container'>
        <div className='full-page-loader-inner'>
            <ImSpinner className="spinner spinning" />
        </div>
    </div>
  )
}

export default FullPageLoader