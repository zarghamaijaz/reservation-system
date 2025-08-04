
const BookNowCard = ({timeStart, timeEnd,date, onBook}) => {
    
  return (
    <div className="col-50">
        <div className="tile">
            <h4 className="tile-title">{timeStart} to {timeEnd}</h4>
            {/* <p className="tile-description"></p> */}
            <button className="button button-primary" onClick={onBook}>Book now</button>
        </div>
    </div>
  )
}

export default BookNowCard