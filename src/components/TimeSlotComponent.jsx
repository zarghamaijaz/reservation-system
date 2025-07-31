import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getTimingsByDayAPI } from "../service/api";
import FullPageLoader from "./FullPageLoader";
const defaultTiming = {
  startTime: "",
  endTime: "",
};

const TimeSlotComponent = ({ day }) => {
  const [timings, setTimings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getTimingsByDay(){
    try{
      setIsLoading(true);
      const response = await getTimingsByDayAPI(day);
      setIsLoading(false);
      if(response.success){
        setTimings(response.data);
      }
    }
    catch(err){
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getTimingsByDay();
  },[])

  function removeSlot(index){
    return function(e){
        e.preventDefault();
        const newTimings = timings.filter((_, i) => i !== index);
        setTimings(newTimings);
    }
  }

  function updateTime(index, type) {
    return function (e) {
      const newTimings = timings.map((item, i) =>
        i !== index ? item : { ...item, [type]: e }
      );
      setTimings(newTimings);
    };
  }

  return day ? (
    <>
    {isLoading && (
      <FullPageLoader />
    )}
      {timings.length === 0 ? (
        <div>There is no timing added yet. Please add a new timing.</div>
      ):timings.map((item, index) => (
        <div key={index} className="time_slot_wrap">
          <div className="start_time">
            <label>Start Time:</label>
            <TimePicker
              value={item.startTime}
              onChange={updateTime(index, "startTime")}
            />
          </div>
          <div className="end_time">
            <label>End Time:</label>
            <TimePicker
              value={item.endTime}
              onChange={updateTime(index, "endTime")}
            />
          </div>
          <button onClick={removeSlot(index)} className="time_slot_remove">
            <RiDeleteBin6Line/>
          </button>
        </div>
      ))}
      <div className="button-group">
        <button
          onClick={() => setTimings((prev) => [...prev, defaultTiming])}
          className="button button-primary-outline"
        >
          Add new time
        </button>
        <button className="button button-primary">Save</button>
      </div>
    </>
  ) : (
    <div>No day provided</div>
  );
};

export default TimeSlotComponent;
