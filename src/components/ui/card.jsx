import React from "react";

export function Card({ children, ...props }) {
  return (
    <div {...props} className="bg-white shadow rounded p-4">
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div {...props} className="p-2">
      {children}
    </div>
  );
}
