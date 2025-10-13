import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { useLocation, Routes, Route } from "react-router";
import Header from "./shared/Header.jsx";
import Footer from "./shared/Footer.jsx";
import MapPage from "./pages/MapPage.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

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
  const [title, setTitle] = useState("");

  //define state variables for filtering projects list
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOperator, setFilterOperator] = useState("");

  //useLocation from react router for nav links
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Wind Energy Projects Map Dashboard");
    } else if (location.pathname === "/about") {
      setTitle("About");
    } else {
      setTitle("Not Found");
    }
  }, [location]);

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

  return (
    <div>
      <Header title={title}></Header>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/"
          element={
            <MapPage
              projectModal={projectModal}
              toggleModal={toggleModal}
              addNewProject={addNewProject}
              toggleUpdateModal={toggleUpdateModal}
              updateProject={updateProject}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              showUpdateModal={showUpdateModal}
              filterField={filterField}
              setFilterField={setFilterField}
              filterOperator={filterOperator}
              setFilterOperator={setFilterOperator}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              projects={projects}
              handleClickProject={handleClickProject}
            />
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
