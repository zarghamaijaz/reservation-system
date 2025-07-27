import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { isSameDay, addDays } from 'date-fns';
import { DayPicker } from "react-day-picker";

const BookingDates = () => {
  const naviagte = useNavigate();
  const [selected, setSelected] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time
  const twoWeeksLater = addDays(today, 13);

  // Create allowed dates (14 days, excluding weekends)
  const allowedDates = Array.from({ length: 14 }, (_, i) => addDays(today, i)).filter(
    (date) => date.getDay() !== 0 && date.getDay() !== 6
  );

  const handleSelect = (date) => {
    if (!date) return;
    // Only allow selecting if in allowedDates
    const isAllowed = allowedDates.some((d) => isSameDay(d, date));
    if (isAllowed) {
      setSelected(date);
      console.log('Selected:', date.toDateString());
      naviagte(`/booking-list?selected-date=${date.toDateString()}`)
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/student-home" />
      <div className="small-container">
        <h2 className="section-title">Select a date</h2>
        <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        fromDate={today}
        toDate={twoWeeksLater}
        disabled={[
          { dayOfWeek: [0, 6] }, // Disable weekends
          { before: today, after: twoWeeksLater },
        ]}
        modifiersClassNames={{
          selected: 'selected-day',
          today: 'today-highlight',
          disabled: 'disabled-day',
        }}
        showOutsideDays={false}
      />
      </div>
    </div>
  );
};

export default BookingDates;
