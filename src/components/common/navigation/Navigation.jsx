import React, { useState,useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import './Navigation.css'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

const Navigation = () => {
  const [isMenu, setisMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes("videoplayer")){
      setisMenu(2);
      return;
    }
    if(location.pathname.includes("/api/post")){
      setisMenu(4);
      return;
    }
    setisMenu(-1);
    switch(location.pathname){
      case '/':
        setisMenu(1);
      break
      case '/Videos':
        setisMenu(2);
      break
      case '/Note':
        setisMenu(3);
      break
      case '/Community':
      case '/WriteCommunity':
        setisMenu(4);
      break
      default:
    }
  }, [location]); // location 객체를 의존성 배열에 추가
  
console.log(window.location.href);
  return (
    <div className='navigation'>
      <Link to={'/'} style={{fontWeight:  (isMenu == 1 ?"bold":"") }}>Home</Link>
      <Link to={'/Videos'} style={{fontWeight:  (isMenu == 2 ?"bold":"") }}>Videos</Link>
      <Link to={'/Note'} style={{fontWeight:  (isMenu == 3 ?"bold":"") }}>Note</Link>
      <Link to={'/Community'} style={{fontWeight:  (isMenu == 4 ?"bold":"") }}>Community</Link>
    </div>
  );
};

export default Navigation;