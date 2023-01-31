import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [ user, setUsers] = useState([])

  useEffect(()=>{
      const getUsers = async () =>{
        try{
        const res = await userRequest.get("users/?new=true")
        console.log(res.data)
        setUsers(res.data)
      }catch{}
      };
      getUsers();
  },[])


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {user.map(user=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
