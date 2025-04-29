import { useState } from 'react';

function EditList({ list, onSubmit }) {
  const [item, setEdit] = useState(list.item);

  const handleChange = (event) => {
    setEdit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(list.id, item);

    console.log(list.id, item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter new Item:</label>
      </div>

      <input value={item} onChange={handleChange}></input>

      <button>Save</button>
    </form>
  );
}

export default EditList;
