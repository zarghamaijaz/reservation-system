import Header from '../components/Header';
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function AddTimeSlots() {
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const [dayWiseTimings, setDayWiseTimings] = useState({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    });
  


    const defaultTiming = {
      startTime: '',
      endTime: '',
    };

    const addTiming = (day) => {
      setDayWiseTimings(prev => ({
        ...prev,
        [day]: [...prev[day], defaultTiming],
      }));
    };

    const updateTime = (day, index, field, value) => {
      setDayWiseTimings(prev => {
        const updatedDay = [...prev[day]];
        updatedDay[index] = { ...updatedDay[index], [field]: value };
        return { ...prev, [day]: updatedDay };
      });
    };
    const deleteTiming = (day, indexToDelete) => {
    setDayWiseTimings((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== indexToDelete),
    }));
  };


  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/"/>
    <div className='flex h-screen w-screen p-4'>
      <div className='small-container'>
        
        <div className="card">
          

           <Tabs>
    <TabList>
      {
        days && (
          days.map((day,i)=>{
            return(
              <Tab key={i}>{day}</Tab>
            )
          })
        )
      }
    </TabList>

  {days.map((day) => (
    <TabPanel key={day}>
      {/* Check if data exists for the day, else fallback to empty array */}
      {(dayWiseTimings[day] ?? []).map((item, index) => (
        <div key={index} className="time_slot_wrap">
          <div className="start_time">
            <label>Start Time:</label>
            <TimePicker
              value={item.startTime}
              onChange={(e) => updateTime(day, index, 'startTime', e)}
            />
          </div>
          <div className="end_time">
            <label>End Time:</label>
            <TimePicker
              value={item.endTime}
              onChange={(e) => updateTime(day, index, 'endTime', e)}
            />
          </div>
          <button onClick={() => deleteTiming(day, index)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem' }}>
                  Delete
            </button>
        </div>
      ))}

      {/* Add button for current day */}
      <div className="add_btn_wrap">
        <button className='button button-primary-outline button-fit mx-auto' onClick={() => addTiming(day)}>Add new timing</button>
      </div>
    </TabPanel>
  ))}


     
    {/* <TabPanel>
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
              <div className="add_btn_wrap">
                <button onClick={()=>setTimings(prev => [...prev, defaultTiming])} className='button button-primary-outline button-fit mx-auto'>Add new timing</button>
              </div>
    </TabPanel> */}

  </Tabs>
        </div>

        
      </div>

    </div>
    </div>
  );
}
export default AddTimeSlots;




