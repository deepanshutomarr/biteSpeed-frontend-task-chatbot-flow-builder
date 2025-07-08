// Importing icons for node types
import { BiMessageSquareDetail, BiImages } from 'react-icons/bi';

// Define the available node types in the sidebar
const nodeTypes = [
  {
    type: 'text',                 // unique identifier for the node type
    value: 'Message',            // label to show in the UI
    icon: BiMessageSquareDetail, // icon for the node type
    disabled: true,              // optionally used to disable dragging (not enforced here)
  },

  // Additional node types can be added like this:
  // {
  //   type: 'image',
  //   value: 'Image',
  //   icon: BiImages,
  //   disabled: false,
  // },
];

/**
 * Component: NodeSelector
 *
 * Description:
 * - Displays draggable UI blocks representing available node types.
 * - Allows users to drag a node type and drop it onto the React Flow canvas.
 */
export default function NodeSelector({}) {
  // Triggered when a node drag starts
  const onDragStart = (event, node) => {
    // Set the node type in the drag event payload
    event.dataTransfer.setData('application/reactflow', node.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      {/* Section heading */}
      <h1 className="text-lg font-medium mb-3">Select a Node</h1>

      {/* Render draggable node type buttons */}
      <div className="flex flex-wrap justify-between">
        {nodeTypes.map(Node => (
          <div
            key={Node.type}
            onDragStart={event => onDragStart(event, Node)}
            draggable
            className="flex flex-col items-center justify-between p-4 my-2 bg-white border-2 border-blue-500 rounded-lg font-medium transition-all w-[48%] active:scale-95 cursor-pointer"
          >
            {/* Node icon */}
            <div className="rounded-full mb-5">
              <Node.icon size={24} className="text-blue-500" />
            </div>

            {/* Node label */}
            <span className="text-base select-none text-blue-500">{Node.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
