import { addDoc, collection ,query, where,getDocs, deleteDoc, doc} from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import { Post as IPost} from './main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
interface Props {
    post:IPost;
}
interface Like {
    userId:string;
    likeid:string;
}

 export const Post = (props: Props) => {
    const { post } = props;
    const[user ]=useAuthState(auth);
    const [likes,setlikes]=useState<Like[] |null>(null);
    const likesRef = collection(db,"likes");
    const likesDoc=query(likesRef,where("postId","==",post.id));
    const getLikes=async()=>{
       const data=await getDocs(likesDoc);
       setlikes(data.docs.map((doc)=>({userId:doc.data().userId,likeid:doc.id})))
    };
    const addLike=async()=>{
        try{const newdoc=await addDoc(likesRef,{
            userId:user?.uid
           ,postId: post.id
            
            });
            if(user){
               setlikes((prev)=>prev?[...prev,{userId:user?.uid,likeid:newdoc.id}]:[{userId:user?.uid,likeid:newdoc.id}])
           
            }}catch(err){
                console.log(err);
            }
 
 
    } ;
    const removelike=async()=>{
        try{
            const liketodeletequery=query(
                likesRef,
                where("postId","==",post.id),
                where("userId","==" ,user?.uid));

             const liketodeletedata=await getDocs(liketodeletequery);
             const likeId=liketodeletedata.docs[0].id
            const liketodelete=doc(db,"likes",liketodeletedata.docs[0].id);
            await deleteDoc(liketodelete);
          
            if(user){
               setlikes((prev)=>prev &&prev.filter((like)=>like.likeid!==likeId))
           
            }}catch(err){
                console.log(err);
            }
 
 
    } ;
    const hasUserLiked=likes?.find((like)=>like.userId===user?.uid);
    useEffect(()=>{
        getLikes();
     },[]
     );
     
    return (<div>
        <div className='title'>
            <h1>{post.title}</h1>
        </div>
        <div className='body'>
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked?removelike:addLike}>
                {hasUserLiked ? <>&#128078;</> :<>&#128077;</> } 
                </button>
           {likes &&<p> Likes: {likes?.length}</p>} 
        </div>
    </div>
    );

};
