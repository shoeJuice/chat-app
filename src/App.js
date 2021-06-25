import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp(
  {
   apiKey: "AIzaSyDGyJ_ZQ_7a6ZrcQsQWtcxtTBILqOEw4-0",
    authDomain: "react-chat-app-c0be8.firebaseapp.com",
    projectId: "react-chat-app-c0be8",
    storageBucket: "react-chat-app-c0be8.appspot.com",
    messagingSenderId: "1011818459228",
    appId: "1:1011818459228:web:cc13bcea03796034273699",
    measurementId: "G-NVQPHZV13G"
  }
)

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn()
{

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut()
{
  return auth.currentUser && 
  (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom()
{

  const messagesRef = firestore.collection('Messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});



  return(
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>
  
    </>
  )
}

function ChatMessage(props)
{
  const {text, uid} = props.message;

  return(<p>{text}</p>);
}

export default App;
