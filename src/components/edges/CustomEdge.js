// Importing the necessary components from reactflow and react-icons
import { BezierEdge, EdgeLabelRenderer } from 'reactflow';
import { FaCaretRight } from 'react-icons/fa';

// Define a custom edge component for use with React Flow
export default function CustomEdge(props) {
  // Destructure the target coordinates from props
  const { targetX, targetY } = props;

  return (
    <>
      {/* Render the default Bezier-style edge using props passed by React Flow */}
      <BezierEdge {...props} />

      {/* Use EdgeLabelRenderer to overlay custom content (icon) on the edge */}
      <EdgeLabelRenderer>
        {/* Render a right-pointing caret icon at the target position of the edge */}
        <FaCaretRight
          size={20} // Set the icon size
          className="text-black" // Tailwind class for black color
          style={{
            // Position the icon exactly at the edge's target coordinates
            transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`,
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
