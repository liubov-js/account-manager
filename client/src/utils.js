import axios from './axios';

export const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export const getAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const handleChangePhoto = async (event, setImageUrl) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);

    const {data} = await axios.post('/upload', formData);
    setImageUrl(data.url);
  } catch (err) {
    console.log(err);
    alert('Error uploading file');
  }
};
