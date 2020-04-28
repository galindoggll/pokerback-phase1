import React from 'react'
import PropTypes from 'prop-types'

const displayName = 'TotalRaked'
const propTypes = {
  index: PropTypes.number,
}

const TotalRaked = ({index}) => {
  return (
    <div>
      <h4>Total Raked</h4>
      <table className="table table-responsive table-striped">
        <tbody>
        <tr>
          <td>12/10</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>12/17</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>12/24</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>12/30</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>1/10</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>1/17</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>1/24</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>1/30</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>2/10</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>2/17</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>2/24</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>2/30</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>3/10</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>3/17</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>3/24</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>3/30</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>4/10</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>4/17</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>4/24</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        <tr>
          <td>4/30</td>
          <td>{Math.floor(Math.random() * 400)}</td>
          <td><input type="checkbox"/></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

TotalRaked.displayName = displayName
TotalRaked.propTypes = propTypes

export default TotalRaked