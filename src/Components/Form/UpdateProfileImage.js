import React from "react";

const UpdateBandImageForm = (props) => {
    return (
        <form onSubmit={(e) => props.onSubmit(e)}>
            <input type="file" name="profile-image" />
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
};

export default UpdateBandImageForm;
