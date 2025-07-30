import Header from "../components/Header";
import { useState } from "react";
import TimePicker from "react-time-picker";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TimeSlotComponent from "../components/TimeSlotComponent";

function SetTimeSlots() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    // "Saturday",
    // "Sunday",
  ];

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/" />
      <div className="flex h-screen w-screen p-4">
        <div className="small-container">
          <div className="card">
            <Tabs>
              <TabList>
                {days.map((day) => (
                  <Tab key={day}>{day}</Tab>
                ))}
              </TabList>
              {days.map((day) => (
                <TabPanel key={day}>
                  <TimeSlotComponent day={day} />
                </TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SetTimeSlots;
