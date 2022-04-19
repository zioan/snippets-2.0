import { useEffect, useContext } from 'react';

import UserContext from '../../context/UserContext';
import SnippetContext from '../../context/SnippetContext';

function SnippetsList() {
  const { user } = useContext(UserContext);
  const { snippets, updateSnippets } = useContext(SnippetContext);

  useEffect(() => {
    getSnippets();
  }, []);

  const getSnippets = async () => {
    // const snippetsRef = query(
    //   collection(db, 'snippets'),
    //   where('snippetId', '==', user.uid)
    // )
    // const snippetList = await getDocs(snippetsRef)
    // snippetList.forEach((doc) => {
    //   const snippet = { id: doc.id, data: doc.data() }
    //   console.log(snippet)
    //   setSnippets((prevState) => [prevState, snippet])
    //   console.log(snippets)
    // })
    // const q = query(
    //   collection(db, 'snippets'),
    //   where('snippetId', '==', user.uid)
    // )
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const cities = []
    //   console.log(querySnapshot)
    //   console.log(querySnapshot._snapshot.docChanges)
    //   querySnapshot.forEach((doc) => {
    //     cities.push(doc.data())
    //     updateSnippets(doc.data())
    //     // console.log(snippets)
    //   })
    // console.log(cities)
    // console.log(snippets)
    // console.log('Current cities in CA: ', cities.join(', '))
    // })
  };

  return (
    <>
      <h2>SnippetsList</h2>
      {/* {user && } */}
      {/* {snippets} */}
    </>
  );
}

export default SnippetsList;
