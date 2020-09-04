import React, { useState } from "react";
import "./Landing.scss";
import "../helpers/variables.scss";
import "../jobForm/JobForm.scss";
import JobForm from "../jobForm/JobForm";
import EditJob from "../jobForm/EditJob";
import ProgressJobsChart from "../animations/ProgressJobsChart";
import TotalJobsChart from "../animations/TotalJobsChart";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const Landing = (props) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editObj, setEditObj] = useState();

  const text = "Job\n Application";

  const handleShowEdit = (obj) => {
    setShowEdit(true);
    setEditObj({ ...editObj, ...obj });
  };
  const hideShowEdit = () => setShowEdit(false);

  const hideModal = () => setShow(false);
  const handleShow = () => setShow(true);

  let postsOutput = null;
  let modalToRender = null;
  let rejectedLength = 0;
  let inProgressLength = 0;

  props.posts.filter((el) =>
    el.status === "Rejected" ? rejectedLength++ : null
  );
  inProgressLength = props.posts.length - rejectedLength;

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
    postsOutput = props.posts.map((obj) => (
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

  return (
    <div>
      {modalToRender}
      <div
        style={{ fontFamily: "Josefin Sans, sansSerif" }}
        className="container-fluid p-0 pl-sm-15 pr-sm-15"
      >
        <div className="row ml-2 mr-2 mt-4">
          <div className="header col-md-6 col-12 align-self-start">
            <h1 className="header--title d-inline-flex">
              Occupation Applications
            </h1>
            <h2 className="header--subtitle d-inline-flex">
              Welcome to your job applications dashboard!
            </h2>
          </div>
          <div className="statistics pl-4 pr-4 pl-md-0 pr-md-0 col-12 mt-4 mt-md-0 col-md-6 pl-md-5 d-flex justify-content-around flex-column p-0">
            <div className="d-flex flex-row">
              <div className="statistics--progress flex-grow-1 h-100 mr-1 p-2 pl-sm-4 pr-sm-4">
                <div className="statistics--progress__num">
                  {inProgressLength}
                </div>
                <div className="statistics--progress__text justify-content-center">
                  <span>Applications</span>
                  <span>in Progress</span>
                </div>
              </div>
              <div className="d-flex d-none total-jobs-chart align-items-center justify-content-center">
                <ProgressJobsChart data={props.posts} />
              </div>
            </div>

            <div className="d-flex flex-row mt-4">
              <div className="statistics--total flex-grow-1 h-100 mt-sm-3 ml-1 p-2 pl-sm-4 pr-sm-4">
                <div className="statistics--total__num">
                  {props.posts.length}
                </div>
                <div className="statistics--total__text justify-content-center">
                  <span>Total</span>
                  <span>Applications</span>
                </div>
              </div>
              <div className="d-flex flex-grow-1 mt-sm-3 total-jobs-chart align-items-center justify-content-center">
                <TotalJobsChart data={props.posts} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 pl-3 pr-3">
          <div className="col-12 col-md-6 applications">
            <div className="applications--header d-flex flex-row justify-content-between">
              <div className="applications--header__title">Applications</div>
              <div className="applications--header__button d-flex align-items-center mr-3">
                <div
                  className="button--add mb-2"
                  onClick={handleShow}
                  style={{ font: "black", border: "1px solid black" }}
                >
                  Add
                </div>
              </div>
            </div>
            <div className="posts">{postsOutput}</div>
          </div>
          <div className="resources col-12 col-md-6 pl-md-5">
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
