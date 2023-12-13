import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';
import { adminMenu, serviceMenu } from '../../data'; // Import adminMenu and serviceMenuconst Menu = ({ role }) => {
  const Menu = ({ role }) => {  
const location = useLocation();
  // Select the menu based on the user's role
  const selectedMenu = role === 'admin' ? adminMenu : serviceMenu || [];

  return (
    <div className="manu">
      {selectedMenu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((subItem) => (
            <Link
              to={subItem.path}
              className={`listItems ${location.pathname === subItem.path ? 'selected' : ''}`}
              key={subItem.id}
            >
              <img src={subItem.icon} alt="" />
              <span className="listItemTitle">{subItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
