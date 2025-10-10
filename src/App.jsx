import { useState, useEffect, useCallback } from "react";
import "./App.css";

import MyMap from "./MyMap.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import Project from "./Project.jsx";
import FilterOptions from "./FilterOptions.jsx";
import UpdateProjectModal from "./UpdateProjectModal.jsx";

// url and token for fetch request from airtable
const token = `Bearer ${import.meta.env.VITE_PAT}`;
const BASE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

function parseSingleRecord(record) {
  //create empty object
  const object = {};
  //go into fields property
  const fields = record.fields;
  //create all the object properties
  object.id = record.id;
  object.proj_name = fields.project_name;
  object.location = {
    lat: fields.lat,
    lng: fields.lng,
  };
  object.utility = fields.utility;
  object.system_size = fields.system_size_mw;
  object.proj_status = fields.status;
  object.proj_lead = fields.project_lead;

  return object;
}

//function to parse data received from Airtable and turn it into an array of objects
function parseData(data) {
  const dataRecords = data.records;
  const parsedProjects = dataRecords.map(parseSingleRecord);
  return parsedProjects;
}

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModal, setProjectModal] = useState(false);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  //define state variables for filtering projects list
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOperator, setFilterOperator] = useState("");

  useEffect(() => {
    let url = "";

    //update url to include filters if selected
    if (filterField && filterValue) {
      const encodedFormula = encodeURI(
        `${filterField}${filterOperator}'${filterValue}'`
      );
      url = `${BASE_URL}?filterByFormula=${encodedFormula}`;
    } else {
      url = BASE_URL;
    }
    console.log("url: ", url);

    //fetch projects list from airtable
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
        setError(error.message);
        console.error("Fetch error: ", error);
      }
    };
    fetchMapData();
  }, [token, filterField, filterValue, filterOperator]);

  //function to set the selected project when it's clicked on either as an AdvancedMarker or as a Project in the Projects list
  const handleClickProject = useCallback(
    (project) => {
      setSelectedProject(project);
    },
    [setSelectedProject]
  );

  //function that changes the addNewProject Modal state to false if true, or true if false
  const toggleModal = () => {
    setProjectModal(!projectModal);
  };

  //function that changes the showUpdateModal state to false if true, or true if false
  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  //function for adding a new project to the list
  async function addNewProject(newProject) {
    const payload = {
      records: [
        {
          fields: {
            id: newProject.id,
            lat: newProject.location.lat,
            lng: newProject.location.lng,
            project_lead: newProject.proj_lead,
            project_name: newProject.proj_name,
            status: newProject.proj_status,
            system_size_mw: newProject.system_size,
            utility: newProject.utility,
          },
        },
      ],
    };
    //define options for fetch request
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(BASE_URL, options);
      console.log("resp: ", resp);
      // show error message if response not ok
      if (!resp.ok) {
        // throw new Error(resp.message);
        const errorText = await resp.text();
        console.log("Error response:", errorText); // Log the actual error
        throw new Error(resp.message);
      }
      // if response is ok, convert promise from json; destructure records
      const data = await resp.json();
      console.log("data: ", data);
      const parsedNewProject = parseData(data);
      console.log("parsedNewProject: ", parsedNewProject);
      //update projects with the new project added on
      setProjects([...projects, parsedNewProject[0]]);
      setSelectedProject(parsedNewProject[0]);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  async function updateProject(updatedProject) {
    console.log("updatedProject.id: ", updatedProject.id);
    const payload = {
      fields: {
        lat: updatedProject.location.lat,
        lng: updatedProject.location.lng,
        project_lead: updatedProject.proj_lead,
        project_name: updatedProject.proj_name,
        status: updatedProject.proj_status,
        system_size_mw: updatedProject.system_size,
        utility: updatedProject.utility,
      },
    };
    //define options for fetch request
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(`${BASE_URL}/${updatedProject.id}`, options);
      console.log("updateProject fetch resp: ", resp);
      // show error message if response not ok
      if (!resp.ok) {
        // throw new Error(resp.message);
        const errorText = await resp.text();
        console.log("Error response:", errorText); // Log the actual error
        throw new Error(resp.message);
      }
      // if response is ok, convert promise from json; destructure records
      const data = await resp.json();
      console.log("data: ", data);
      const parsedUpdatedProject = parseSingleRecord(data);
      console.log("parsedUpdatedProject: ", parsedUpdatedProject);
      //find index of the updated project in the projects array and replace it with the updated project
      const updatedProjIndex = projects.findIndex(
        (project) => project.id === parsedUpdatedProject.id
      );
      console.log("updatedProjIndex: ", updatedProjIndex);
      setProjects(
        projects.toSpliced(updatedProjIndex, 1, parsedUpdatedProject)
      );
    } catch (error) {
      setError(error?.message);
    }
  }

  //UPDATE PROJECT FUNCTION
  //payload with method Patch and pass in an updatedProject variable
  //in fields, only send it if the field changed?
  //reset the updated project to the project (using the spread operator) with the updated fields
  //reset projects to the updated project added on
  //set the updated project as the selectedProject

  //also setError when doing fetch requests for update and delete functions

  return (
    <>
      {projectModal && (
        <AddProjectModal
          toggleModal={toggleModal}
          addNewProject={addNewProject}
        />
      )}
      {showUpdateModal && (
        <UpdateProjectModal
          toggleUpdateModal={toggleUpdateModal}
          updateProject={updateProject}
          selectedProject={selectedProject}
        />
      )}
      <div>
        <h1>Wind Farms Map Dashboard</h1>
        <FilterOptions
          filterField={filterField}
          setFilterField={setFilterField}
          filterOperator={filterOperator}
          setFilterOperator={setFilterOperator}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setSelectedProject={setSelectedProject}
        ></FilterOptions>
        <button onClick={toggleModal}>Add New Project</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <MyMap
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          handleClickProject={handleClickProject}
        ></MyMap>
        <div>
          <h2>My Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <Project
                  project={project}
                  handleClickProject={handleClickProject}
                  selectedProject={selectedProject}
                  toggleUpdateModal={toggleUpdateModal}
                ></Project>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
