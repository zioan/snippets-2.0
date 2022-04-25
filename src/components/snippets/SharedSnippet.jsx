import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SnippetContext from '../../context/SnippetContext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Spinner from '../layout/Spinner';
import { FiCopy } from 'react-icons/fi';
import AuthContext from '../../context/AuthContext';

function SharedSnippet() {
  const { user } = useContext(AuthContext);

  const { sharedSnippet, getSharedSnippet, loading } =
    useContext(SnippetContext);

  const params = useParams();

  //read url params and send params to SnippetContext for fetching
  useEffect(() => {
    getSharedSnippet(params.user_name, params.user_id, params.snippet_id);
  }, []);

  const saveToClipboard = () =>
    navigator.clipboard.writeText(sharedSnippet[0].code);

  return (
    <>
      {loading && <Spinner />}

      {/* If user logged in */}
      {user && (
        <div className='mt-10'>
          <h4 className=' text-xl'>
            {user.name}, you are logged in,{' '}
            <Link className=' underline text-success mx-2' to='/dashboard'>
              go back to your dashboard
            </Link>
            .
          </h4>
          <h4 className=' text-xl'>
            This page is designed for sharing your snippets.
          </h4>
          <h4 className=' text-xl'>
            Feel free to share this link with the world.
          </h4>
        </div>
      )}

      {/* If no user */}
      {!user && (
        <div className='my-10'>
          <h4 className=' text-2xl'>
            New to Snippets? Give it a try and
            <Link className=' underline text-success mx-2' to='/'>
              open your own account
            </Link>
            . It's free :&#41;
          </h4>
        </div>
      )}

      {/* If link is valid and snippet is found in DB */}
      {sharedSnippet && (
        <div className=' mt-10 flex flex-col'>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <h2 className=' text-2xl mb-4 underline'>
              {sharedSnippet[0].title}
            </h2>
            <div
              className='tooltip  justify-self-end inline '
              data-tip='Copy to clipboard'
            >
              <button className='btn btn-success ' onClick={saveToClipboard}>
                <FiCopy className=' text-2xl' />
              </button>
            </div>
          </div>
          <div className='max-h-[600px] overflow-auto  my-4'>
            <CodeEditor
              disabled={true}
              className='code-editor bg-opacity-10'
              value={sharedSnippet[0].code}
              language='jsx'
              padding={15}
              style={{
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </div>
        </div>
      )}

      {/* If link is no valid and no data gfetched */}
      {!sharedSnippet && (
        <h4 className=' text-2xl'>
          The snippet you are looking for does not exist!
        </h4>
      )}
    </>
  );
}

export default SharedSnippet;
