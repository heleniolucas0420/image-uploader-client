import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DropZone from '../drop-zone/drop-zone.component';
import CustomButton from '../custom-button/custom-button.component';

import './card.styles.scss';

const Card = () => {
  const [file, setFile] = useState(null);
  const [image_url, setImageUrl] = useState(null);
  const [response_data, setResponseData] = useState('');
  const [copied, setCopied] = useState(false);

  const onResponseSuccess = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      const form_data = new FormData();
      form_data.append('image', file);

      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000/images/upload-image'
          : '/images/upload-image';

      axios
        .post(url, form_data)
        .then((response) => {
          setResponseData(response.data.response_data);
          onResponseSuccess(file);
        })
        .catch((error) => console.log(error));
    }
  }, [file]);

  const handleFileDrop = (event) => {
    setFile(event.dataTransfer.files[0]);
  };

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCopyToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(response_data.image_url);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${image_url ? 'loaded' : 'card-container'}`}>
      <div className='card-container__elements'>
        {image_url ? (
          <React.Fragment>
            <span className='material-symbols-rounded image-uploaded__icon'>
              task_alt
            </span>
            <h3 className='card-title'>Uploaded Successfully!</h3>
            <DropZone handleFileDrop={handleFileDrop} image_src={image_url} />
            <div className='image-link__container'>
              <span className='image-link__link'>
                {response_data.image_url}
              </span>
              <CustomButton
                handleInputChange={handleInputChange}
                loaded={image_url}
                handleCopyToClipboard={handleCopyToClipboard}
                text={copied ? 'Copied': 'Copy Link'}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2 className='card-title'>Upload your image</h2>
            <span className='card-file-type'>File should be Jpeg, Png,...</span>
            <DropZone handleFileDrop={handleFileDrop} image_src={image_url} />
            <span className='card-text'>Or</span>
            <div className='buttons'>
              <CustomButton handleInputChange={handleInputChange} />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Card;
