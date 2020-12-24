import React from "react";

const form = props => {
    const handleOnChange = event => {
        //
    }
    return (
            <form onSubmit={props.submit} className="form" action="">
                {props.inputs.map((input, index) => {
                    let inputTag;
                    if (!input.type) input.type = 'text';
                    switch (input.type.toLowerCase()) {
                        case "textarea":
                            inputTag = (
                                <>
                                    <label
                                        className="form__label"
                                        htmlFor={
                                            input.name
                                                ? input.name
                                                : input.title.toLowerCase()
                                        }
                                    >
                                        {input.title}
                                    </label>
                                    <textarea
                                        className={[
                                            "form__input",
                                            input.modifier && input.modifier
                                        ].join(" ")}
                                        type={input.type ? input.type : "text"}
                                        placeholder={
                                            input.placeholder
                                                ? input.placeholder
                                                : ""
                                        }
                                        name={
                                            input.name
                                                ? input.name
                                                : input.title.toLowerCase()
                                        }
                                        defaultValue={
                                            input.value && input.value
                                        }
                                        required={
                                            input.required
                                                ? input.required
                                                : false
                                        }
                                        onChange={e => handleOnChange(e)}
                                    ></textarea>
                                </>
                            );
                            break;
                        case "select":
                            inputTag = (
                                <>
                                <label
                                className="form__label"
                                htmlFor={
                                    input.name
                                        ? input.name
                                        : input.title.toLowerCase()
                                }
                            >
                                {input.title}
                            </label>
                            <select className="form__select" name={input.title.toLowerCase()}>
                                {input.options.map((option, i) => <option key={i} value={option.value} >{option.content}</option>)}
                            </select>
                            </>)
                            break;
                        default:
                            inputTag = (
                                <>
                                    <label
                                        className="form__label"
                                        htmlFor={
                                            input.name
                                                ? input.name
                                                : input.title.toLowerCase()
                                        }
                                    >
                                        {input.title}
                                    </label>
                                    <input
                                        className={[
                                            "form__input",
                                            input.modifier && input.modifier
                                        ].join(" ")}
                                        type={input.type ? input.type : "text"}
                                        placeholder={
                                            input.placeholder
                                                ? input.placeholder
                                                : ""
                                        }
                                        name={
                                            input.name
                                                ? input.name
                                                : input.title.toLowerCase().replace(' ', '-')
                                        }
                                        value={
                                            input.value && input.value
                                        }
                                        required={
                                            input.required
                                                ? input.required
                                                : false
                                        }
                                        onChange={e => handleOnChange(e)}
                                        autoComplete={"on"}
                                    />
                                </>
                            );
                    }
                    return (
                        <React.Fragment key={index}>{inputTag}</React.Fragment>
                    );
                })}
                <div className="form__control">
                    <button
                        type="button"
                        onClick={props.close}
                        className="form__control__cancel button-subtle button-subtle--warning"
                    >
                        cancel
                    </button>
                    <button
                        type="submit"
                        className="form__control__submit button button--continue"
                    >
                        {props.buttonText ? props.buttonText : 'create' }
                    </button>
                </div>
            </form>
    );
};

export default form;
