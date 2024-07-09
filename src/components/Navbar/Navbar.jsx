import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import avatar from "./../../img/avatar.png";

const Navbar = (props) => {
  // let friendsData = props.friends.map((friend) => {
  //   return (
  //     <div className={s.friendName}>
  //       <img src={avatar} className={s.avatar} />
  //       {/* <div className={s.avatar}></div> */}
  //       {friend.name}
  //     </div>
  //   );
  // });

  return (
    <nav className={s.nav}>
      <div>
        <NavLink
          to="/profile"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/dialogs"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Users
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/music"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Music
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/settings"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Settings
        </NavLink>
      </div>

      <div className={s.friends}>
        <NavLink
          to="/friends"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Friends
        </NavLink>
        {/* <div className={s.friendsData}>{friendsData}</div> */}
      </div>
    </nav>
  );
};

export default Navbar;
