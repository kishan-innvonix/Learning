import React from 'react'
import Hi from './Hi'

const Hello = ({firstname, ...rest}) => {
    // const {firstname} = props

  return (
  <>
    <div>Hello {firstname}</div>
    <div>Hello {JSON.stringify(rest)}</div>
    <Hi greet="How are you" >
        This is the content pass as children</Hi>i
  </>
  )
  
}

export default Hello