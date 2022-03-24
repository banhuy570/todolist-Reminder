import React from "react";
import ItemRemind from "./ItemRemind";
import { observer } from "mobx-react";
import remindStore from "../LocalStore/Store";
import { useEffect } from "react";

const ListReminders = () => {
  localStorage.setItem("reminders", JSON.stringify(remindStore.listRemind));
  useEffect(() => {
    const remind = JSON.parse(localStorage.getItem("reminders"));
    remindStore.listRemind = remind;
  }, []);
  return (
    <div className="col list">
      {remindStore.listRemind.length > 0
        ? remindStore.listRemind.map((item) => (
            <ItemRemind
              key={item.id}
              item={item}
              styleRemid={remindStore.styleRemid(item.id)}
            />
          ))
        : null}
    </div>
  );
};

export default observer(ListReminders);
