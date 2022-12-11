import React from 'react';
import { GoogleLogin} from '@react-oauth/google';
import { json, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {

  const extractData = (rawData) =>{
    const decode = jwt_decode(rawData);
    createOrGetUser({'name': decode.name, 'googleId': decode.sub, 'imageUrl': decode.picture})
  }

  const navigate = useNavigate();
   const createOrGetUser=(response) => {
    const { name, googleId, imageUrl } = response;
    localStorage.setItem('user',JSON.stringify(response));
    const user = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(user).then(() => {
        navigate('/',{ replace: true });
    });
   };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="realtive w-full h-full">
        <video
        src={shareVideo}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
         />
         <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin 
              onSuccess={(response) =>{
                extractData(response.credential)
              }}
              onError={()=>{
                alert('error')
              }}
            />
          </div>
         </div>
      </div>
    </div>
    
  );
};

export default Login;
