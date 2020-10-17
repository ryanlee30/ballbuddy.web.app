import React from 'react'
import './styles.css'
import SoundButtons from './SoundButtons'
import InputForm from './InputForm'

function Commands() {
  return (
        <div className="commands">
            <SoundButtons></SoundButtons>
            <InputForm />
        </div>
    )
}
export default Commands
