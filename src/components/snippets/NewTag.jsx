import { useState, useContext } from 'react';
import TagContext from '../../context/TagContext';

function NewTag() {
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');
  const { newTag } = useContext(TagContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (tag.length < 1) {
      setError('Tag cannot be empty');
    } else {
      newTag(tag);
      setError('');
      setTag('');
    }
  };

  return (
    <div className='mb-6'>
      <h2>Create new tag</h2>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Enter tag name'
          className='input input-bordered w-full max-w-xs'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        {error && <p className=' text-red-400'>{error}</p>}

        <button type='submit' className='btn'>
          Save Tag
        </button>
      </form>
    </div>
  );
}

export default NewTag;
