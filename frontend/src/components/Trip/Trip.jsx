import Field from "../Field/Field";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import "../../pages/Profile/Profile.css";

export default function Trip ({ trip }) {
  const handleSave = () => {
    console.log("Saved profile:", profile);
    //when we have the backend we save it there later
  };

  return (
    <ProfilePanel title={`Going to ${trip.destination}`}>
      <div className="two-col">
        <Field
          label="Start Date"
          value={trip.start}
          onChange={(value) => handleChange("start", value)}
        />
        <Field
          label="End Date"
          value={trip.end}
          onChange={(value) => handleChange("end", value)}
        />
      </div>

      <div className="two-col">
        <Field
          label="Flight"
          value={trip.flight}
          onChange={(value) => handleChange("flight", value)}
        />
        <Field
          label="Hotel"
          value={trip.hotel}
          onChange={(value) => handleChange("hotel", value)}
        />
      </div>

      <div className="travelers-row">
        <div className="shared">
          <Field
            label="# travelers"
            value={trip.num_travelers}
            onChange={(value) => handleChange("num_travelers", value)}
          />
          <Field
            label="Shared?"
            value={trip.is_shared ? "Yes" : "No"}
          />
        </div>
        {
          trip.is_shared &&
          <Field
            label="Other Travelers"
            value={trip.emails}
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
          value={trip.activities}
        />
      </div>

      <button className="primary small" onClick={handleSave}>
        Save
      </button>
    </ProfilePanel>
    )
}