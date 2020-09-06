import React, { useState } from "react";
import "./Landing.scss";
import "../helpers/variables.scss";
import "../jobForm/JobForm.scss";
import JobForm from "../jobForm/JobForm";
import EditJob from "../jobForm/EditJob";
import ProgressJobsChart from "../animations/ProgressJobsChart";
import TotalJobsChart from "../animations/TotalJobsChart";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const Landing = (props) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editObj, setEditObj] = useState();
  const [dropdown, setDropdown] = useState("All");

  const text = "Job\n Application";
  const subheaderText = "Welcome to your job applications dashboard!";

  const handleShowEdit = (obj) => {
    setShowEdit(true);
    setEditObj({ ...editObj, ...obj });
  };
  const hideShowEdit = () => setShowEdit(false);

  const hideModal = () => setShow(false);
  const handleShow = () => setShow(true);

  let postsOutput = null;
  let modalToRender = null;
  let postsFilter = null;
  let rejectedLength = 0;
  let inProgressLength = 0;

  props.posts.filter((el) =>
    el.status === "Rejected" ? rejectedLength++ : null
  );
  inProgressLength = props.posts.length - rejectedLength;

  postsFilter = props.posts.filter((el) => {
    if (dropdown === "All") {
      return el;
    } else if (dropdown === "Applied") {
      let status = null;
      status = el.status === "Applied" ? el : null;
      return status;
    } else if (dropdown === "Rejected") {
      let status = null;
      status = el.status === "Rejected" ? el : null;
      return status;
    } else if (dropdown === "Interview Process") {
      let status = null;
      status = el.status === "Interview Process" ? el : null;
      return status;
    }
  });

  if (show === true) {
    modalToRender = (
      <Modal show={show} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            <span className="form--title">{text}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal--body">
          <JobForm hide={hideModal} editMode={false} />
        </Modal.Body>
      </Modal>
    );
  } else if (showEdit === true) {
    modalToRender = (
      <Modal show={showEdit} onHide={hideShowEdit}>
        <Modal.Header>
          <Modal.Title>
            <span className="form--title">{text}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditJob hide={hideShowEdit} editMode={true} postObj={editObj} />
        </Modal.Body>
      </Modal>
    );
  }

  if (props.posts.length > 0) {
    postsOutput = postsFilter.map((obj) => (
      <div className="posts--slice d-flex p-3" key={obj.id}>
        <div className="w-50">
          <div
            className="posts--slice__role"
            onClick={() => handleShowEdit(obj)}
          >
            {obj.jobRole}
          </div>
          <div className="posts--slice__company">{obj.company}</div>
          <div className="posts--slice__location">{obj.location}</div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-fill">
          <div
            className="posts--slice__status"
            style={
              obj.status === "Applied"
                ? { color: "#2c861e" }
                : obj.status === "Interview Process"
                ? { color: "#fa8e10" }
                : obj.status === "Rejected"
                ? { color: "#de4040" }
                : { color: "black" }
            }
          >
            {obj.status}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-start">
          <div
            className="button--delete p-1.5 w-100 mb-2 style={{ background: '#e3242b', font: 'white', borderRadius: '5px', border: 'none' }}"
            onClick={() => props.onDeleteRole(obj.id)}
          >
            Delete
          </div>
          <div
            className="button--edit p-1.5 w-100 style={{ background: '#e3242b', font: 'white', borderRadius: '5px', border: 'none' }}"
            onClick={() => handleShowEdit(obj)}
          >
            View
          </div>
        </div>
      </div>
    ));
  }

  console.log(postsFilter);
  return (
    <div>
      {modalToRender}
      <div
        style={{ fontFamily: "Josefin Sans, sansSerif" }}
        className="container p-2"
      >
        <div className="row ml-2 mr-2 mt-4 pb-4">
          <div className="header col-12 align-self-start">
            <h1 className="header--title d-inline-flex">
              Occupation Applications
            </h1>
            <h2 className="header--subtitle d-inline-flex">{subheaderText}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 applications">
            <div className="applications--header d-flex flex-lg-row flex-column justify-content-between">
              <div className="applications--header__title">Applications</div>
              <div className="applications--header__button d-flex align-items-center mr-3">
                <div
                  className="button--add mb-2 mr-2"
                  onClick={handleShow}
                  style={{
                    font: "black",
                    border: "1px solid black",
                    padding: "7.5px 12px",
                  }}
                >
                  Add
                </div>
                <DropdownButton
                  className=" button--filter mb-2"
                  title={dropdown}
                  style={{
                    font: "black",
                    backgroundColor: "white",
                    border: "1px solid black",
                    padding: "0",
                  }}
                  variant={"white"}
                >
                  <Dropdown.Item
                    onClick={() => {
                      setDropdown("All");
                    }}
                  >
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setDropdown("Applied");
                    }}
                  >
                    Applied
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setDropdown("Interview Process");
                    }}
                  >
                    Interview Process
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setDropdown("Rejected");
                    }}
                  >
                    Rejected
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <div className="posts">{postsOutput}</div>
          </div>
          <div className="col-md-6 col-12 pt-1 pt-md-5">
            <div className="statistics pl-2 col-12 mt-4 mt-md-0 pl-md-4 d-flex justify-content-around flex-column p-0">
              <div className="d-flex flex-row justify-content-around">
                <div className="statistics--padding w-md-50 w-lg-80">
                  <div className="statistics--progress mr-1 p-2 pl-sm-4 pr-sm-4">
                    <div className="statistics--progress__num">
                      {inProgressLength}
                    </div>
                    <div className="statistics--progress__text justify-content-center">
                      <span>Applications</span>
                      <span>in Progress</span>
                    </div>
                  </div>
                </div>
                <ProgressJobsChart data={props.posts} />
              </div>

              <div className="d-flex flex-row justify-content-around mt-2">
                <div className="statistics--padding">
                  <div className="statistics--total mt-sm-3 ml-1 p-2 pl-sm-4 pr-sm-4">
                    <div className="statistics--total__num">
                      {props.posts.length}
                    </div>
                    <div className="statistics--total__text justify-content-center">
                      <span>Total</span>
                      <span>Applications</span>
                    </div>
                  </div>
                </div>
                <TotalJobsChart data={props.posts} />
              </div>
            </div>
            <div className="resources pt-4 pt-md-3">
              <div className="resources--header"> Useful Resources</div>
              <ul className="resources--links p-3 mt-3">
                <li>
                  <a href="#">Resource 1</a>
                </li>
                <li>
                  <a href="#">Resource 2</a>
                </li>
                <li>
                  <a href="#">Resource 3</a>
                </li>
                <li>
                  <a href="#">Resource 4</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-5 pl-3 pr-3"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRole: (id) => dispatch(actionCreators.deleteRole(id)),
    onEditRole: (obj) => dispatch(actionCreators.editJob(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
