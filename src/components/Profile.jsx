import mainImg from "../img/peaches.jpeg";
import profileImg from "../img/profile-img.jpeg";
import peachNumb from "../img/529peach_100978.png"

const Profile = () => {
  return (
    <div className="content">

      <div>
        <img src={mainImg} alt="" className="mainImg" />
      </div>

      <div className="profile">
        <img src={profileImg} alt="" className="profileImg" />
        <div>
          <h2>Golovach Lolita</h2>
          <p>
            Date of birth: 19 April <br />
            City: Chernivtsi <br />
            Education: Bachelor
          </p>
        </div>
      </div>

      <div className="posts">
        <h3>My posts</h3>
        
        <div className="inputs">
          <input type="text" className="input-post" />
          <input type="button" value="Send" className="send-btn" />
        </div>

        <div>
          <div className="flex">
            <img src={peachNumb} alt="" className="peachNumb" />
            I love it!
          </div>
          <div className="flex">
            <img src={peachNumb} alt="" className="peachNumb" />
            Peach =)
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
