import { useState } from 'react';
import EditList from './EditList';
import './ListCard.css';

function ListCard({ list, onRemove, onEditList }) {
  const [showEdit, setEdit] = useState(false);

  const handleDeleteClick = () => {
    onRemove(list.id);
  };

  const handleEditClick = () => {
    setEdit(!showEdit.id);
  };

  const handleSubmit = (id, newItem) => {
    setEdit(false);
    onEditList(id, newItem);
  };

  let content = (
    <div key={list.id}>
      <li className="nameList">
        {list.item
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))}
      </li>
    </div>
  );
  if (showEdit) {
    content = <EditList onSubmit={handleSubmit} list={list} />;
  }

  return (
    <div className="allCard">
      <div className="cardList">
        {content}
        <div className='EditDelete'>
          <button onClick={handleEditClick}> Edit </button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
