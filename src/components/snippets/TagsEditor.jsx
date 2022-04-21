import { useContext } from 'react';
import TagContext from '../../context/TagContext';

function TagsEditor() {
  const { tags, deleteTag } = useContext(TagContext);

  const deleteHandler = (id, tag) => {
    if (window.confirm(`Are you sure you want to delete "${tag}"?`)) {
      deleteTag(id);
    }
  };
  return (
    <>
      {tags.map((item) => {
        return (
          <h4
            key={item.id}
            className='badge p-4 cursor-pointer'
            onClick={() => deleteHandler(item.id, item.tag)}
          >
            {item.tag}
          </h4>
        );
      })}
    </>
  );
}

export default TagsEditor;
