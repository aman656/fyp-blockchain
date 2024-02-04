import React, { useState } from 'react';
import './CandidateForm.css'
import { storage } from '../firebase'
import { v4 } from 'uuid'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const CandidateForm = ({ onAddCandidate, type, add1, setAdd1, add2, setAdd2, setCandidates, candidate, index }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imagec, setImage] = useState(null);
  const handleInputChange = (formIndex, fieldName, value) => {
    setCandidates((candidate) => {
      const updatedFormValues = [...candidate];
      if (!updatedFormValues[formIndex]) {
        updatedFormValues[formIndex] = {};
      }
      updatedFormValues[formIndex][fieldName] = value;
      return updatedFormValues
    });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imagec == null) {
      console.log("Empty")
      return
    }
    const imageRef = ref(storage, `images/${imagec.name + v4()}`)
    const uploadTask = uploadBytesResumable(imageRef, imagec);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
        });
      }
    );
  };
  const handlePicChangee = (formIndex, fieldName, event) => {
    const file = event.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        handleInputChange(formIndex, fieldName, file);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Candidate Name"
        required
        onChange={(e) => handleInputChange(index, "name", e.target.value)} />
      <input
        type="text"
        name="party"
        placeholder="Party Name"
        required
        onChange={(e) => handleInputChange(index, "party", e.target.value)} />
      <div className="file-input-container">
        <label className="file-input-label">
          Choose Candidate Image
          <input type="file"
            name="image" accept="image/*"
            onChange={(e) => {
              handlePicChangee(index, "imagec", e)
              // handleImageChange(e)
            }} />
        </label>
        {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
      </div>
    </form>
  );
};

export default CandidateForm;