import { useState, useEffect } from "react";
import "./App.css";

import MyMap from "./MyMap.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import MyAdvancedMarker from "./MyAdvancedMarker.jsx";
import MyInfoWindow from "./MyInfoWindow.jsx";
import Project from "./Project.jsx";

//function to parse data received from Airtable and turn it into an array of objects
  function parseData(data) {
    //create an empty array to store the objects
    const parsedProjects = [];
    //map over data.records
    const dataRecords = data.records;
    dataRecords.map((record) => {
      //create empty object
      const object = {};
      //go into fields property
      const fields = record.fields;
      //create all the object properties
      object.id = fields.id;
      object.proj_name = fields.project_name;
      object.location = {
        lat: fields.lat,
        lng: fields.lng,
      };
      object.utility = fields.utility;
      object.system_size = fields.system_size_mw;
      object.proj_status = fields.status;
      object.proj_lead = fields.project_lead;
      //push object into parsedData variable
      parsedProjects.push(object);
    });
    return parsedProjects;
  }

function App() {
  // url and token for fetch request from airtable
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  //fetch data from airtable
  useEffect(() => {
    const fetchMapData = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          const errorText = await resp.text();
          console.log("Error response body:", errorText);
          throw new Error(`HTTP ${resp.status}: ${errorText}`);
        }
        const data = await resp.json();
        console.log("data: ", data);

        // call function to parse data from object received from airtable
        const parsedProjects = parseData(data);
        console.log("parsedProjects: ", parsedProjects);

        setProjects(parsedProjects);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchMapData();
  }, [token, url]);

  return (
    <>
      <h1>Projects Map Tool</h1>
      <MyMap
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      ></MyMap>
      <AddProjectModal />
      <Project />
    </>
  );
}

export default App;
