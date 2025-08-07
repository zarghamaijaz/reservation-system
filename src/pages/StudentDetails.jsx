import { useState,useEffect } from 'react'
import Header from '../components/Header'
import { IoMdClose } from 'react-icons/io'
import { DayPicker } from "react-day-picker";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
import TimePicker from 'react-time-picker'
import Swal from 'sweetalert2'
import LessonRow from '../components/LessonRow'
import { getAssignedLessonsApi } from '../service/api';



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
    const [showDRP,setShowDRP] = useState(false)
    const [assignedLessons, setAssignedLessons] =  useState([]);
    // const [selectedDate, setSelectedDate] = useState(null);
    // const [startTime, setStartTime] = useState();
    // const [endTime, setEndTime] = useState();
    // const [price, setprice] = useState();
    const [formData, setFormData] = useState({
        description: '',
        startTime: '',
        endTime: '',
        price: null,
        date: "", 
    });

    useEffect(() => {
        getAssignedLessons(); 
    }, []);

    const getAssignedLessons = async () => {
        const response = await getAssignedLessonsApi()

        if(response.success){
            console.log(response.data)
            setAssignedLessons(response.data)
        }

    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const validateForm = ()=>{
        const isInvalid = Object.entries(formData).some(([key, value]) => {
        if (value === null || value === undefined) return true;
        if (typeof value === "string" && value.trim() === "") return true;
        return false;
        });

        if (isInvalid) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
        });
        } else {
        Swal.fire({
        icon: "success",
        title: "Success",
        text: "Lesson added",
        }).then(() => {
        setAddLessonForm(false)
        });
        }
    }
    const formatDate = (date)=>{
        return date?.toLocaleDateString('en-US', {
        weekday: 'long',   // Monday
        day: 'numeric',    // 11
        month: 'long'      // August
        })
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time
    // const twoWeeksLater = addDays(today, 13);
    
    // Create allowed dates (14 days, excluding weekends)
    // const allowedDates = Array.from({ length: 14 }, (_, i) => addDays(today, i)).filter(
    // (date) => date.getDay() !== 0 && date.getDay() !== 6
    // );


    // const handleSelect = (date) => {
    // if (!date) return;
    // // Only allow selecting if in allowedDates
    // // const isAllowed = allowedDates.some((d) => isSameDay(d, date));
    // // if (isAllowed) {
    // // }
    // setSelectedDate(date);
    // console.log('Selected:', date.toDateString());
    // };


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
                        <input value={formData.description} onInput={(e)=>{handleChange('description',e.target.value)}} className='input' type='text' placeholder='Enter description' />
                    </div>
                    <div className='input-container date-picker'>
                        <button onClick={()=>{setShowDRP(!showDRP)}} className='date-opener-button'>Select Date {formData.date ? `(${formatDate(formData.date)})` : ""} <span className="icon-wrap">{showDRP ?  <FaChevronUp /> : <FaChevronDown />}</span></button>
                        {/* <input className='input' type='text' placeholder='Enter date' /> */}
                        {
                            showDRP ? 
                            (
                                <div className="drp_custom_wrap">
                                <button onClick={()=>{setShowDRP(false)}} className='close_drp'>
                                    <IoMdClose />
                                </button>
                                <DayPicker
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(e)=>{handleChange("date",e)}}
                                    disabled={[
                                    { dayOfWeek: [0, 6] }, 
                                    ]}
                                    modifiersClassNames={{
                                    selected: 'selected-day',
                                    today: 'today-highlight',
                                    disabled: 'disabled-day',
                                }}
                                showOutsideDays={false}
                                />
                                </div>
                            )
                            :
                            null
                        }

                    </div>
                    <div className='input-container custom-time-picker'>
                        <label className='label'>Start time</label>
                        <TimePicker
                            value={formData.startTime}
                            onChange={(e)=>{handleChange("startTime",e)}}
                            />
                    </div>
                    <div className='input-container custom-time-picker'>
                        <label className='label'>End time</label>
                        <TimePicker
                            value={formData.endTime}
                            onChange={(e)=>{handleChange("endTime",e)}}
                        />
                    </div>
                    <div className='input-container'>
                        <label className='label'>Price (Euro)</label>
                        <input value={formData.price} onInput={(e)=>{handleChange('price',e.target.value)}} className='input' type='number' placeholder='Enter lesson price' />
                    </div>
                    <div className='input-container'>
                        <button onClick={e => {
                            validateForm()
                        }} className='button button-primary'>Add lesson</button>
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
                        {
                            assignedLessons && (
                                assignedLessons.map((lesson,i)=>{
                                    return(
                                        <LessonRow 
                                            key={i}
                                            description={lesson.description}
                                            date= {lesson.date}  
                                            from={lesson.timeFrom}
                                            to ={lesson.timeTo}
                                            amount={lesson.amount}
                                            isPaid={lesson.isPaid}
                                            id={lesson.id}
                                        />
                                    )
                                })
                            )
                        }
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