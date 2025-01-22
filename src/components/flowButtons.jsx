import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faSave,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const FlowButtons = ({
  onAddNode,
  onDeleteSelectedNode,
  onSaveFlow,
  onLoadFlow,
  isDeleteDisabled,
}) => {
  return (
    <div className="button-container">
      <button onClick={onAddNode} className="add-node-btn">
        <FontAwesomeIcon icon={faPlus} /> Add Node
      </button>
      <button
        onClick={onDeleteSelectedNode}
        className="delete-node-btn"
        disabled={isDeleteDisabled}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Selected Node
      </button>
      <button onClick={onSaveFlow} className="save-flow-btn">
        <FontAwesomeIcon icon={faSave} /> Save Flow
      </button>
      <input
        type="file"
        accept=".json"
        onChange={onLoadFlow}
        id="file-upload"
        className="load-flow-input"
      />
      <label htmlFor="file-upload" className="load-flow-label">
        <FontAwesomeIcon icon={faUpload} /> Load Flow
      </label>
    </div>
  );
};

export default FlowButtons;
