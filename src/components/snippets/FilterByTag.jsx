import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import TagContext from '../../context/TagContext';

function FilterByTag({ sortByTag }) {
  const { tags } = useContext(TagContext);
  const { user } = useContext(AuthContext);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const handlerToggler = () => {
    setShowTags(!showTags);
  };

  const handlerSortByTag = (tag) => {
    setSelectedTag(tag);
    sortByTag(tag);
  };

  return (
    <>
      {user && (
        <button className='btn btn-success ' onClick={handlerToggler}>
          {`Filter By Tag: ${selectedTag === '' ? 'All' : selectedTag}`}
        </button>
      )}

      {user
        ? showTags && (
            <div className='mt-4'>
              <h4
                className='badge p-4 cursor-pointer m-2'
                onClick={() => handlerSortByTag('')}
              >
                All
              </h4>
              {tags.map((item) => {
                return (
                  <h4
                    key={item.id}
                    className='badge p-4 cursor-pointer m-2'
                    onClick={() => handlerSortByTag(item.tag)}
                  >
                    {item.tag}
                  </h4>
                );
              })}
            </div>
          )
        : ''}
    </>
  );
}

export default FilterByTag;
