import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './text-updater-node.css';
const handleStyle = { left: 10 };
 
function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* <Handle type="target" position={Position.Top} /> */}
      <div className='text-updater-node'>
        <label htmlFor="text" className="text-updater-node-label">Stage</label>
        <input id="text" name="text" placeholder='Stage name' className="text-updater-node-input" onChange={onChange} />
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      </div>
      <Handle type="source" position={Position.Right} id="a" className="customHandle_Right"/>
      <Handle type="target" position={Position.Left} id="b" className="customHandle_Left"/>
    </>
  );
}
export default TextUpdaterNode;
