import { MdCancelPresentation } from 'react-icons/md'
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiCheckBox } from 'react-icons/tfi'
import Swal from 'sweetalert2';
const LessonRow = ({description,date,from,to,amount,isPaid,id}) => {
    
    
    const confirmAction = ()=>{
        Swal.fire({
        icon: "warning",
        title: "Confirm",
        text: "Are you sure want to delete",
        })
    }


  return (
    <tr>
        <td>
            <div className='table-cell'>{description}</div>
        </td>
        <td>
            <div className='table-cell'>{date}</div>
        </td>
        <td>
            <div className='table-cell'>{from}</div>
        </td>
        <td>
            <div className='table-cell'>{to}</div>
        </td>
        <td>
            <div className='table-cell'>{amount}</div>
        </td>
        <td>
            <div className='table-cell'>
                <div className='table-actions'>
                    {
                        isPaid ? 
                        <button className='table-action action-primary'>
                            <TfiCheckBox/>
                        </button>
                        :
                        <button  className='table-action action-danger'>
                            <MdCancelPresentation/>
                        </button>
                    }
                    <button onClick={()=>{confirmAction()}} className='table-action action-danger'>
                        <RiDeleteBin6Line/>
                    </button>
                </div>
            </div>
        </td>
    </tr>
  )
}

export default LessonRow