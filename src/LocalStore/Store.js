import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

class Store {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }
  listRemind = JSON.parse(localStorage.getItem("reminders")) || [];

  popupRemind = () => {
    let data = JSON.parse(localStorage.getItem("reminders"));
    let current = new Date();
    for (let i = 0; i < data.length; i++) {
      if (current.toLocaleDateString() === data[i].date) {
        // alert("Hôm nay : " + data[i].content );
        console.log(data[i]);
        return `Hôm nay (${data[i].date}) : ${data[i].content}`;
      }
    }
  };
  styleRemid = (id) => {
    let current = new Date();
    for (let i = 0; i < this.listRemind.length; i++) {
      if (
        current.toLocaleDateString() === this.listRemind[i].date &&
        this.listRemind[i].id === id
      ) {
        return {
          backgroundColor: "lightblue",
        };
      }
    }
  };

  handleSubmit = (valueForm, errors, e) => {
    e.preventDefault();
    if (e.target[1].value !== "") {
      this.listRemind.push({
        id: uuidv4(),
        ...valueForm,
      });
      if (errors.length > 0) {
        alert(errors);
        return;
      }
      localStorage.setItem("reminders", JSON.stringify(this.listRemind));
    }
  };
  deleteItem = (itemProp) => {
    const items = JSON.parse(localStorage.getItem("reminders")).filter(
      (item) => item.id !== itemProp.id
    );
    this.listRemind = items;
    localStorage.setItem("reminders", JSON.stringify(this.listRemind));
  };
}

const remindStore = new Store();
export default remindStore;
