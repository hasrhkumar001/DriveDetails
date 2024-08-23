// src/components/CarModelDropdown.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const CarModelDropdown = ({ carId, onSelectModel }) => {
  const [carModels, setCarModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelDetails, setModelDetails] = useState(null);
  const token = localStorage.getItem("authToken");
  console.log("carid is".carId);

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/car-models/car/${carId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              car_id: `${carId}`,
            },
          }
        );
        setCarModels(response.data);
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };

    fetchCarModels();
  }, [carId]);

  const handleModelChange = (event) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);

    const selectedCarModel = carModels.find((model) => model.id === modelId);
    onSelectModel(selectedCarModel);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="car-model-select-label" style={{fontSize:"12px"}}>Select Model</InputLabel>
        <Select
          labelId="car-model-select-label"
          id="car-model-select"
          value={selectedModel}
          label="Model"
          style={{ width: "150px" ,fontWeight:"bolder",fontSize:"12px"}}
          onChange={handleModelChange}
        >
          {carModels.length > 0 ? (
            carModels.map((model) => (
              <MenuItem className="fs-5" key={model.id} value={model.id}>
                {model.model_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Models Available</MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default CarModelDropdown;
