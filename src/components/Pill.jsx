import React from 'react'

const Pill = ({ active = false }) => {
  return (
    <div className={`pill ${active && "active"}`}></div>
  )
}

export default Pill