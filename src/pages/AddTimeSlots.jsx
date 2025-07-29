import { useState } from 'react';
import TimePicker from 'react-time-picker';
import Header from '../components/Header';

const defaultTiming = {startTime: "09:00", endTime: "10:00"};
function AddTimeSlots() {
  const [timings, setTimings] = useState([]);

  function setStartTimeByIndex(index){
    return function(e){
      const newTimings = timings.map((item, i) => index !== i ? item : {...item, startTime: e});
      setTimings(newTimings);
    }
  }
  function setEndTimeByIndex(index){
    return function(e){
      const newTimings = timings.map((item, i) => index !== i ? item : {...item, endTime: e});
      setTimings(newTimings);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      {/* <Header backLink="/"/> */}
    <div className='flex h-screen w-screen p-4'>
      <div className='small-container'>
        <div className="card">
          {timings.map((item,i)=>(
            <div key={i} className='time_slot_wrap'>
              <div className="start_time">
                <label htmlFor="start_time">
                  Start Time:
                </label>
                <TimePicker id='start_time' onChange={setStartTimeByIndex(i)} value={item.startTime} />
              </div>
              <div className="end_time">
                <label htmlFor="end_time">
                  End Time:
                </label>
                <TimePicker id='end_time' onChange={setEndTimeByIndex(i)} value={item.endTime} />
              </div>
            </div>
          ))}
          <button onClick={()=>setTimings(prev => [...prev, defaultTiming])} className='button button-primary-outline button-fit mx-auto'>Add new timing</button>
        </div>
      </div>

    </div>
    </div>
  );
}
export default AddTimeSlots;

const selectedDays = {
  monday: true,
  tuesday: true,
  wednesday: false,
  thursday: false,
  friday: false,
}
const data = [

    {startTime: "10:00", endTime: "11:00"},
    {startTime: "12:00", endTime: "13:00"},
    {startTime: "16:00", endTime: "17:00"},
    {startTime: "00:00", endTime: "00:00"},
    
]

