import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react";
import remindStore from "../LocalStore/Store";

const ItemRemind = ({ item, styleRemid }) => {
  return (
    <div className="item" style={styleRemid}>
      <div className="itemRemind">
        <span className="item__date">{item.date}</span>
        <span className="item__content">Nội dung : {item.content}</span>
      </div>
      <div className="itemBtn" onClick={() => remindStore.deleteItem(item)}>
       Remove <CloseIcon />
      </div>
    </div>
  );
};

export default observer(ItemRemind);
