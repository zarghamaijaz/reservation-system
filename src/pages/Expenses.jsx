import React from 'react'

const Expenses = () => {
  return (
    <div className='custom-main-wrap'>
        <div className="heading-wrap">
            <h2 className='heading'>All Expenses</h2>
        </div>
        <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Vat</th>
                  <th>%</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/01/2000</td>
                  <td>some description</td>
                  <td>120</td>
                  <td>auto</td>
                  <td>19%</td>
                  <td>Manual</td>
                </tr>
                <tr>
                  <td>01/01/2000</td>
                  <td>some description</td>
                  <td>120</td>
                  <td>auto</td>
                  <td>19%</td>
                  <td>Manual</td>
                </tr>
                <tr>
                  <td>01/01/2000</td>
                  <td>some description</td>
                  <td>120</td>
                  <td>auto</td>
                  <td>19%</td>
                  <td>Manual</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default Expenses