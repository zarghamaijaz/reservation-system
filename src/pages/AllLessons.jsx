import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { getAllLessonsListAPI, searchInvoicesAPI, printAllLessonsListAPI,deletePrintRecordAPI, printInvoiceByRangeAPI } from "../service/api";
import { IoMdPrint } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import FullPageLoader from "../components/FullPageLoader";
import Swal from "sweetalert2";
import DatePicker from "react-date-picker";
import { format } from "date-fns";
import { debounce } from "../../utils/helpers";

const AllLessons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [invoicesList, setInvoicesList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pagesCount, setPagesCount] = useState(1);
  const [page, setPage] = useState(1);

  async function getInvoicesList() {
    try {
      const payload = {
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      };
      setIsLoading(true);
      const response = await getAllLessonsListAPI(payload, page);
      setIsLoading(false);
      console.log(response);
      setInvoicesList(response);
      setPagesCount(response.pages);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  function printInvoice(invoiceNumber) {
    return async function () {
        const payload = {
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      };
      setIsLoading(true);
      const response = await printAllLessonsListAPI(payload);
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
    };
  }
  function deleteInvoice(invoiceNumber) {
    return function(e){
      Swal.fire({
              title: "Delete invoice?",
              text: "This will permanently delete the invoice. Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  setIsLoading(true);
                  const response = await deletePrintRecordAPI(invoiceNumber);
                  setIsLoading(false);
                  getInvoicesList();
                } catch (err) {
                  setIsLoading(false);
                  console.error(err);
                  return Swal.fire("Error", "An error occured", "error");
                }
              }
            });
    }
    };

  async function printByDate() {
      const payload = {
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      };
      setIsLoading(true);
      const response = await printInvoiceByRangeAPI(payload);
      setIsLoading(false);
      // Extract filename from headers (if provided)
      let filename = "invoice-by-date.xlsx";

      // Create a Blob from the response
      const blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
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
    async function searchInvoices(){
        try{
          setIsLoading(true);
          const response = await searchInvoicesAPI(searchQuery);
          setIsLoading(false);
          setStudentsList(response);
          setPagesCount(1);
        }catch(err){
          console.error(err);
          setIsLoading(false);
        }
      }

    useEffect(()=>{
    if(searchQuery.length > 0) {searchInvoices();}
    
    else {getInvoicesList();}
  }, [searchQuery, page]);
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink="/driving-instructor-home" />
        <div className="row">
          <div className="col-50">
            <div className="input-container">
              <label className="label">From</label>
              <DatePicker
                format="dd/MM/yyyy"
                onChange={setStartDate}
                value={startDate}
              />
            </div>
          </div>
          <div className="col-50">
            <div className="input-container">
              <label className="label">Till</label>
              <DatePicker
                format="dd/MM/yyyy"
                onChange={setEndDate}
                value={endDate}
              />
            </div>
          </div>
          <div className="col-100">
            <div className="button-group">
              <button
                onClick={getInvoicesList}
                className="button button-primary"
              >
                Find
              </button>
              <button
                onClick={printByDate}
                className="button button-primary-outline"
              >
                Print
              </button>
            </div>
          </div>
        </div>
        <div className="table-container">
          {/* <div className='table-filters'>
          <form className='table-filter'>
            <input onChange={debounce((e) => setSearchQuery(e.target.value), 500)} type="text" name="" id="" className='table-filter-input' placeholder='Search by name, username, or phone number' />
          </form>
        </div> */}
          <table className="table bordered">
            <thead>
              <tr>
                <th>
                  <div className="table-cell">Invoice no</div>
                </th>
                <th>
                  <div className="table-cell">Student</div>
                </th>
                <th>
                  <div className="table-cell">VAT</div>
                </th>
                <th>
                  <div className="table-cell">Net</div>
                </th>
                <th>
                  <div className="table-cell">Total</div>
                </th>
                <th className="table-action-head">
                  <div className="table-cell">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoicesList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="table-cell">{item.invoice_number}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.student_name}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.vat_amount}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.net_amount}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.total_amount}</div>
                  </td>
                  <td>
                    <div className="table-cell">
                      <div className="table-actions">
                        <button
                          onClick={printInvoice(item.invoice_number)}
                          className="table-action action-danger"
                        >
                          <IoMdPrint />
                        </button>
                        <button
                          onClick={deleteInvoice(item.id)}
                          className="table-action action-danger"
                        >
                          <RiDeleteBinLine  />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-group">
          <Link
            to="/driving-instructor-home"
            className="button button-primary-outline"
          >
            Back
          </Link>
          {page > 1 && (
          <button onClick={()=>setPage(prev => prev - 1)} className='button button-primary flex items-center gap-2'>
            Previous page
          </button>
        )}
        {page < pagesCount && (
          <button onClick={()=>setPage(prev => prev + 1)} className='button button-primary flex items-center gap-2'>
            Next page
          </button>
        )}
          {/* <button onClick={exportNeedTest} className='button button-primary flex items-center gap-2'>
          <IoMdPrint />
          <span>Print need test</span>
        </button> */}
        </div>
      </div>
    </>
  );
};

export default AllLessons;
