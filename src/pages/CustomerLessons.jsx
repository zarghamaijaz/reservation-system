import { useEffect, useState } from "react";
import Header from "../components/Header";
import Checkbox from "../components/form-elements/Checkbox"
import { IoMdPrint } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import Input from "../components/form-elements/Input";
import { useNavigate, useSearchParams } from "react-router";
import { addCustomerLessonsAPI, getCustomerLessonsAPI, updateCustomerDetailsAPI, printCustomerInvoiceAPI } from "../service/api";
import Swal from "sweetalert2";
import FullPageLoader from "../components/FullPageLoader";

const INITIAL_LESSON_ROW_DATA = {
  description:"",
  date: "",
  from: "",
  to: "",
  notes: "",
  amount:"",
  paidStatus: false,
}

const CustomerLessons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customer-id");
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  if(!customerId){
    navigate("/all-customers");
  }
  async function printInvoice(e){
    e.preventDefault();
    setIsLoading(true);
    const response = await printCustomerInvoiceAPI(customerId);
    setIsLoading(false);
    // Extract filename from headers (if provided)
    let filename = "Customers-need-test.pdf";

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

  async function getCustomerLessons(){
    setIsLoading(true);
    const response = await getCustomerLessonsAPI(customerId);
    setIsLoading(false);
    if(response.lessons && response.lessons.length > 0){
      setTableRows(response.lessons)
    }
    console.log(response)
  }

  useEffect(()=>{
    getCustomerLessons();
  }, [])

  async function handleSubmit(e){
    try{
      setIsLoading(true);
      const payload = {
        lessons: tableRows.map(item => ({...item, date: item.date}))
      }
      console.log(payload)
      const response = await addCustomerLessonsAPI(customerId, payload);
      Swal.fire("Lessons updated", "The lessons are updated successfully", "success");
      setIsLoading(false);
      console.log(response);
    }catch(err){
      setIsLoading(false);
      console.error(err);
      return Swal.fire("Error", "An error occured", "error");
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
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          const payload = {
            option: "finished"
          }
          setIsLoading(true);
          const response = await updateCustomerDetailsAPI(customerId, payload);
          setIsLoading(false);
        }catch(err){
          setIsLoading(false);
          console.error(err);
          return Swal.fire("Error", "An error occured", "error");
        }
      }
    });
  }

  return (
    <>
      {isLoading && <FullPageLoader/>}
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
                  <th className="table-action-head">
                    <div className="table-cell">Paid</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((item, index )=> (
                  <tr key={index}>
                    <td>
                      <div className="table-cell">
                        <Input placeholder="E.g. Parallel parking etc" containerClass="m-0" type="text" value={item.description} onChange={e=>{
                          const value = e.target.value;
                          const newData = tableRows.map((row, i) => {
                            if(i === index){
                              return {...row, description: value}
                            }
                            else return row;
                          });
                          setTableRows(newData);
                        }}/>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                          <DatePicker format="dd/MM/yyyy" onChange={value => {
                              const newData = tableRows.map((row, i)=>{
                                  if(i === index){
                                      return {...row, date: value?.toISOString().split("T")[0]}
                                  }
                                  else return row;
                              })
                              setTableRows(newData);
                          }} value={item.date} />
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <TimePicker
                          format="HH:mm"
                          value={item.from}
                          onChange={value => {
                              const newData = tableRows.map((row, i)=>{
                                  if(i === index){
                                      return {...row, from: value}
                                  }
                                  else return row;
                              })
                              setTableRows(newData);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <TimePicker
                          format="HH:mm"
                          value={item.to}
                          onChange={value => {
                              const newData = tableRows.map((row, i)=>{
                                  if(i === index){
                                      return {...row, to: value}
                                  }
                                  else return row;
                              })
                              setTableRows(newData);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <Input placeholder="Leave a note for customer" containerClass="m-0" type="text" value={item.notes} onChange={e=>{
                          const value = e.target.value;
                          const newData = tableRows.map((row, i) => {
                            if(i === index){
                              return {...row, notes: value}
                            }
                            else return row;
                          });
                          setTableRows(newData);
                        }}/>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <Input placeholder="Amount in €" containerClass="m-0" type="number" value={item.amount} onChange={e=>{
                          const value = e.target.value;
                          const newData = tableRows.map((row, i) => {
                            if(i === index){
                              return {...row, amount: value}
                            }
                            else return row;
                          });
                          setTableRows(newData);
                        }}/>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell">
                        <div className="table-actions">
                          <Checkbox
                            checked={item.paidStatus}
                            onClick={e => {
                              const newData = tableRows.map((row, i) => {
                                if(i === index){
                                  return {...row, paidStatus: !row.paidStatus}
                                }
                                else return row;
                              });
                              setTableRows(newData);
                            }}
                          />
                          <button onClick={e => {
                            const newData = tableRows.filter((_, i) => {
                                if(i === index){
                                  return false;
                                }
                                else return true;
                            });
                            setTableRows(newData);
                        }} className='table-action action-danger'>
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
              <button onClick={()=>setTableRows(prev => [...prev, INITIAL_LESSON_ROW_DATA])} className="button button-primary-outline" >Add new lesson</button>
              <button onClick={handleSubmit} className="button button-primary" >Save details</button>
            </div>
          </div>
        </div>
        <div className="button-group">
          <button onClick={(e) => navigate("/customer-details")} className="button button-primary-outline" >Back</button>
          <button onClick={printInvoice} className="button button-primary-outline flex items-center gap-2" >
            <IoMdPrint />
            <span>Print invoice</span>
          </button>
          <button onClick={markCustomerToFinished} className="button button-primary flex items-center gap-2">
            <PiStudentFill />
            <span>Finish</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerLessons;