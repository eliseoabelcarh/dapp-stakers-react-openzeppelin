import * as Icon from 'react-bootstrap-icons';
import StakerModel from '../services/StakerModel';
const WelcomeWallet = (props) => {

  return (
    <div style={{color:"whitesmoke"}}>
      {/* <Meta title={pageTitle}/> */}
      {/* <Header head={pageTitle} description={pageDescription} /> */}
      <Icon.Wallet2 color="royalblue" size={25} /> {!props.currentAccount? "":props.currentAccount}
    </div>
  )
}

export default WelcomeWallet