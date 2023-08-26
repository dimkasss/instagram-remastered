import InstagramLogo from '../../assets/instagram.svg';
import Dropdown from './Dropdown';

const Header = () => {
  return ( 
    <div className="flex justify-between items-center">
      <img src={InstagramLogo} width="50px"></img>
      <Dropdown/>
    </div>
   );
}
 
export default Header;