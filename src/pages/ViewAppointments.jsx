import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Header from "../components/Header";
import Calendar from "react-calendar";
import { getAdminBookingListByDateAPI, bookSlotAPI } from "../service/api";
import Swal from "sweetalert2";
import FullPageLoader from "../components/FullPageLoader";
import { format } from 'date-fns';

const ViewAppointments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14);

  async function getBookingsByDate() {
    try {
      setIsLoading(true);
      const date = format(selectedDate, "yyyy-MM-dd");
      const response = await getAdminBookingListByDateAPI(date);
      setIsLoading(false);
      if (response.bookings) {
        setTimeSlots(response.bookings);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      Swal.fire("Error", "An error occured", "error");
    }
  }
  useEffect(() => {
    getBookingsByDate();
  }, [selectedDate]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink={`/driving-instructor-home`} />
        <div className="row">
          <div className="col-33 mobile-col-100">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={today}
              maxDate={twoWeeksLater}
            />
          </div>
          <div className="col-66 mobile-col-100">
            {selectedDate && (
              <div className="booking-list-container">
                <div className="booking-header">
                  <h3 className="booking-title">
                    Selected Date: {selectedDate.toLocaleDateString()}
                  </h3>
                </div>
                {timeSlots.map((item) => (
                  <button
                    key={item.time_slot}
                    className={`booking-button ${
                      item.is_available ? "" : "booked"
                    }`}
                  >
                    <div className="booking-from">{item.student_name}</div>
                    <div className="booking-from">{item.start_time}</div>
                    <div className="booking-to">{item.end_time}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAppointments;
