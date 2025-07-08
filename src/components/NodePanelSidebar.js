'use client';

import React from 'react';
import NodeSelector from './NodeSelector';           // Component to display node types (when nothing is selected)
import TextNodeEditor from './editors/TextNodeEditor'; // Editor component for text-type nodes

/**
 * Component: NodePanelSidebar
 * 
 * Description:
 * - Acts as the right sidebar panel in the flow builder.
 * - Shows either:
 *   1. A node editor (if a node is selected)
 *   2. The node selector (if no node is selected)
 * 
 * Props:
 * - selectedNode: the node currently selected for editing
 * - updateSelectedNode: function to update the node’s value
 * - cancelSelection: function to deselect the node
 */
export default function NodePanelSidebar({ selectedNode, updateSelectedNode, cancelSelection }) {
  return (
    <div>
      {selectedNode && selectedNode.type === 'text' ? (
        // If a text node is selected, show its editor
        <TextNodeEditor
          cancelSelection={cancelSelection}
          selectedNode={selectedNode}
          updateSelectedNode={updateSelectedNode}
        />
      ) : (
        // Otherwise, show the default node selector panel
        <div className="p-4">
          <NodeSelector />
        </div>
      )}
    </div>
  );
}
