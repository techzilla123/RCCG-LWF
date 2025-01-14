"use client";

import React from "react";
import ReactDOM from "react-dom";

function DropdownModal({ isVisible, position, onAction, status }) {
  if (!isVisible || !position) return null;

  const backdropStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Subtle backdrop for better focus
  };

  const modalStyle = {
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    minWidth: "90px",
    marginLeft: "-20px",
    zIndex: 1001,
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    padding: "5px 0",
  };

  const deleteStyle = {
    ...listItemStyle,
    color: "#F10606",
    borderBottom: "0px ",
  };

  return ReactDOM.createPortal(
    <div style={backdropStyle} onClick={(e) => e.stopPropagation()}>
      <div style={modalStyle}>
        <ul style={listStyle}>
          <li style={listItemStyle} onClick={() => onAction("edit")}>
            Edit
          </li>
          {status === "ENABLED" ? (
            <li style={listItemStyle} onClick={() => onAction("disable")}>
              Disable
            </li>
          ) : (
            <li style={listItemStyle} onClick={() => onAction("enable")}>
              Enable
            </li>
          )}
          <li style={deleteStyle} onClick={() => onAction("delete")}>
            Delete
          </li>
        </ul>
      </div>
    </div>,
    document.body // Render the modal in the body to ensure it's correctly positioned
  );
}

export default DropdownModal;
