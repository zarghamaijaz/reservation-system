
const BookNowCard = ({timeStart,timeEnd,date}) => {
    
  return (
    <div className="col-50">
        <div className="tile">
            <h4 className="tile-title">{date}</h4>
            <p className="tile-description">{timeStart} to {timeEnd}</p>
            <button className="button button-primary">Book now</button>
        </div>
    </div>
  )
}

export default BookNowCard