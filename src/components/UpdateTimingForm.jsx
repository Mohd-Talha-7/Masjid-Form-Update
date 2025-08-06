import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const UpdateTimingForm = () => {
  const [formData, setFormData] = useState({
    masjidName: "",
    location: "",
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
    juma: "",
    eventName: "",
    eventTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const endpoint = import.meta.env.VITE_UPDATE_URL;

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: filteredData }),
    });

    if (response.ok) {
      alert("Timings updated successfully!");
      setFormData({
        masjidName: "",
        location: "",
        fajr: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
        juma: "",
        eventName: "",
        eventTime: "",
      });
    } else {
      alert("Update failed. Please check Masjid Name");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} align="center" fontWeight="bold">
          ✏️ Update Masjid Timings
        </Typography>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Masjid Name"
                name="masjidName"
                required
                fullWidth
                value={formData.masjidName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                required
                fullWidth
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            {/* Namaz time inputs */}
            {["fajr", "dhuhr", "asr", "maghrib", "isha", "juma"].map((namaz) => (
              <Grid item xs={12} sm={6} key={namaz}>
                <TextField
                  label={`${namaz.charAt(0).toUpperCase() + namaz.slice(1)} Time`}
                  name={namaz}
                  type="time"
                  required
                  fullWidth
                  value={formData[namaz]}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText="Leave blank to skip update"
                />
              </Grid>
            ))}

            {/* Event Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Name"
                name="eventName"
                fullWidth
                required
                value={formData.eventName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Time"
                name="eventTime"
                type="time"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={formData.eventTime}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Timings
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateTimingForm;
