import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import Field from "../Field/Field";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import "../../pages/Profile/Profile.css";

export default function Trip ({ trip }) {
  const [form, setForm] = useState(trip);

  useEffect(() => {
    setForm(trip);
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
        console.error(data.error || "Trip update failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfilePanel title={`Going to ${form.destination}`}>
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
          <Field
            label="Shared?"
            value={form.is_shared ? "Yes" : "No"}
            onChange={(value) => handleChange("is_shared", value === "Yes")}
          />
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

      <button className="primary small" type="submit">
        Save
      </button>
      </form>
    </ProfilePanel>
    )
}
