import {getDocs,collection} from 'firebase/firestore'
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post1';
export interface Post {
    id:string;
    userid:string;
    title:string;
    username:string;
    description:string;
}
export const Main=()=>{
    const [postslist,setpostslist]=useState<Post[] |null>(null);
    const postsRef = collection(db,"posts");
    const getposts=async()=>{
const data=await getDocs(postsRef);
setpostslist(data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Post[]);
    };
useEffect(()=>{
    getposts();
},[]

);
    
    return( 
        <div>
            {postslist?.map((post)=><Post post={post}/>)}
        </div>
        );
}