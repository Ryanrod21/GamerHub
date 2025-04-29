import ListCard from '../components/ListCard';
import '../components/ItemList.css';

function ItemList({ onList, onRemove, onEditList }) {
  const renderList = onList.map((lists) => {
    return (
      <ListCard
        key={lists.id}
        list={lists}
        onRemove={onRemove}
        onEditList={onEditList}
      />
    );
  });

  let content;
  if (onList.length === 0) {
    content = <h2>No Item Entered</h2>;
  } else {
    content = renderList;
  }

  return (
    <div className="allItemList">
      <div className="allCards">{content}</div>
    </div>
  );
}

export default ItemList;
