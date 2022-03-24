import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { observer } from "mobx-react";
import remindStore from "../LocalStore/Store";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";

const Form = () => {
  useEffect(() => {
    remindStore.popupRemind();
  }, []);
  const [valueForm, setvalueForm] = useState({
    content: "",
    date: "",
  });
  const [errors, setErrors] = useState({
    content: "",
    date: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setvalueForm({
      date: valueForm.date,
      content: e.target.value,
    });
    if (!value) {
      setErrors({ [name]: `vui lòng nhập ${name} ` });
    } else {
      setErrors({ [name]: "" });
    }
  };
  const handleChangeDate = (e) => {
    setvalueForm({
      content: valueForm.content,
      date: e.toLocaleDateString(),
    });
  };
  const submit = (e) => {
    e.preventDefault();
    if (!valueForm.content && !valueForm.date) {
      setErrors({
        date: "Vui lòng nhập ngày nhắc",
        content: "Vui lòng nhập nội dung",
      });
      return;
    }

    if (!valueForm.content) {
      setErrors({ ...errors, content: "Vui lòng nhập nội dung" });
      return;
    }
    if (!valueForm.date) {
      setErrors({ ...errors, date: "Vui lòng nhập ngày nhắc" });
      return;
    }

    setvalueForm({
      content: "",
      date: "",
    });
    remindStore.handleSubmit(valueForm, errors, e);
  };
  return (
    <div className="col">
      <div>
        <h5 style={{ color: "red" }}>{remindStore.popupRemind()}</h5>
      </div>
      <ToastContainer />
      <form className="form-inline" action="#" onSubmit={(e) => submit(e)}>
        <div className="form-group form1">
          <label htmlFor="content">Nội dung</label>
          <input
            value={valueForm.content}
            type="text"
            className="form-control"
            id="content"
            name="content"
            onChange={(e) => handleInput(e)}
            autoComplete="off"
          ></input>
        </div>
        <div className="form-group form2">
          <label htmlFor="date">Ngày nhắc</label>
          <DatePicker
            className="inputDate rounded"
            placeholderText="dd/mm/yyyy"
            value={valueForm.date}
            minDate={new Date()}
            autoComplete="off"
            onChange={(e) => {
              handleChangeDate(e);
            }}
            name="date"
          ></DatePicker>
        </div>
        <button className="btn btn-dark">Lưu Ngay</button>
      </form>
      <div style={{ color: "red" }}>
        <p>{errors.content}</p>
        <p>{errors.date}</p>
      </div>
    </div>
  );
};

export default observer(Form);
