import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className='button' onClick={props.changeJoke}>Change the joke</button>
    </div>
  )
}

export default Button
