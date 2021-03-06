import logo from 'Assets/logo/logo.jpg';
import './Footer.css'

export default function Footer(): JSX.Element {

  return (
    <footer className="footer">
      <img src={logo} className="logo" alt="Travelog logo" />
      <div className="text">
        <p><b>Travelog</b> <span className="extended">is an exiting new project brought to you by the same team that<br />brought you: PawDetective, Vinco, Pink Wars Battlefront and StarFleet.</span> &copy; 2021</p>
      </div>
    </footer>
  )
}
