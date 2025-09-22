import { useState } from "react";
import Header from "../components/Header";
import { TfiCheckBox } from "react-icons/tfi";
import { MdCancelPresentation } from "react-icons/md";
import { IoMdClose, IoMdPrint } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import Input from "../components/form-elements/Input";
import { useNavigate } from "react-router";

const CustomerLessons = () => {
  const navigate = useNavigate();
  const [addLessonForm, setAddLessonForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    price: "",
  });
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

  return (
    <>
      {addLessonForm && (
        <div className="modal-container">
          <div className="small-container">
            <div className="card">
              <button
                onClick={(e) => setAddLessonForm(false)}
                className="modal-close"
              >
                <IoMdClose />
              </button>
              <h1 className="card-title">Add lesson</h1>
              <p className="card-description">
                Create a lesson for this customer
              </p>
              <Input
                label="Description"
                onChange={handleChange("description")}
                value={formData.description}
                className="input"
                type="text"
                placeholder="Enter description"
              />
              <div className="input-container">
                <label className="label">Date of birth</label>
                <DatePicker format="dd/MM/yyyy" onChange={setStartDate} value={startDate} />
              </div>
              <div className="input-container custom-time-picker">
                <label className="label">Start time</label>
                <TimePicker
                  value={formData.startTime}
                  format="HH:mm" // 24-hour format
                  onChange={(e) => {
                    handleChange("startTime", e);
                  }}
                />
              </div>
              <div className="input-container custom-time-picker">
                <label className="label">End time</label>
                <TimePicker
                  value={formData.endTime}
                  format="HH:mm" // 24-hour format
                  onChange={(e) => {
                    handleChange("endTime", e);
                  }}
                />
              </div>
              <Input
                label="Price (€)"
                onChange={handleChange("price")}
                value={formData.price}
                className="input"
                type="text"
                placeholder="Enter lesson price"
              />
              <div className="input-container">
                <button
                  onClick={(e) => setAddLessonForm(false)}
                  className="button button-primary"
                >
                  Add lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/customer-details" />
        <div className="student-details-container">
          <h2 className="section-title">Lesson Analysis</h2>
          <div className="table-container">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>
                    <div className="table-cell">Description</div>
                  </th>
                  <th>
                    <div className="table-cell">Date</div>
                  </th>
                  <th>
                    <div className="table-cell">From</div>
                  </th>
                  <th>
                    <div className="table-cell">To</div>
                  </th>
                  <th>
                    <div className="table-cell">Notes</div>
                  </th>
                  <th>
                    <div className="table-cell">Amount</div>
                  </th>
                  <th className="table-action-head">
                    <div className="table-cell">Paid</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-cell">
                      Lesson description to be added here
                    </div>
                  </td>
                  <td>
                    <div className="table-cell">01/8/2025</div>
                  </td>
                  <td>
                    <div className="table-cell">02:00</div>
                  </td>
                  <td>
                    <div className="table-cell">03:30</div>
                  </td>
                  <td>
                    <div className="table-cell">Notes go here</div>
                  </td>
                  <td>
                    <div className="table-cell">€60</div>
                  </td>
                  <td>
                    <div className="table-cell">
                      <div className="table-actions">
                        <button className="table-action action-primary">
                          <TfiCheckBox />
                        </button>
                        <button className="table-action action-danger">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table-cell">
                      Lesson description to be added here
                    </div>
                  </td>
                  <td>
                    <div className="table-cell">01/8/2025</div>
                  </td>
                  <td>
                    <div className="table-cell">02:00</div>
                  </td>
                  <td>
                    <div className="table-cell">03:30</div>
                  </td>
                  <td>
                    <div className="table-cell">Notes go here</div>
                  </td>
                  <td>
                    <div className="table-cell">€50</div>
                  </td>
                  <td>
                    <div className="table-cell">
                      <div className="table-actions">
                        <button className="table-action action-danger">
                          <MdCancelPresentation />
                        </button>
                        <button className="table-action action-danger">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table-cell">
                      Lesson description to be added here
                    </div>
                  </td>
                  <td>
                    <div className="table-cell">01/8/2025</div>
                  </td>
                  <td>
                    <div className="table-cell">02:00</div>
                  </td>
                  <td>
                    <div className="table-cell">03:30</div>
                  </td>
                  <td>
                    <div className="table-cell">Notes go here</div>
                  </td>
                  <td>
                    <div className="table-cell">€45</div>
                  </td>
                  <td>
                    <div className="table-cell">
                      <div className="table-actions">
                        <button className="table-action action-danger">
                          <MdCancelPresentation />
                        </button>
                        <button className="table-action action-danger">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                  <td>
                    <div className="table-cell">Total: €155</div>
                  </td>
                  <td>
                    <div className="table-cell"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-group">
            <button onClick={(e) => navigate("/customer-details")} className="button button-primary-outline" >Back</button>
            <button onClick={(e) => setAddLessonForm(true)} className="button button-primary-outline" >Add lesson</button>
            <button className="button button-primary-outline flex items-center gap-2" >
              <IoMdPrint />
              <span>Print invoice</span>
            </button>
            <button className="button button-primary">Finish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerLessons;