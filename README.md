# Overview

BiteSpeed Frontend Task: Chatbot flow builder

Website is hosted at [https://bite-speed-frontend-task-chatbot-fl.vercel.app/](https://bite-speed-frontend-task-chatbot-fl.vercel.app/)

## Features

1. **Text Node**
    1. Our flow builder currently supports only one type of message (i.e Text Message).
    2. There can be multiple Text Nodes in one flow.
    3. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.
2. **Nodes Panel**
    1. This panel houses all kind of Nodes that our Flow Builder supports.
    2. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible.
3. **Edge**
    1. Connects two Nodes together.
4. **Source Handle**
    1. Source of a connecting edge.
    2. Can only have **one edge** originating from a source handle.
5. **Target Handle**
    1. Target of a connecting edge
    2. Can have **more than one edge** connecting to a target handle.
6. **Settings Panel**
    1. Settings Panel will replace the Nodes Panel when a Node is selected.
    2. It has a text field to edit text of the selected Text Node.
7. **Save Button**
    1. Button to save the flow.
    2. Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles.

## Prerequisites

    React, Node.js.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.


### Project Structure

```bash
src
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
└── components
    ├── FlowBuilder.js
    ├── Header.js
    ├── NodePanelSidebar.js
    ├── NodeSelector.js
    ├── edges                   
    │   └── CustomEdge.js
    ├── editors                
    │   └── TextNodeEditor.js
    ├── handles                 
    │   └── CustomHandle.js
    └── nodes                   
        └── TextMessageNode.js
```