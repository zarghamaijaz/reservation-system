import { useEffect, useState } from "react";
import Header from "../components/Header";
import Checkbox from "../components/form-elements/Checkbox";
import { IoMdClose, IoMdPrint } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import Input from "../components/form-elements/Input";
import { useNavigate, useSearchParams } from "react-router";
import {
  deleteCustomerLessonAPI,
  createCustomerLessonAPI,
  markCustomerLessonAPI,
  getCustomerLessonsAPI,
  markCustomerAsFinishedAPI,
  printCustomerInvoiceAPI,
} from "../service/api";
import Swal from "sweetalert2";
import FullPageLoader from "../components/FullPageLoader";
import { format } from "date-fns";

const CustomerLessons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addLessonForm, setAddLessonForm] = useState(false);
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    notes: "",
    startDate: "",
    from: "",
    to: "",
    type: "lesson",
    paidStatus: false,
  });
  const customerId = searchParams.get("customer-id");
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  if (!customerId) {
    navigate("/all-customers");
  }
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
  function handleTimeChange(name) {
    return function (e) {
      if (e === null) {
        return setFormData((prev) => ({ ...prev, [name]: "" }));
      }
      return setFormData((prev) => ({ ...prev, [name]: e }));
    };
  }
  function handleDateChange(name) {
    return function (e) {
      if (e === null) {
        return setFormData((prev) => ({ ...prev, [name]: "" }));
      }
      return setFormData((prev) => ({ ...prev, [name]: e }));
    };
  }
  async function printInvoice(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await printCustomerInvoiceAPI(customerId);
    setIsLoading(false);
    // Extract filename from headers (if provided)
    let filename = "Customers-invoice.pdf";

    // Create a Blob from the response
    const blob = new Blob([response], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  async function getCustomerLessons() {
    setIsLoading(true);
    const response = await getCustomerLessonsAPI(customerId);
    setIsLoading(false);
    if (response.lessons) {
      setTableRows(response.lessons);
    }
    console.log(response);
  }

  useEffect(() => {
    getCustomerLessons();
  }, []);

  async function handleSubmit(e) {
    try {
      setIsLoading(true);
      const payload = {
        ...formData,
        date: format(formData.startDate, "yyyy-MM-dd"),
        studentId: customerId,
      };
      console.log(payload);
      const response = await createCustomerLessonAPI(payload);
      Swal.fire(
        "Lessons updated",
        "The lessons are updated successfully",
        "success"
      );
      setIsLoading(false);
      setAddLessonForm(false);
      getCustomerLessons();
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return Swal.fire("Error", "An error occured", "error");
    }
  }

  function deleteCustomerLesson(id) {
    return function (e) {
      e.preventDefault();
      Swal.fire({
        title: "Delete lesson?",
        text: "This will permanently delete the lesson. Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsLoading(true);
            const response = await deleteCustomerLessonAPI(id);
            setIsLoading(false);
            getCustomerLessons();
          } catch (err) {
            setIsLoading(false);
            console.error(err);
            return Swal.fire("Error", "An error occured", "error");
          }
        }
      });
    };
  }

  function markLesson(id, status){
    return async function () {
      try {
        setIsLoading(true);
        const response = await markCustomerLessonAPI(id, status);
        setIsLoading(false);
        getCustomerLessons();
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        return Swal.fire("Error", "An error occured", "error");
      }
    }
  }

  function markCustomerToFinished() {
    Swal.fire({
      title: "Mark finished?",
      text: "This will mark the customer as finished and will move them to the finished list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const response = await markCustomerAsFinishedAPI(customerId);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error(err);
          return Swal.fire("Error", "An error occured", "error");
        }
      }
    });
  }

  return (
    <>
      {isLoading && <FullPageLoader />}
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
              <Input
                label="Notes"
                onChange={handleChange("notes")}
                value={formData.notes}
                className="input"
                type="text"
                placeholder="Enter additional notes"
              />
              <div className="input-container">
                <label htmlFor="" className="label">
                  Type
                </label>
                <select
                  value={formData.type}
                  name="type"
                  id=""
                  className="input"
                  onChange={handleChange("type")}
                >
                  <option value="lesson">Lesson</option>
                  <option value="test">Test</option>
                  <option value="booking">Booking</option>
                </select>
              </div>
              <div className="input-container">
                <label className="label">Start date</label>
                <DatePicker
                  format="dd/MM/yyyy"
                  onChange={handleDateChange("startDate")}
                  value={formData.startDate}
                />
              </div>
              <div className="input-container custom-time-picker">
                <label className="label">Start time</label>
                <TimePicker
                  value={formData.from}
                  onChange={handleTimeChange("from")}
                />
              </div>
              <div className="input-container custom-time-picker">
                <label className="label">End time</label>
                <TimePicker
                  value={formData.to}
                  onChange={handleTimeChange("to")}
                />
              </div>
              <Input
                label="Amount (€)"
                onChange={handleChange("amount", "phoneNumber")}
                value={formData.amount}
                className="input"
                type="text"
                placeholder="Enter lesson amount"
              />
              <div className="input-container">
                <label htmlFor="" className="label">
                  Paid?
                </label>
                <Checkbox
                  checked={formData.paidStatus}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paidStatus: !prev.paidStatus,
                    }))
                  }
                />
              </div>
              <div className="input-container">
                <button
                  onClick={handleSubmit}
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
                    <div className="table-cell">Amount (€)</div>
                  </th>
                  <th>
                    <div className="table-cell">Type</div>
                  </th>
                  <th className="table-action-head">
                    <div className="table-cell">Paid</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-cell">{item.description}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.date}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.from}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.to}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.notes}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.amount}</div>
                    </td>
                    <td>
                      <div className="table-cell">{item.type}</div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <div className="table-actions">
                          <Checkbox
                            checked={item.paidStatus}
                            onClick={markLesson(item.id, item.paidStatus ? "unpay" : "pay")}
                          />
                          <button
                            onClick={deleteCustomerLesson(item.id)}
                            className="table-action action-danger"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="button-group">
              <button
                onClick={(e) => setAddLessonForm(true)}
                className="button button-primary-outline"
              >
                Add new lesson
              </button>
              <button onClick={handleSubmit} className="button button-primary">
                Save details
              </button>
            </div>
          </div>
        </div>
        <div className="button-group">
          <button
            onClick={(e) => navigate("/customer-details")}
            className="button button-primary-outline"
          >
            Back
          </button>
          <button
            onClick={printInvoice}
            className="button button-primary-outline flex items-center gap-2"
          >
            <IoMdPrint />
            <span>Print invoice</span>
          </button>
          <button
            onClick={markCustomerToFinished}
            className="button button-primary flex items-center gap-2"
          >
            <PiStudentFill />
            <span>Finish</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerLessons;
