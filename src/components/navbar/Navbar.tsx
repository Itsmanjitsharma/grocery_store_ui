import './Navbar.scss';
const Navbar = () =>{
    return(
      <div className="navbar">
        <div className="logo">
            <img src='logo.svg' alt=''/>
            <span>I am {localStorage.getItem('role') || 'default role'}</span>
        </div>
        <div className="icons">
            <img src="/search.svg" alt="" className="icon" />
            <img src="/app.svg" alt="" className="icon" />
            <img src="/expand.svg" alt="" className="icon" />
            <div className="notification">
                <img src="/notifications.svg" alt="" />
                <span>1</span>
            </div>
            <div className="user">
                <img src="https://t4.ftcdn.net/jpg/01/35/97/83/360_F_135978399_qplk3WPu7JOA63JPCYVy1fb7MI4nefAL.jpg" alt="" />
                <span>{localStorage.getItem('role')}</span>
            </div>
            <img src="/setting.svg" alt="" className="icon" />
        </div>
      </div>
    )
}
export default Navbar;