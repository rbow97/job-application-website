import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Dropdown,
  DropdownButton,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import * as actionCreators from "../store/actions/actionCreators";
import "./JobForm.scss";
import Button from "react-bootstrap/Button";

const EditJob = (props) => {
  let id = null;

  const [jobRole, setjobRole] = useState(props.postObj.jobRole);
  const [company, setCompany] = useState(props.postObj.company);
  const [location, setLocation] = useState(props.postObj.location);
  const [status, setStatus] = useState(props.postObj.status);
  const [notes, setNotes] = useState(props.postObj.notes);

  const handleEdit = (e) => {
    e.preventDefault();
    id = props.postObj.id;

    const roleInfo = {
      id,
      jobRole,
      company,
      location,
      status,
      notes,
    };
    props.hide();
    props.editJob(roleInfo);
  };

  return (
    <Form className="form d-flex flex-column" onSubmit={(e) => handleEdit(e)}>
      <div className="d-flex flex-column flex-sm-row">
        <div className="d-flex flex-column flex-grow-1 mr-1">
          <FormGroup controlId="formJobTitle" className="form--job">
            <FormLabel>Job Title</FormLabel>
            <FormControl
              required={true}
              plaintext
              defaultValue={props.postObj.jobRole}
              onChange={(e) => setjobRole(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="formCompany" className="form--company">
            <FormLabel>Company</FormLabel>
            <FormControl
              plaintext
              defaultValue={props.postObj.company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="formLocation" className="form--location">
            <FormLabel>Location</FormLabel>
            <FormControl
              plaintext
              defaultValue={props.postObj.location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="flex-grow-1">
          <label htmlFor="form-notes">Notes</label>
          <form className="form--notes h-100">
            <textarea
              className="form--notes__input"
              defaultValue={props.postObj.notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between mt-2 mt-sm-5">
        <Form.Group className="form--status">
          <Form.Label>Status</Form.Label>
          <DropdownButton
            id="dropdown-basic"
            style={
              status === "Applied"
                ? { backgroundColor: "#2C861E" }
                : status === "Rejected"
                ? { backgroundColor: "#DE4040" }
                : status === "Interview Process"
                ? { backgroundColor: "#FA8E10" }
                : { backgroundColor: "#2C861E" }
            }
            variant={`${
              status === "Applied"
                ? "#ff0000"
                : status === "Rejected"
                ? "danger"
                : status === "Interview Process"
                ? "warning"
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
          Update
        </Button>
      </div>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editJob: (roleInfo) => dispatch(actionCreators.editJob(roleInfo)),
  };
};

export default connect(null, mapDispatchToProps)(EditJob);
