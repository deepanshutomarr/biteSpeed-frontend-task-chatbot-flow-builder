// Import the main FlowBuilder component
import FlowBuilder from '@/components/FlowBuilder';

// Import Next.js <Head> for setting page metadata like title
import Head from 'next/head';

/**
 * Home Page Component
 * - This is the main entry point of the app.
 * - Renders the FlowBuilder inside a layout with a custom page title.
 */
export default function Home() {
  return (
    <main>
      {/* Set the browser tab title */}
      <Head>
        <title>Chatbot flow builder</title>
      </Head>

      {/* Render the chatbot flow builder UI */}
      <FlowBuilder />
    </main>
  );
}
