// Importing the Handle component from React Flow
import { Handle } from 'reactflow';

/**
 * Component: CustomHandle
 * Description:
 * - Renders a custom styled connection handle on a node.
 * - Used to create connections between nodes in a flow diagram.
 *
 * Props:
 * - type: 'source' or 'target' — defines whether it's an output or input handle.
 * - position: where the handle appears on the node (e.g., 'top', 'bottom', 'left', 'right').
 */
export default function CustomHandle({ type, position }) {
  return (
    <Handle
      type={type}           // Determines if this is a source or target handle
      position={position}   // Sets the handle's position on the node
      style={{
        width: 10,           // Width of the handle
        height: 10,          // Height of the handle
        background: 'white', // White fill for the handle
        border: '1px solid #000', // Black border for visibility
      }}
    />
  );
}
