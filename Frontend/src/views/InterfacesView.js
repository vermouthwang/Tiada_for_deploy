import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, { 
    ReactFlowProvider, 
    addEdge, 
    applyEdgeChanges, 
    applyNodeChanges, 
    useNodesState,
    useEdgesState,
    Controls,
    StraightEdge, } from 'reactflow';
import 'reactflow/dist/style.css';
import '../index.css'
import Sidebar from './Sidebar.js';
import TextUpdaterNode from './ImageUploadNode.js';

import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#24242a',
};

const initialNodes = [
  { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
  { id: 'node-2', type: 'textUpdater', position: { x: 250, y: 5 }, data: { value: 456 } },
];
const initialEdges = [
    {
      type: 'straight',
      source: 'node-1',
      target: 'node-2',
      id: '1',
      label: 'click',
    }
];
let id = 3;
let edge_id = 0;
const getId = () => `dndnode_${id++}`;
const getId_edge = () => `edge_${edge_id++}`;
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  },[]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x:event.clientX, y:event.clientY
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: 800 }}>
    <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 800 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit = {setReactFlowInstance}
          onDrop = {onDrop}
          onDragOver = {onDragOver}
          nodeTypes={nodeTypes}
          fitView
          style={rfStyle}
        />
        </div>
    </ReactFlowProvider>

    </div>
  );
}

export default Flow;