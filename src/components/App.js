import React, { useState } from 'react';

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1 className="logo"> 🌴 My Travel List 🌴 </h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { 
      description, 
      quantity, 
      packed: false, 
      id: Date.now() 
    };
    
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <button>Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      
      <text style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </text>
      
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => ( 
          <Item 
            item={item} 
            onDeleteItem={onDeleteItem} 
            onToggleItem={onToggleItem}
            key={item.id} 
          />
        ))}
      </ul>
      
      <div className="actions">
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list!</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything🧳!'
          : 'You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)'}
      </em>
    </footer>
  );
};

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
