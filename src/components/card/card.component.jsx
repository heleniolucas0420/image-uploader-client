import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DropZone from '../drop-zone/drop-zone.component';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import './card.styles.scss';

const Card = () => {
  const [file, setFile] = useState(null);
  const [image_url, setImageUrl] = useState(null);
  const [response_data, setResponseData] = useState('');
  const [copied, setCopied] = useState(false);
  const [is_loading, setIsLoading] = useState(false);

  const onResponseSuccess = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      setIsLoading(true);

      const form_data = new FormData();
      form_data.append('image', file);

      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000/images/upload-image'
          : 'https://murmuring-waters-99242.herokuapp.com/images/upload-image';

      axios
        .post(url, form_data)
        .then((response) => {
          setResponseData(response.data.response_data);
          onResponseSuccess(file);

          toast.success(
            'Image uploaded successfuly! Click on the uploaded image to upload a new one🤩',
            {
              position: 'bottom-right',
              autoClose: 9000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Zoom,
            }
          );

          setIsLoading(false);
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
        {is_loading ? (
          <React.Fragment>
            <h2 className='card-title'>Loading...</h2>
            <Spinner />
          </React.Fragment>
        ) : image_url ? (
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
                text={copied ? 'Copied' : 'Copy Link'}
              />
            </div>
            <ToastContainer />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2 className='card-title'>Upload your image</h2>
            <span className='card-file-type'>
              File should be Jpeg, Png, ...
            </span>
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
