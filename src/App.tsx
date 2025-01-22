import { useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import { initialNodes, initialEdges } from "./constants/index";
import useFlowHook from "./hooks/useFlowHook";
import FlowButtons from "./components/flowButtons";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const {
    addNode,
    deleteSelectedNode,
    saveFlow,
    loadFlow,
    onNodeClick,
    onEdgeClick,
    onConnect,
  } = useFlowHook({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNode,
    setSelectedNode,
  });

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <h2>React Flow Assessment - Deepti Jakhotra</h2>
        <FlowButtons
          onAddNode={addNode}
          onDeleteSelectedNode={deleteSelectedNode}
          onSaveFlow={saveFlow}
          onLoadFlow={loadFlow}
          isDeleteDisabled={!selectedNode || nodes.length === 1}
        />

        <div className="flow-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            onNodeClick={onNodeClick}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
