// Import icons from react-icons
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';

// Import custom handle for node connections
import CustomHandle from '../handles/CustomHandle';

// Import position enums for handle placement
import { Position } from 'reactflow';

/**
 * Component: TextMessageNode
 * Description:
 * - Represents a custom React Flow node that displays a WhatsApp-style message.
 * - The message content is taken from `data.value`.
 * - Includes a source handle (for outgoing connections) and a target handle (for incoming connections).
 *
 * Notes:
 * - If used for image-type nodes, `data.value` would contain the image URL and can be rendered using an <img> tag.
 */
export default function TextMessageNode({ data, ...props }) {
  return (
    <div className="flex-col border min-w-72 bg-white rounded-lg">
      {/* Header Section: Icon, Label, and WhatsApp Icon */}
      <div className="flex justify-between p-2 border-b">
        <BiMessageSquareDetail size={16} />  {/* Left icon: message icon */}
        <p className="text-xs">Send Message</p> {/* Center text */}
        <IoLogoWhatsapp size={16} className="text-[#25D366]" /> {/* Right icon: WhatsApp green */}
      </div>

      {/* Message Content Section */}
      <div className="p-2 py-4">
        {data.value ? (
          // If message is present, render it
          <h1
            className="text-sm text-center whitespace-pre-line"
            onClick={() => data.onClick()} // Optional: opens editor or triggers edit mode
          >
            {data.value}
          </h1>
        ) : (
          // Placeholder text if message is not set
          <p className="text-sm text-center text-gray-400">Click to edit</p>
        )}
      </div>

      {/* Connection handles for React Flow */}
      <CustomHandle type="target" position={Position.Left} />   {/* Incoming connections */}
      <CustomHandle type="source" position={Position.Right} />  {/* Outgoing connections */}
    </div>
  );
}
