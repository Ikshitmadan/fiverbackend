import axios from 'axios';
const url='https://api.cloudinary.com/v1_1/dkn2d7jc9/image/upload'


export const upload=async function(file){

    try{
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sotsflyi');
    const res= await axios.post(url,formData);
    console.log(res);
    const Url=res.data.url;
    return Url;

    }
    catch(err){
        console.log(err);
    }
  


}