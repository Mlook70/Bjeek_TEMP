'use client'
import React, { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "966542275005"; // Replace with your WhatsApp number

const WhatsAppFloatingButton: React.FC = () => {
  // Start 20px from the bottom and left
  const [position, setPosition] = useState({ bottom: 20, left: 20 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    // Calculate offset from the bottom-left corner
    offset.current = {
      x: e.clientX - position.left,
      y: window.innerHeight - e.clientY - position.bottom,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPosition({
      left: e.clientX - offset.current.x,
      bottom: window.innerHeight - e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        left: position.left,
        bottom: position.bottom,
        zIndex: 9999,
        cursor: "grab",
        transition: dragging.current ? "none" : "box-shadow 0.2s",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "50%",
        background: "#25D366",
        width: 60,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={handleMouseDown}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp color="white" size={36} />
    </a>
  );
};

export default WhatsAppFloatingButton;
