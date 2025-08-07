import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "../components/Header";
import FullPageLoader from "../components/FullPageLoader";
import { useSearchParams } from "react-router";
// import BookNowCard from "../components/form-elements/BookNowCard";
import { getBookingListByDateAPI, bookSlotAPI } from "../service/api";
import BookNowCard from "../components/form-elements/BookNowCard";
import { IoMdClose } from "react-icons/io";
import Input from "../components/form-elements/Input";
import { getJwtData } from "../../utils/jwtData.utils";
import Swal from "sweetalert2";

const INTITIAL_FORMDATA = {
  name: "",
  phoneNumber: "",
  notes: "",
};

const BookingList = () => {
  const jwtData = getJwtData();
  const [searchParams] = useSearchParams();
  const [bookSlotPopup, setBookSlotPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectedDate = searchParams.get("selected-date");
  const [bookingList, setBookingList] = useState([]);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  function handleChange(name, type) {
    return function (e) {
      const input = e.target.value;
      // Only allow digits
      if (type === "phoneNumber") {
        if (/^\d*$/.test(input)) {
          return setFormData((prev) => ({ ...prev, [name]: input }));
        }
      } else {
        return setFormData((prev) => ({ ...prev, [name]: input }));
      }
    };
  }

  async function handleBookSlot(e) {
    e.preventDefault();
    try {
      const payload = {
        name: jwtData ? jwtData.name : formData.name,
        phonenumber: jwtData ? jwtData.phone_number : formData.phoneNumber,
        notes: formData.notes,

        date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: bookSlotPopup.startTime,
        end_time: bookSlotPopup.endTime,
      }
      setIsLoading(true);
      const response = await bookSlotAPI(payload);
      if(response.success){
        Swal.fire({
          icon: "success",
          title: "Session booked",
          text: response.message,
        });
        setBookSlotPopup(false);
      }
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "An error occured on the server."
      });
      console.error(err);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getBookingListByDate();
  }, []);

  const getBookingListByDate = () => {
    setIsLoading(true);
    getBookingListByDateAPI()
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setBookingList(data.data);
          console.log("succes", data);
        } else {
          console.log("err", data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  

  return (
    <>
      {isLoading && <FullPageLoader />}
      {bookSlotPopup && (
        <div className="modal-container">
          <div className="small-container">
            <div className="card">
              <button
                onClick={(e) => setBookSlotPopup(false)}
                className="modal-close"
              >
                <IoMdClose />
              </button>
              <h2 className="card-title">Book slot</h2>
              <p className="card-description">
                Please provide your basic information in order to book this
                slot.
              </p>
              {!jwtData && (
                <>
                  <Input
                    type="text"
                    label="Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange("name")}
                  />
                  <Input
                    type="text"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange("phoneNumber", "phoneNumber")}
                  />
                </>
              )}
              <Input
                type="text"
                label="Notes"
                placeholder="Add optional notes"
                value={formData.notes}
                onChange={handleChange("notes")}
              />
              <div className="button-group">
                <button
                  disabled={!jwtData ? (formData.name === "" || formData.phoneNumber === "") : null}
                  onClick={handleBookSlot}
                  className="button button-primary"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/booking-dates" />
        <div className="small-container">
          <h2 className="section-title">Available slots for {selectedDate}</h2>
          <div className="row">
            {bookingList.length > 0
              ? bookingList.map((l) => {
                return (
                  <BookNowCard
                    key={l._id}
                    timeStart={l.startTime}
                    timeEnd={l.endTime}
                    onBook={() => {
                      setBookSlotPopup(l);
                    }}
                  />
                );
              })
              : ""}
            {/* <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">02:00 to 03:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">03:30 to 05:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">11:00 to 12:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">02:00 to 03:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">03:30 to 05:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingList;
