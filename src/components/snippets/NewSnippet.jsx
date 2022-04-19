import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';

// import { db } from '../../firebase/firebase';
// import { addDoc, updateDoc, collection } from 'firebase/firestore';

function NewSnippet() {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const { user } = useContext(UserContext);

  const saveSnippetHandler = async (e) => {
    e.preventDefault();
    await user;

    // const snippetsCollection = collection(db, 'snippets');
    // try {
    //   await addDoc(collection(db, 'snippets'), {
    //     // await addDoc(collection(snippetsCollection, { merge: true }), {
    //     // { merge: true }
    //     snippetId: user.uid,
    //     tag,
    //     title,
    //     code,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <h2>Snippets</h2>
      <form onSubmit={saveSnippetHandler}>
        <input
          type='text'
          placeholder='tag'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type='submit'>save snippet</button>
      </form>
    </>
  );
}

export default NewSnippet;
