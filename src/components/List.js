import React from "react";

function List({ list }) {
  return (
    <div className="users-list">
      <ul className="list-main">
        {list.map(({ name, id, avatarUrl }) => {
          return (
            <li key={id} className="list-item">
              <span className="item-wrapper">
                <img
                  className="avatar-img"
                  src={avatarUrl}
                  alt={`avatar-${name}`}
                />
                <span>{name}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
