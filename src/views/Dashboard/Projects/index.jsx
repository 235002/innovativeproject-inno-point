import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components/macro";

import { getVerifiedProjects } from "../../../store/selectors";
import { projectsReadRequest } from "../../../actions";

import {
  Container,
  MainContainer,
  TopBar,
  StyledTooltip,
  StyledTypeOfList,
  StyledSpinner,
  StyledTypeOfProjects,
  Header,
  Label
} from "./style";

import { fabAddStyle, iconAddStyle } from "./style";

import { ProjectCard, TopicForm } from "../../../components";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  List,
  GridOn,
  VerifiedUser,
  Schedule,
  VisibilityOff
} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Projects = props => {
  const [typeOfList, setTypeOfList] = useState("block");
  const [typeOfProject, setTypeOfProject] = useState("Verified");
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleTypeOfList(event, newValue) {
    setTypeOfList(newValue);
  }

  function handleTypeOfProject(event, newValue) {
    setTypeOfProject(newValue);
  }

  useEffect(() => {
    props.readProjects();
  }, [update]);

  let { projects } = props;

  if (!projects || projects.length === 0) {
    return <StyledSpinner />;
  }

  if (inputValue) {
    projects = projects.filter(project =>
      project.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  if (typeOfProject === "Verified") {
    projects = projects.filter(project => project.verified);
  } else {
    projects = projects.filter(project => !project.verified);
  }

  return (
    <div>
      {/* <Header /> */}

      <TopBar>
        <Label>
          {typeOfProject === "Verified" ? (
            <VerifiedUser style={{ color: "#00336e" }} />
          ) : (
            <Schedule style={{ color: "#00336e" }} />
          )}
          <span>{typeOfProject} Projects</span>
        </Label>
        <div className="Searchbar">
          <InputBase
            placeholder="Search…"
            style={{ width: "100%" }}
            onChange={e => setInputValue(e.target.value)}
          />
          <SearchIcon
            onClick={() => {
              props.createProject();
            }}
          />
        </div>
      </TopBar>
      <MainContainer>
        <Container typeOfList={typeOfList}>
          {Object.keys(projects).length !== 0 ? (
            projects.length !== 0 &&
            projects.map((project, index) => (
              <ProjectCard project={project} index={index} />
            ))
          ) : (
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <span
                css={`
                  margin-right: 5px;
                `}
              >
                No projects here
              </span>{" "}
              <VisibilityOff />
            </div>
          )}
        </Container>
      </MainContainer>
      <StyledTypeOfList value={typeOfList} onChange={handleTypeOfList}>
        <BottomNavigationAction label="Block" value="block" icon={<GridOn />} />
        <BottomNavigationAction label="List" value="list" icon={<List />} />
      </StyledTypeOfList>
      <StyledTypeOfProjects
        value={typeOfProject}
        onChange={handleTypeOfProject}
      >
        <BottomNavigationAction
          label="Verified"
          value="Verified"
          icon={<VerifiedUser />}
        />
        <BottomNavigationAction
          label="Pending"
          value="Pending"
          icon={<Schedule />}
        />
      </StyledTypeOfProjects>
      <StyledTooltip
        title={"Add project"}
        aria-label="Add"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Link to="#">
          <Fab style={fabAddStyle}>
            <AddIcon style={iconAddStyle} />
          </Fab>
        </Link>
      </StyledTooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={false}
        onClose={handleClose}
      >
        <TopicForm
          setUpdate={setUpdate}
          update={update}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  const projects = state.projects.items;
  return {
    projects
  };
};

const mapDispatchToProps = dispatch => ({
  readProjects: () => dispatch(projectsReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
