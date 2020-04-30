import React from "react"

const displayName = "HomePageHeader"

function Header() {
  return (
    <div className="container">
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Poker Rakeback</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum nunc sit amet dictum dictum.
          In tristique porta magna, id vehicula lorem bibendum eget. Proin consequat tristique feugiat.</p>
      </div>
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Super Agent</h4>
          </div>
          <div className="card-body">

          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Agent</h4>
          </div>
          <div className="card-body">

          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Player</h4>
          </div>
          <div className="card-body">

          </div>
        </div>
      </div>
    </div>
  )
}

Header.displayName = displayName

export default Header
