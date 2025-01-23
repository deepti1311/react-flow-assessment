import { useCallback } from "react";

//Custom hook to handle the react flow canvas
const useFlowHook = ({
  nodes = [],
  edges = [],
  selectedNode = null,
  setNodes = () => {},
  setEdges = () => {},
  setSelectedNode = () => {},
}) => {
  //handle adding node on click of add
  const addNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes, setNodes]);

  //handle delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.id !== selectedNode.id)
      );
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  //handle save work-flow in local in json file
  const saveFlow = useCallback(() => {
    const flowData = { nodes, edges };
    const blob = new Blob([JSON.stringify(flowData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  //handle loading saved work-flow on canvas.
  const loadFlow = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const flowData = JSON.parse(reader.result);
            if (
              !Array.isArray(flowData.nodes) ||
              !Array.isArray(flowData.edges)
            ) {
              throw new Error("Invalid flow data structure");
            }
            setNodes(flowData.nodes);
            setEdges(flowData.edges);
          } catch (error) {
            alert("Invalid JSON file. Please upload a valid flow file.");
          }
        };
        reader.readAsText(file);
      }
    },
    [setNodes, setEdges]
  );

  //set selected node state for delete node functionality
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  //handle remove edge on click
  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  //handle connecting to nodes
  const onConnect = useCallback(
    (params) => {
      setEdges((prevEdges) => [
        ...prevEdges,
        { ...params, id: `e${params.source}-${params.target}` },
      ]);
    },
    [setEdges]
  );

  return {
    addNode,
    deleteSelectedNode,
    saveFlow,
    loadFlow,
    onNodeClick,
    onEdgeClick,
    onConnect,
  };
};

export default useFlowHook;
