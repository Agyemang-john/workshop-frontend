"use client";

import React, { useState, useEffect, useReducer } from "react";
import WorkshopDetail from './WorkshopDetail';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Modal from "./Modal";
import { fetchWorkshopFields } from "@/lib/Workshop";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import ListItemText from "@mui/material/ListItemText";


// Reducer for managing form state
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_STATIC_FIELD":
//       return { ...state, [action.name]: action.value };
//     case "SET_FIELD":
//       return { ...state, responses: { ...state.responses, [action.name]: action.value } };
//     case "SET_FILE":
//       return { ...state, responses: { ...state.responses, [action.name]: action.file } };
//     case "RESET":
//       return action.initialState;
//     default:
//       return state;
//   }
// };

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATIC_FIELD":
      return { ...state, [action.name]: action.value };

    case "SET_FIELD":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.name]: action.value,
        },
      };

    case "SET_MULTISELECT":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.name]: action.value, // Store selected array
        },
      };

    case "SET_FILE":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.name]: action.file,
        },
      };

    case "RESET":
      return action.initialState;

    default:
      return state;
  }
};


const DetailPage = ({ workshop }) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([]);

  const initialState = { name: "", email: "", responses: {} };
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(formData)
  
  useEffect(() => {
    const loadFields = async () => {
      const data = await fetchWorkshopFields(workshop.id);
      setFields(data);
    };
    loadFields();
  }, [workshop.id]);
  
  useEffect(() => {
    // Check if all required fields are filled
    const missingFields = fields.some((field) => field.required && !formData.responses?.[field.label]);

    setIsFormValid(!missingFields); // Disable button if any required field is missing
  }, [fields, formData]); // Re-run whenever formValues change  

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "name" || name === "email") {
  //     dispatch({ type: "SET_STATIC_FIELD", name, value });
  //   } else {
  //     dispatch({ type: "SET_FIELD", name, value });
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "name" || name === "email") {
      dispatch({ type: "SET_STATIC_FIELD", name, value });
    } else {
      dispatch({ type: "SET_FIELD", name, value });
    }
  };
  
  // Handle multi-select specifically
  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_MULTISELECT", name, value });
  };


  const handleFileChange = (event) => {
    dispatch({ type: "SET_FILE", name: event.target.name, file: event.target.files[0] });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   const responsesArray = fields.map((field) => {
  //     let value = formData.responses[field.label] || ""; // Ensure fallback for undefined values
  
  //     if (field.field_type === "checkbox") {
  //       value = value ? "true" : "false"; // ✅ Convert boolean to string
  //     }
  
  //     return {
  //       field: field.id, 
  //       response_text: field.field_type !== "file" ? value : null,
  //       response_file: field.field_type === "file" ? formData.responses[field.label] : null,
  //     };
  //   });
  
  //   const submissionData = {
  //     workshop: workshop.id,
  //     name: formData.name,
  //     email: formData.email,
  //     responses: responsesArray, 
  //   };
  
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshop/${workshop.id}/register/`, {
  //       method: "POST",
  //       body: JSON.stringify(submissionData),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Server Error:", errorData);
  //       throw new Error("Registration failed");
  //     }
  
  //     alert("Registration successful!");
  //     dispatch({ type: "RESET", initialState });
  //     setOpen(false);
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     alert("Error during registration");
  //   }
  // };



  const handleSubmit = async (event) => {
    event.preventDefault();
    let missingFields = [];

    fields.forEach((field) => {
      if (field.required) {
        const value = formData.responses?.[field.label] || "";
        if (!value) {
          missingFields.push(field.label);
        }
      }
    });

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        html: `Please fill in: <strong>${missingFields.join(", ")}</strong>`,
        confirmButtonColor: "#d33",
      });
      return;
    }

  
    const submissionFormData = new FormData(); // Use for file uploads only
  
    // JSON Payload
    // const jsonData = {
    //   workshop: workshop.id,
    //   name: formData.name,
    //   email: formData.email,
    //   responses: fields.map((field) => ({
    //     field: field.id,
    //     response_text: field.field_type !== "file" ? (formData.responses?.[field.label] || "") : null,
    //   })),
    // };

    const jsonData = {
      workshop: workshop.id,
      name: formData.name,
      email: formData.email,
      responses: fields.map((field) => {
        let responseValue = formData.responses?.[field.label] || "";
        
        // Handle multi-select fields properly
        if (field.field_type === "multi_select") {
          responseValue = Array.isArray(responseValue) ? responseValue : [];
        }

        return {
          field: field.id,
          response_text: field.field_type !== "file" ? responseValue : null,
        };
      }),
    };
    // Append JSON as a string
    submissionFormData.append("json_data", JSON.stringify(jsonData));
  
    // Append files separately
    fields.forEach((field) => {
      
      if (field.field_type === "file" && formData.responses?.[field.label]) {
        submissionFormData.append(`responses[${field.id}][response_file]`, formData.responses[field.label]);
      }
    });

    const apiUrl = 'https://workshop-nfwx.onrender.com';
    const url = `${apiUrl}/api/workshop/${workshop.id}/register/`;
  
    try {
      const url_2 = `http://localhost:8000/api/workshop/${workshop.id}/register/`;
      const response = await fetch(url,
        {
          method: "POST",
          body: submissionFormData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
        confirmButtonColor: "#28a745",
      });
      dispatch({ type: "RESET", initialState });
      setOpen(false);
    } catch (error) {
      setOpen(false);
      if (error.response?.data?.non_field_errors) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response.data.non_field_errors[0],
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      }   
    }
  };
  
  
  

  return (
    <>
    <WorkshopDetail/>
    <div className="flex justify-center items-center p-4">
      <Button disabled={workshop?.workshop_status === "Completed"} variant="contained" onClick={() => setOpen(true)}>
        {workshop?.workshop_status === "Completed" ? "Workshop Completed" : "Register for Workshop"}
      </Button>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        title="Workshop Registration"
        content={
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <Grid size={{ xs: 12 }}>
              <TextField label="Name" fullWidth name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField type="email" label="Email" fullWidth name="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            {fields.map((field) => (
              <Grid key={field.id} size={{ xs: 12 }}>
                {field.field_type === "text" && <TextField fullWidth name={field.label} label={field.label} onChange={handleChange} required={field.required} />}
                {field.field_type === "multiline" && <TextField value={formData.responses[field.label] || ""} fullWidth multiline maxRows={6} name={field.label} label={field.label} onChange={handleChange} required={field.required} />}
                {field.field_type === "number" && <TextField type="number" fullWidth name={field.label} label={field.label} required={field.required} onChange={handleChange} />}
                {field.field_type === "file" && (
                  <div>
                    <input
                      type="file"
                      name={field.label}
                      id={field.label}
                      onChange={handleFileChange}
                      style={{ display: "none" }} // Hide default input
                      required={field.required}
                    />
                    
                    <label htmlFor={field.label}>
                      <Button
                        component="span"
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUpload />}
                      >{field.label} {" "}
                        Upload File
                      </Button>
                    </label>

                    {/* Show selected file name if a file is uploaded */}
                    {formData.responses[field.label] && (
                      <Typography variant="body2" style={{ marginTop: 8 }}>
                        Selected File: {formData.responses[field.label].name}
                      </Typography>
                    )}
                  </div>
                )}
                {field.field_type === "checkbox" && (
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name={field.label} required={field.required} onChange={handleChange} />} label={field.label} />
                  </FormGroup>
                )}
                {field.field_type === "select" && (
                  <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select label={field.label} name={field.label} value={formData.responses[field.label] || ""} required={field.required} onChange={handleChange}>
                      {field.options.choices.map((option, idx) => (
                        <MenuItem key={idx} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {field.field_type === "radio" && (
                  <>
                  <FormControl fullWidth>
                    <FormLabel id="demo-controlled-radio-buttons-group">{field.label}</FormLabel>
                    <RadioGroup
                      name={field.label}
                      value={formData.responses[field.label] || ""}
                      onChange={handleChange}
                      required={field.required}
                      
                    >
                      {field.options.choices.map((option, idx) => (
                      <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  </>
                )}

                {field.field_type === "multi_select" && (
                  <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      multiple
                      name={field.label}
                      label={field.label}
                      value={formData.responses[field.label] || []} // Default to array
                      onChange={handleMultiSelectChange}
                      renderValue={(selected) => selected.join(", ")} // Show selected values as string
                    >
                      {field.options.choices.map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                          {/* <Checkbox checked={formData.responses[field.label]?.includes(option)} /> */}
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}



              </Grid>
            ))}
            <Button type="submit" disabled={!isFormValid} variant="contained" fullWidth>
              Register
            </Button>
          </form>
        }
        actions={<Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>}
      />
    </div>
    </>
  );
};

export default DetailPage;
