"use client";

import React from "react";

function PopupModal({ isVisible, position,  onAction, status }) {
  if (!isVisible || !position) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
       
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
     
    >
      <div
        style={{
          position: "absolute",
          top: position.top + "px", // Set position top from where button was clicked
          left: position.left + "px", // Set position left from where button was clicked
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          minWidth: "30px",
          height: "120px",
          zIndex: 1001,
          marginLeft:'-20px'    
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li
            style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
            onClick={() => onAction("edit")}
          >
            Edit
          </li>
          {status === "ENABLED" ? (
            <li
              style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
              onClick={() => onAction("disable")}
            >
              Disable
            </li>
          ) : (
            <li
              style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
              onClick={() => onAction("enable")}
            >
              Enable
            </li>
          )}
          <li
            style={{
              cursor: "pointer",
              color: "#F10606",
            }}
            onClick={() => onAction("delete")}
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PopupModal;
