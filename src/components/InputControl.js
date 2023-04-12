import React from 'react'

const InputControl = (props) => {
  return (
    <div className='flex flex-col w-full my-2'>
        {props.label &&<label className='font-bold'>{props.label}</label>}
        <input className='border border-purple-400 rounded-md p-2' type={props.label==="Password"?"password":"text"} {...props}/>
    </div>
  )
}

export default InputControl