import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import server from '../server';
import AuthContext from './AuthContext';

const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [filteredTagValue, setFilteredTagValue] = useState('');
  const { user } = useContext(AuthContext);

  const getTags = async () => {
    try {
      const tagsRes = await axios.get(`${server}/tags/all/${user.id}`);
      setTags(tagsRes.data);
      console.log(tagsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newTag = async (tag) => {
    const newTag = {
      user_id: user.id,
      tag,
    };
    try {
      await axios.post(`${server}/tags/add`, newTag);
      getTags();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTag = async (id) => {
    try {
      await axios.delete(`${server}/tags/delete/${id}`).then(getTags());
    } catch (error) {
      console.log(error);
    }
  };

  const updateFilteredTag = (tag) => {
    setFilteredTagValue(tag);
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getTags,
        newTag,
        deleteTag,
        filteredTagValue,
        updateFilteredTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagContext;
