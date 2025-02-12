import React from "react";

function Membership() {
        const handleTimeSlotChange = async (event) => {
        const selectedTimeSlot = event.target.value;
        formik.setFieldValue("timeSlot", selectedTimeSlot);

        if (selectedTimeSlot) {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(`/api/trainers?timeSlot=${selectedTimeSlot}`);
                setTrainers(response.data);
            } catch (err) {
                setError("Failed to fetch trainers. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            setTrainers([]); // Clear trainers if no time slot is selected
        }
    };
  return (
    <div>
      <div className="mb-3">
        <label>Membership Type:</label>
        <select
          {...formik.getFieldProps("membershipType")}
          className="form-control"
        >
          <option value="" disabled>
            Select Membership
          </option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        {formik.touched.membershipType && formik.errors.membershipType && (
          <div className="text-danger">{formik.errors.membershipType}</div>
        )}
      </div>

      {/* Right Part - Membership, Time Slot, and Trainer */}
      <div style={{ flex: "1 1 45%" }}>
        <div className="mb-3">
          <label>Select Duration (Months):</label>
          <select
            {...formik.getFieldProps("membershipDuration")}
            className="form-control"
          >
            <option value="" disabled>
              Select Duration
            </option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
          {formik.touched.membershipDuration &&
            formik.errors.membershipDuration && (
              <div className="text-danger">
                {formik.errors.membershipDuration}
              </div>
            )}
        </div>
        <div className="mb-3">
          <label>Time Slot:</label>
          <select
            {...formik.getFieldProps("timeSlot")}
            className="form-control"
            onChange={handleTimeSlotChange}
          >
            <option value="" disabled>
              Select Time Slot
            </option>
            <option value="6AM to 8AM">6AM to 8AM</option>
            <option value="8AM to 10AM">8AM to 10AM</option>
            <option value="10AM to 12PM">10AM to 12PM</option>
            <option value="4PM to 6PM">4PM to 6PM</option>
            <option value="6PM to 8PM">6PM to 8PM</option>
            <option value="8PM to 10PM">8PM to 10PM</option>
          </select>
          {formik.touched.timeSlot && formik.errors.timeSlot && (
            <div className="text-danger">{formik.errors.timeSlot}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Select Trainer:</label>
          {formik.values.timeSlot ? (
            <>
              {loading && <div>Loading trainers...</div>}
              {error && <div className="text-danger">{error}</div>}
              {trainers.length > 0 ? (
                <select
                  {...formik.getFieldProps("trainer")}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select Trainer
                  </option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-warning">
                  Please select a time slot to load trainers.
                </div>
              )}
            </>
          ) : (
            <div className="text-warning">
              Please select a time slot to see available trainers.
            </div>
          )}
          {formik.touched.trainer && formik.errors.trainer && (
            <div className="text-danger">{formik.errors.trainer}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Membership;
