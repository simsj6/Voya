import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import toast from "react-hot-toast";
import Field from "../Field/Field";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import "../../pages/Profile/Profile.css";

export default function Trip ({ trip, onDelete }) {
  const [form, setForm] = useState(trip);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    setForm(trip);
    setIsShared(form.is_shared);
  }, [trip]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("User"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.error("Sign in before updating a trip.");
      return;
    }

    if (form.is_shared && !form.emails) {
      const message = "Please enter email to share trip.";
      toast.error(message);
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/profile/my-trips"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: user.email,
          id: form._id,
          destination: form.destination,
          startDate: form.start,
          endDate: form.end,
          numTravelers: form.num_travelers,
          travelers: form.emails ? form.emails.split(", ").filter(Boolean) : [],
          flight: form.flight,
          hotel: form.hotel,
          activities: form.activities ? form.activities.split(", ").filter(Boolean) : [],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data.error || "Trip update failed.";
        toast.error(message);
        return;
      }
      toast.success(data.message || "Trip update successful.");
    } catch (err) {
      console.error(err);
      const message = "Network error. Is the server running?";
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.error("Sign in before deleting a trip.");
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/profile/my-trips"), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: user.email,
          id: form._id,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data.error || "Trip delete failed.";
        toast.error(message);
        return;
      }
      toast.success(data.message || "Trip deleted successfully.");
      onDelete(form._id);
    } catch (err) { 
      console.error(err); 
      const message = "Network error. Is the server runing?";
      toast.error(message);
    }
  };

  return (
    <ProfilePanel title={`Going to: ${form.destination}`}>
      <form onSubmit={handleSave}>
      <div className="two-col">
        <Field
          label="Start Date"
          value={form.start || ""}
          onChange={(value) => handleChange("start", value)}
        />
        <Field
          label="End Date"
          value={form.end || ""}
          onChange={(value) => handleChange("end", value)}
        />
      </div>

      <div className="two-col">
        <Field
          label="Flight"
          value={form.flight || ""}
          onChange={(value) => handleChange("flight", value)}
        />
        <Field
          label="Hotel"
          value={form.hotel || ""}
          onChange={(value) => handleChange("hotel", value)}
        />
      </div>

      <div className="travelers-row">
        <div className="shared">
          <Field
            label="# travelers"
            value={form.num_travelers || ""}
            onChange={(value) => handleChange("num_travelers", value)}
          />
          <label className="field">
            <span>Shared?</span>
            <input
              type="checkbox"
              id="check"
              checked={form.is_shared}
              onChange={() => {
                setIsShared(!isShared);
                handleChange("is_shared", !form.is_shared);
              }}
            />
          </label>
        </div>
        {
          form.is_shared &&
          <Field
            label="Other Travelers"
            value={form.emails || ""}
            onChange={(value) => handleChange("emails", value)}
            style={{
              width: "100%",
              backgroundColor: "black"
            }}
          />
        }
      </div>

      <div className="activities">
        <Field
          label="Activities"
          value={form.activities || ""}
          onChange={(value) => handleChange("activities", value)}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button className="primary small" type="submit">
          Save
        </button>
        <button className="primary small" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      </form>
    </ProfilePanel>
    )
}
