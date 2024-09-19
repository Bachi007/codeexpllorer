import React, { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker({ onSelectColor }) {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    onSelectColor(newColor.hex);
  };

  return (
    <div>
      <ChromePicker color={color} onChange={handleChange} />
    </div>
  );
}
