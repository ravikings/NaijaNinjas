import React from 'react';

function SingleInputField({formik, id, title, defaultValue}) {
    return (
        <div className="col-lg-6 col-md-6">
            <div className="form-group">
                <label>{title}</label>
                <input
                    id={id}
                    defaultValue={defaultValue}
                    value={formik.values[id]}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    placeholder={title}
                />
            </div>
        </div>
    );
}

export default SingleInputField;