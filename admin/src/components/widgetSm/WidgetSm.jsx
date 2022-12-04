import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../redux/requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("users");
      setUsers(res.data);
    };
    try{
      getUsers();
    }catch(e){
      console.log(e);
    }
    
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => {
          return(<li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img || "https://i0.wp.com/crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif?zoom=1.5&fit=150%2C150&ssl=1"
              }
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
          </li>);
        })}
        
      </ul>
    </div>
  );
}
