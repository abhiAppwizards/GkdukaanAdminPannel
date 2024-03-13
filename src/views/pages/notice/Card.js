import React from 'react'

function Card() {
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Notice</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the cards
            content.
          </p>
          <span className="card-link">Card link</span>
          <span className="card-link">Another link</span>
        </div>
      </div>
    </div>
  )
}

export default Card
