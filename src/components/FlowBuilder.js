'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Position,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodePanelSidebar from './NodePanelSidebar';
import TextMessageNode from './nodes/TextMessageNode';
import CustomEdge from './edges/CustomEdge';
import Header from './Header';

// Mapping node and edge types to custom components
const nodeTypes = {
  text: TextMessageNode,
};
const edgeTypes = {
  'custom-edge': CustomEdge,
};

// Simple ID generator (note: not ideal for production)
let id = 1;
const getId = () => `${id++}`;

export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null); // ref for the canvas wrapper

  // ReactFlow state management hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // stores instance of ReactFlow

  const [selectedNode, setSelectedNode] = useState(null); // currently selected node for editing
  const [showSaveAnimation, setShowSaveAnimation] = useState(false); // controls saved animation feedback

  /**
   * Called when a connection is made between nodes
   * - Enforces: One source → One target (1:many)
   * - Adds a custom edge with an arrow at the target
   */
  const onConnect = useCallback(
    params =>
      setEdges(eds => {
        if (eds.some(e => e.source === params.source)) {
          alert('Source node is already connected to another node');
          return eds;
        } else if (eds.some(e => e.target === params.target)) {
          return addEdge({ ...params }, eds);
        } else {
          return addEdge({ ...params, type: 'custom-edge' }, eds);
        }
      }),
    [setEdges]
  );

  /**
   * Required for drag-and-drop to work correctly
   */
  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handles dropping a new node onto the canvas
   * - Gets node type from `dataTransfer`
   * - Sets position based on cursor location
   */
  const onDrop = useCallback(
    event => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nid = getId();
      const newNode = {
        id: nid,
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          value: `${type} ${nid}`,
          onClick: () => onNodeClick(null, { id: nid }),
        },
      };

      setNodes(nds => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Selects a node to be edited in the right sidebar
   */
  const onNodeClick = (_, node) => setSelectedNode(node);

  /**
   * Updates the value of the selected node in the node array
   */
  const updateSelectedNode = value => {
    if (!selectedNode) return;

    setNodes(nodes =>
      nodes.map(node => {
        if (node.id === selectedNode.id) {
          node.data.value = value;
        }
        return node;
      })
    );
  };

  /**
   * Validates if all nodes are connected properly
   * - Nodes without either a source or a target are considered invalid
   */
  const validateFlow = () => {
    const sourceNodes = new Set();
    const targetNodes = new Set();

    edges.forEach(edge => {
      sourceNodes.add(edge.source);
      targetNodes.add(edge.target);
    });

    const nodesWithoutSourceAndTarget = nodes.filter(
      node => !sourceNodes.has(node.id) && !targetNodes.has(node.id)
    );

    if (nodesWithoutSourceAndTarget.length > 0) {
      alert('More than one nodes without source and target connections');
    } else {
      saveFlowToLocal();
    }
  };

  /**
   * Save the flow (nodes and edges) to local storage
   */
  const saveFlowToLocal = () => {
    localStorage.setItem('flow', JSON.stringify({ nodes, edges }));
    setShowSaveAnimation(true);
  };

  /**
   * Show "saved" animation for 800ms
   */
  const timeoutRef = useRef();
  useEffect(() => {
    if (showSaveAnimation) {
      timeoutRef.current = setTimeout(() => {
        setShowSaveAnimation(false);
      }, 800);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [showSaveAnimation]);

  /**
   * Load flow from local storage on mount
   */
  useEffect(() => {
    const flow = localStorage.getItem('flow');
    if (flow) {
      const { nodes, edges } = JSON.parse(flow);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col h-screen">
      {/* Top header with save button and animation */}
      <Header onClickSave={validateFlow} showSaveAnimation={showSaveAnimation} />

      <div className="flex flex-row flex-grow h-full">
        <ReactFlowProvider>
          {/* Left: ReactFlow Canvas */}
          <div className="reactflow-wrapper w-3/4 h-full" ref={reactFlowWrapper}>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={() => setSelectedNode(null)}
              onEdgeClick={() => setSelectedNode(null)}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          {/* Right: Sidebar to show editor if a node is selected */}
          <div className="flex-grow border-s">
            <NodePanelSidebar
              selectedNode={selectedNode}
              cancelSelection={() => setSelectedNode(null)}
              updateSelectedNode={value => updateSelectedNode(value)}
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
