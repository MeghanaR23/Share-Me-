import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import Pin from './Pin';
const Feed = () => {
  const [loading , setLoading]= useState(false);
  const [pins , setPins]= useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query)
      .then((data) =>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })
    }

  },[categoryId])

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins?.length) return <h2>No Pins Available</h2>
  return (
    <div class="grid grid-cols-4 gap-4">
      {pins && pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max"/>)}
    </div>
  )
}

export default Feed
