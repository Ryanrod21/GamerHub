import { useState } from 'react';
import '../components/CreateList.css';

function CreateList({ onCreate }) {
  const [itemText, setItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemText === '') {
      return;
    }
    onCreate({ item: itemText.trim() });
    setItem('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      setItem(value);
    }
  };

  return (
    <div className="createListCard">
      <form className="createForm" onSubmit={handleSubmit}>
        <div>
          <h3>
            Keep notes to keep track of your gaming experience <br></br>or even
            keep track where items are...
          </h3>
        </div>

        <input
          type="text"
          value={itemText}
          onChange={handleChange}
          placeholder="Enter Item"
        ></input>

        <button className="createBtn" type="submit">
          Add List
        </button>
      </form>
    </div>
  );
}

export default CreateList;
