import React from "react";

const UpdateBandImageForm = (props) => {
    return (
        <form className="form" onSubmit={props.onSubmit}>
            <input type="file" name="bandImage" />
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
};

export default UpdateBandImageForm;
