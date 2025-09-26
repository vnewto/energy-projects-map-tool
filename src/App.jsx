import { useState } from "react";
import "./App.css";
import MyMap from "./MyMap.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import MyAdvancedMarker from "./MyAdvancedMarker.jsx";
import MyInfoWindow from "./MyInfoWindow.jsx";
import Project from "./Project.jsx";

function App() {
  return (
    <>
      <h1>Projects Map Tool</h1>
      <MyMap></MyMap>
      <AddProjectModal />
      <MyAdvancedMarker />
      <MyInfoWindow />
      <Project />
    </>
  );
}

export default App;
