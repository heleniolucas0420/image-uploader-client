import React from 'react';
import './custom-button.styles.scss';


const CustomButton = ({ handleInputChange, loaded, handleCopyToClipboard, text }) => (
  <div className='custom-button__container'>
    {
      loaded ? (
        <button type='button' className='custom-button__copy-link' onClick={handleCopyToClipboard}>{text}</button>
      ) : (
        <React.Fragment>
          <input type='file' id='choose-image' name='choose-image' accept='image/*' onChange={handleInputChange}/>
          <label htmlFor='choose-image' className='custom-button'>
            <span className='material-icons'>add_photo_alternate</span> &nbsp;
            Choose a file
          </label>
        </React.Fragment>
      )
    }
  </div>
);


export default CustomButton;