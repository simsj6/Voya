function AddTripPage() {
  return (
    <section className="form-page form-page-tall">
      <div className="form-panel trip-panel">
        <h1>Add Trip</h1>

        <div className="trip-form-grid">
          <label className="field field-span-full">
            <span className="form-label">Destination*</span>
            <input type="text" defaultValue="Alaska, USA" />
          </label>

          <label className="field">
            <span className="form-label">Start Date*</span>
            <input type="text" defaultValue="07/24/26" />
          </label>

          <label className="field">
            <span className="form-label">End Date*</span>
            <input type="text" defaultValue="08/01/26" />
          </label>

          <label className="field trip-travelers-field">
            <span className="form-label">Number Of Travelers</span>
            <select defaultValue="2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>

          <label className="field field-span-full">
            <span className="form-label">Travelers</span>
            <input
              type="text"
              defaultValue="FakeEmail@Gmail.com, FakeEmail@Gmail.com"
            />
          </label>

          <label className="field field-span-full">
            <span className="form-label">Flight</span>
            <input type="text" defaultValue="Alaska Airlines 227" />
          </label>

          <label className="field field-span-full">
            <span className="form-label">Hotel</span>
            <input type="text" defaultValue="Holiday Inn" />
          </label>

          <label className="field field-span-full">
            <span className="form-label">Activities</span>
            <input type="text" defaultValue="Sledding, hiking" />
          </label>
        </div>

        <div className="form-actions">
          <button className="planner-button auth-submit" type="button">
            Add Trip
          </button>
        </div>
      </div>
    </section>
  )
}

export default AddTripPage
