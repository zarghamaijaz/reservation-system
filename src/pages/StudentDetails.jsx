import { useState } from 'react'
import Header from '../components/Header'
import { TfiCheckBox } from 'react-icons/tfi'
import { MdCancelPresentation } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { RiDeleteBin6Line } from "react-icons/ri";

const Detail = ({ name, value }) => {
    return (
        <div className='detail-container'>
            <div className='detail-name'>{name}</div>
            <div className='detail-value'>{value}</div>
        </div>
    )
}

const StudentDetails = () => {
    const [addLessonForm, setAddLessonForm] =  useState(false);
  return (
    <>
    {addLessonForm && (
        <div className='modal-container'>
            <div className='small-container'>
                <div className="card">
                    <button onClick={e => setAddLessonForm(false)} className='modal-close'><IoMdClose/></button>
                    <h1 className="card-title">Add lesson</h1>
                    <p className='card-description'>Create a lesson for this student</p>
                    <div className='input-container'>
                        <label className='label'>Description</label>
                        <input className='input' type='text' placeholder='Enter description' />
                    </div>
                    <div className='input-container'>
                        <label className='label'>Date</label>
                        <input className='input' type='text' placeholder='Enter date' />
                    </div>
                    <div className='input-container'>
                        <label className='label'>Start time</label>
                        <input className='input' type='text' placeholder='Enter start time' />
                    </div>
                    <div className='input-container'>
                        <label className='label'>End time</label>
                        <input className='input' type='text' placeholder='Enter end time' />
                    </div>
                    <div className='input-container'>
                        <label className='label'>Price (USD)</label>
                        <input className='input' type='text' placeholder='Enter lesson price' />
                    </div>
                    <div className='input-container'>
                        <button onClick={e => setAddLessonForm(false)} className='button button-primary'>Add lesson</button>
                    </div>
                </div>
            </div>
        </div>
    )}
    <div className='flex flex-col h-screen w-screen p-4'>
        <Header backLink='/all-students' />
        <div className='student-details-container'>
            <div className="card">
                <div className="row">
                    <div className="col-50">
                        <Detail name='Name' value='Zargham' />
                        <Detail name='ID' value='123456789' />
                        <Detail name='Phone' value='+123456789' />
                        <Detail name='Test date' value='01/08/2025 at 02:30' />
                    </div>
                    <div className="col-50">
                        <Detail name='Address' value='Apartment no 1, Some street, USA' />
                        <Detail name='VISA expiry' value='01/01/2028' />
                        <Detail name='License expiry' value='01/01/2028' />
                        <Detail name='Booking' value='' />
                        <Detail name='Test' value='' />
                    </div>
                </div>
            </div>
            <h2 className='section-title'>Lesson Analysis</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th><div className='table-cell'>Description</div></th>
                            <th><div className='table-cell'>Date</div></th>
                            <th><div className='table-cell'>From</div></th>
                            <th><div className='table-cell'>To</div></th>
                            <th><div className='table-cell'>Amount</div></th>
                            <th className='table-action-head'><div className='table-cell'>Paid</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className='table-cell'>Lesson description to be added here</div>
                            </td>
                            <td>
                                <div className='table-cell'>01/8/2025</div>
                            </td>
                            <td>
                                <div className='table-cell'>02:00</div>
                            </td>
                            <td>
                                <div className='table-cell'>03:30</div>
                            </td>
                            <td>
                                <div className='table-cell'>$60</div>
                            </td>
                            <td>
                                <div className='table-cell'>
                                    <div className='table-actions'>
                                        <button className='table-action action-primary'>
                                            <TfiCheckBox/>
                                        </button>
                                        <button className='table-action action-danger'>
                                            <RiDeleteBin6Line/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table-cell'>Lesson description to be added here</div>
                            </td>
                            <td>
                                <div className='table-cell'>01/8/2025</div>
                            </td>
                            <td>
                                <div className='table-cell'>02:00</div>
                            </td>
                            <td>
                                <div className='table-cell'>03:30</div>
                            </td>
                            <td>
                                <div className='table-cell'>$50</div>
                            </td>
                            <td>
                                <div className='table-cell'>
                                    <div className='table-actions'>
                                        <button className='table-action action-danger'>
                                            <MdCancelPresentation/>
                                        </button>
                                        <button className='table-action action-danger'>
                                            <RiDeleteBin6Line/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table-cell'>Lesson description to be added here</div>
                            </td>
                            <td>
                                <div className='table-cell'>01/8/2025</div>
                            </td>
                            <td>
                                <div className='table-cell'>02:00</div>
                            </td>
                            <td>
                                <div className='table-cell'>03:30</div>
                            </td>
                            <td>
                                <div className='table-cell'>$45</div>
                            </td>
                            <td>
                                <div className='table-cell'>
                                    <div className='table-actions'>
                                        <button className='table-action action-danger'>
                                            <MdCancelPresentation/>
                                        </button>
                                        <button className='table-action action-danger'>
                                            <RiDeleteBin6Line/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='button-group'>
                <button onClick={e => setAddLessonForm(true)} className='button button-primary-outline'>Add lesson</button>
                <button className='button button-primary-outline'>Need test</button>
                <button className='button button-primary-outline'>Test ok</button>
                <button className='button button-primary'>Finish</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default StudentDetails