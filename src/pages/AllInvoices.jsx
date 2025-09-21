import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { getInvoicesListAPI, searchInvoicesAPI, printInvoiceAPI, printInvoiceByRangeAPI } from "../service/api";
import { IoMdPrint } from "react-icons/io";
import FullPageLoader from "../components/FullPageLoader";
import Swal from "sweetalert2";
import DatePicker from "react-date-picker";
import { format } from "date-fns";
import { debounce } from "../../utils/helpers";

const AllInvoices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [invoicesList, setInvoicesList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  async function getInvoicesList() {
    try {
      const payload = {
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      };
      setIsLoading(true);
      const response = await getInvoicesListAPI(payload);
      setIsLoading(false);
      console.log(response);
      if (response.invoices && response.invoices.length > 0) {
        setInvoicesList(response.invoices);
      } else
        return Swal.fire(
          "No invoices found",
          "Unable to find any invoices in the database",
          "error"
        );
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  function printInvoice(invoiceNumber) {
    return async function () {
      setIsLoading(true);
      const response = await printInvoiceAPI(invoiceNumber);
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
  }, [searchQuery]);
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
          <div className='table-filters'>
          <form className='table-filter'>
            <input onChange={debounce((e) => setSearchQuery(e.target.value), 500)} type="text" name="" id="" className='table-filter-input' placeholder='Search by name, username, or phone number' />
          </form>
        </div>
          <table className="table bordered">
            <thead>
              <tr>
                <th>
                  <div className="table-cell">Invoice number</div>
                </th>
                <th>
                  <div className="table-cell">Inoice date</div>
                </th>
                <th>
                  <div className="table-cell">Student name</div>
                </th>
                <th>
                  <div className="table-cell">Description</div>
                </th>
                <th>
                  <div className="table-cell">Notes</div>
                </th>
                <th>
                  <div className="table-cell">VAT amount</div>
                </th>
                <th>
                  <div className="table-cell">VAT rate</div>
                </th>
                <th>
                  <div className="table-cell">Amount</div>
                </th>
                <th>
                  <div className="table-cell">Quantity</div>
                </th>
                <th>
                  <div className="table-cell">Net mount</div>
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
                    <div className="table-cell">
                      {format(item.invoice_date, "dd/MM/yyyy")}
                    </div>
                  </td>
                  <td>
                    <div className="table-cell">{item.student_name}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.description_1}</div>
                    <div className="table-cell">{item.description_2}</div>
                    <div className="table-cell">{item.description_3}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.notes}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.vat_amount}</div>
                    <div className="table-cell">{item.vat_amount_2}</div>
                    <div className="table-cell">{item.vat_amount_3}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.vat_rate}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.amount}</div>
                    <div className="table-cell">{item.amount_2}</div>
                    <div className="table-cell">{item.amount_3}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.quantity_1}</div>
                    <div className="table-cell">{item.quantity_2}</div>
                    <div className="table-cell">{item.quantity_3}</div>
                  </td>
                  <td>
                    <div className="table-cell">{item.net_amount}</div>
                    <div className="table-cell">{item.net_amount_2}</div>
                    <div className="table-cell">{item.net_amount_3}</div>
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
          {/* <button onClick={exportNeedTest} className='button button-primary flex items-center gap-2'>
          <IoMdPrint />
          <span>Print need test</span>
        </button> */}
        </div>
      </div>
    </>
  );
};

export default AllInvoices;
