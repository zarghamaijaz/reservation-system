import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Header from "../components/Header";
import Calendar from "react-calendar";
import { getBookingListByDateAPI, bookSlotAPI } from "../service/api";
import Swal from "sweetalert2";
import FullPageLoader from "../components/FullPageLoader";

const BookAppointment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14);

  async function getBookingsByDate() {
    try {
      setIsLoading(true);
      const payload = {
        date: selectedDate.toLocaleDateString("en-CA"),
      };
      console.log(payload)
      const response = await getBookingListByDateAPI(payload);
      setIsLoading(false);
      if (response.time_slots) {
        setTimeSlots(response.time_slots);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      Swal.fire("Error", "An error occured", "error");
    }
  }
  function bookSlot(data) {
    return async function (e) {
        e.preventDefault();
        console.log(data);
        Swal.fire({
        title: "Book appointment?",
        text: "Do you want to book this appointment?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "var(--clr-primary)",
        cancelButtonColor: "var(--clr-danger)",
        confirmButtonText: "Book"
        }).then(async (result) => {
        if (result.isConfirmed) {
            try{
                const payload = {
                    date: selectedDate.toISOString().split("T")[0],
                    description: "Booked by customer.",
                    notes: "Add notes here",
                    time_slot: data.slot,
                }
                setIsLoading(true);
                const response = await bookSlotAPI(payload);
                getBookingsByDate();
                setIsLoading(false);
    
            }catch (err) {
            setIsLoading(false);
            if(err.detail){
                Swal.fire("Error", err.detail, "error");
            }
            console.error(err);
            }
        }
        });
    };
  }
  useEffect(() => {
    getBookingsByDate();
  }, [selectedDate]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink={`/student-main?customer_id=${customerId}`} />
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
                    key={item.slot}
                    onClick={item.is_available ? bookSlot(item) : null}
                    className={`booking-button ${
                      item.is_available ? "" : "booked"
                    }`}
                  >
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

export default BookAppointment;
