import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1300));
}

function LoadingButton(props) {
  const { onLogin } = props;
  const [isLoading, setLoading] = useState(false);
  const handleClick = () => setLoading(true);
  //al cambiar isLoading ===true sigue:
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        onLoginHandler();
      });
    }
  }, [isLoading]);
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("no ethereum browser detected");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.log("Not window ethereum provider. multiple wallets?");
      }
      await provider.request({
        method: "eth_requestAccounts",
      });
      //LOGEO A USUARIO CONECTADO
      onLogin(provider);
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Connecting…" : "Connect Wallet"}
    </Button>
  );
}

//render(<LoadingButton />);

export default LoadingButton;
