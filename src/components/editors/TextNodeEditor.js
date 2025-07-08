// Importing a back arrow icon from react-icons
import { IoIosArrowRoundBack } from 'react-icons/io';

/**
 * Component: TextNodeEditor
 * Description:
 * - Allows editing of text value stored in `selectedNode.data.value`
 * - Shows a back arrow to cancel editing
 * - Can be reused for any node that holds string/text data
 *
 * Props:
 * - selectedNode: the node currently selected for editing
 * - updateSelectedNode: function to update the node's value when text changes
 * - cancelSelection: function to cancel or close the editor view
 */
export default function TextNodeEditor({ selectedNode, updateSelectedNode, cancelSelection }) {
  return (
    <div className="">
      {/* Header section with back button, title, and spacer for alignment */}
      <div className="mb-5 flex justify-between border-b p-4 py-2">
        {/* Back arrow to go back or close the editor */}
        <IoIosArrowRoundBack size={28} className="cursor-pointer" onClick={cancelSelection} />

        {/* Title of the editor */}
        <h1 className="text-base font-medium">Message</h1>

        {/* Empty div used to balance the flex layout */}
        <div />
      </div>

      {/* Content section */}
      <div className="px-4">
        {/* Subheading for the text area */}
        <h1 className="text-sm mb-3 text-gray-500">Edit Text</h1>

        {/* Text input area for editing the node's value */}
        <textarea
          className="w-full p-2 mb-3 bg-white border-2 border-blue-500 rounded-lg font-medium"
          placeholder="Type your message here..."
          value={selectedNode.data.value} // Current value of the node
          onChange={event => updateSelectedNode(event.target.value)} // Update node value on change
        />
      </div>
    </div>
  );
}
