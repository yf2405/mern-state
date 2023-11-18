import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase'
//onChange={handleChange}
export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // this code show de progress the  loading process
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Download URL:', downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        });

      }
    );


  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={ formData.avatar || currentUser.avatar} alt='profile'
          className='rounded-full h-24 w-24 object-cover 
        cursor-pointer self-center mt-2'/>

        <p className="text-sm self-center">
          {fileUploadError ?
            (<span className="text-red-700">Error Image upload (image must less than 2 mb)  </span>)
            :
            filePercent > 0 && filePercent < 100 ? (
              <span className="text-slate-700">
                {`Uploading ${filePercent}%`}
              </span>
            ) : filePercent === 100 ?
              (<span className="text-green-700">Image successfully Uploaded!</span>)
              : (
                ''
              )}
        </p>

        <input type='text' placeholder='username' defaultValue={currentUser.username}
          id='username' className='border p-3 rounded-lg' />

        <input type='email' placeholder='email' defaultValue={currentUser.email}
          id='email' className='border p-3 rounded-lg' />

        <input type='text' placeholder='password'
          id='password' className='border p-3 rounded-lg' />

        <button className="bg-slate-700 text-white rounded-lg
         p-3 uppercase hover:opacity-95 
         disable:opacity-80">update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-blue-700 cursor-pointer">
          Delete
        </span>
        <span className="text-blue-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  )
}
