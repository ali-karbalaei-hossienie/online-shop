const Input = ({ label, name, type = "text", formik }) => {
  return (
    <div className="formControl">
      <label>{label}</label>
      <input type={type} {...formik.getFieldProps({ name })} name={name} />
      {formik.errors[name] && formik.touched[name] && (
        <div className="errorFormik"> {formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
