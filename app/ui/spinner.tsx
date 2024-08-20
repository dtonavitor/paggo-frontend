import React from 'react';
import { ColorRing } from "react-loader-spinner";

export default function SpinnerLoading(){
  return (
    <div>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
        /> 
    </div>
  )
}