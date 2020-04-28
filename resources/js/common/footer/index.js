import React from 'react'
import moment from "moment";

const Footer = () => (
  <div className="container">
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
              <div className="col-12 col-md">
                  <img className="mb-2" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24"/>
                  <small className="d-block mb-3 text-muted">Bluebird Gaming Inc.&copy; 2020</small>
              </div>
              <div className="col-6 col-md">
                  <h5>Features</h5>
                  <ul className="list-unstyled text-small">
                      <li><a className="text-muted" href="#">Poker Rakeback</a></li>
                      <li><a className="text-muted" href="#">Players</a></li>
                  </ul>
              </div>
              <div className="col-6 col-md">
                  <h5>About</h5>
                  <ul className="list-unstyled text-small">
                      <li><a className="text-muted" href="#">Team</a></li>
                      <li><a className="text-muted" href="#">Locations</a></li>
                      <li><a className="text-muted" href="#">Privacy</a></li>
                      <li><a className="text-muted" href="#">Terms</a></li>
                  </ul>
              </div>
          </div>
      </footer>
  </div>)

export default Footer
