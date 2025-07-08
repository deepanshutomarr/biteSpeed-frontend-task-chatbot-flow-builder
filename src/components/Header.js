// Import icons for save and success animation
import { AiOutlineSave } from 'react-icons/ai';
import { SiTicktick } from 'react-icons/si';

/**
 * Header Component
 * 
 * Props:
 * - onClickSave: function to trigger when the "Save Changes" button is clicked
 * - showSaveAnimation: boolean to toggle between save and success icons
 */
export default function Header({ onClickSave, showSaveAnimation }) {
  return (
    <header className="flex flex-row justify-between items-center px-20 py-2 bg-[#f3f3f3] border-b">
      {/* Title of the flow builder */}
      <h1 className="text-xl font-medium">Chatbot flow builder by Deepanshu Tomar</h1>

      {/* Save Changes button */}
      <button
        className="flex items-center px-2 py-1 text-sm text-blue-500 border-2 border-blue-500 rounded-lg font-medium transition-all hover:bg-blue-500/10 active:scale-95 active:bg-blue-500/30"
        onClick={onClickSave}
      >
        Save Changes

        {/* Show tick icon if animation is active, else show save icon */}
        {showSaveAnimation ? (
          <SiTicktick size={28} className="pl-2" />
        ) : (
          <AiOutlineSave size={28} className="pl-2" />
        )}
      </button>
    </header>
  );
}
