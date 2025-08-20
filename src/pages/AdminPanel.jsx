import React from 'react'

const AdminPanel = () => {
  return (
    <div className='custom-main-wrap'>
        <div className="heading-wrap">
            <h2 className='heading'>Hi,Welcome to Admin Dashboard</h2>
        </div>
        <div className="custom-cards-wrap">
            <div className="card custom-card">
                New
            </div>
            <div className="card custom-card">
                All Customers List
            </div>
            <div className="card custom-card">
                Finished Customers
            </div>
            <div className="card custom-card">
                Create Invoice
            </div>
            <div className="card custom-card">
                Invoices Folder
            </div>
            <div className="card custom-card">
                Expenses
            </div>
            <div className="card custom-card">
                V.A.T
            </div>
            <div className="card custom-card">
                Profit/Loss
            </div>
        </div>
    </div>
  )
}

export default AdminPanel