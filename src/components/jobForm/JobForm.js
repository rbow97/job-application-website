import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import * as actionCreators from "../store/actions/actionCreators";
import uuid from "uuid";
import "./JobForm.scss";
import Button from "react-bootstrap/Button";

const JobForm = (props) => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const saveJob = (e) => {
    e.preventDefault();
    let id = null;
    id = uuid.v4();

    const roleInfo = {
      id,
      jobRole: role,
      company: company,
      location: location,
      notes: notes,
      status: status,
    };

    props.hide();
    props.setJob(roleInfo);
  };

  return (
    <Form className="form d-flex flex-column" onSubmit={(e) => saveJob(e)}>
      <div className="d-flex flex-column flex-sm-row">
        <div className="d-flex flex-column flex-grow-1 mr-1">
          <Form.Group controlId="formJobTitle" className="form--job">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              required={true}
              type="text"
              placeholder="Graduate Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCompany" className="form--company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              required={false}
              type="text"
              placeholder="RoBoCop Inc"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLocation" className="form--location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required={false}
              type="text"
              placeholder="London, UK"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="flex-grow-1">
          <label htmlFor="form-notes">Notes</label>
          <form className="form--notes h-100">
            <textarea
              className="form--notes__input"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </form>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between mt-2 mt-sm-5">
        <Form.Group className="form--status mb-0">
          <Form.Label>Status</Form.Label>
          <DropdownButton
            style={
              status === "Applied"
                ? { backgroundColor: "#2C861E" }
                : status === "Rejected"
                ? { backgroundColor: "#DE4040" }
                : status === "Interview Process"
                ? { backgroundColor: "#FA8E10" }
                : { backgroundColor: "#2C861E" }
            }
            id="dropdown-basic"
            variant={`${
              status === "Applied"
                ? "#2C861E"
                : status === "Rejected"
                ? "DE4040"
                : status === "Interview Process"
                ? "FA8E10"
                : "primary"
            }`}
            title={status}
          >
            <Dropdown.Item onClick={() => setStatus("Applied")}>
              Applied
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setStatus("Rejected")}>
              Rejected
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setStatus("Interview Process")}>
              Interview Process
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Button
          className="form--button align-self-end"
          variant="primary"
          type="submit"
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJob: (roleInfo) => dispatch(actionCreators.setJob(roleInfo)),
  };
};

export default connect(null, mapDispatchToProps)(JobForm);
