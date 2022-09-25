import React, { useRef } from 'react';

import './drop-zone.styles.scss';


const DropZone = ({ handleFileDrop, image_src }) => {
  const wrappedRef = useRef(null);

  const onDragOver = event => {
    event.preventDefault()
    wrappedRef.current.classList.add('drop-zone__over')
  };
  const onDragLeave = () => wrappedRef.current.classList.remove('drop-zone__over');
  const onDragEnd = () => wrappedRef.current.classList.remove('drop-zone__over');

  const onDrop = event => {
    event.preventDefault();

    handleFileDrop(event);
    wrappedRef.current.classList.remove('drop-zone__over');
  }

  const handlePageReload = event => {
    event.preventDefault();

    window.location.reload()
  }

  return (
    image_src ? (
      <div className='background-image__container' onClick={handlePageReload}>
        <img className='background-image' src={image_src} alt='server-response' />
      </div>
    ) : (
      <div
        ref={wrappedRef}
        className='drop-zone'
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
      >
        <input type='file' name='file' id='drop-zone__input' accept='image/*' />
        <span className='material-icons-outlined drop-zone__image'>image</span>
        <span className='drop-zone__text'>Drag & Drop your image here</span>
      </div>
    )
  );
};


export default DropZone;