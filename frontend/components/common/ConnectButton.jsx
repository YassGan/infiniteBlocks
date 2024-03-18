import { InjectedConnector } from 'wagmi/connectors/injected';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { getEllipsisTxt } from '../utils/format';
import { useEffect, useRef, useState } from "react";
import { useWeb3Modal as createWeb3Modal } from '@web3modal/wagmi/react'
import { SiweMessage } from 'siwe';

const ConnectButton = (props) => {
  var [toast, setToast] = useState({ isError: false, error: "" });
  const toastRef = useRef();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { data } = useSession();
  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect: async (data) => {
      if (!data.isReconnected) {
        try {
          const message = new SiweMessage({
            domain: window.location.host,
            address: data.address,
            statement: "Sign in with Ethereum to the app.",
            uri: window.location.origin,
            version: "1",
            chainId: chain?.id,
            nonce: await getCsrfToken(),
          });
          const signature = await signMessageAsync({ message: message.prepareMessage() });
          signIn("credentials", {
            message: JSON.stringify(message),
            redirect: false,
            signature
          });
        } catch (e) {
          console.log(e);
          setToast({ isError: true, error: "You need to accept signing to ensure connection" });
          await disconnectAsync();
        }
      }
    }
  })

  useEffect(() => {
    const bootstrap = require('bootstrap');
    var myToast = toastRef.current
    var bsToast = bootstrap.Toast.getInstance(myToast)

    if (!bsToast) {
      // initialize Toast
      bsToast = new bootstrap.Toast(myToast, { autohide: false })
    } else {
      (toast.isError) ? bsToast.show() : bsToast.hide();
    }
  });

  const handleAuth = async () => {
    if (!isDisconnected) {
      await disconnectAsync();
    } else {
      const modal = createWeb3Modal();
      await modal.open();
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };

  if (data?.user) {
    return (
      <>
        <button className="login-btn-three rounded-circle tran3s me-3" onClick={handleDisconnect} >
          <i className="bi bi-person" />
        </button>
        {getEllipsisTxt(data.user.id)}
      </>
    );
  }

  return (
    <div>
      <div className="toast bg-danger position-fixed bottom-0 end-0 m-4" role="alert" ref={toastRef}>
        <div className="toast-header">
          <strong className="me-auto">Error</strong>
          <small>4 mins ago</small>
          <button type="button" className="btn-close" onClick={() => setToast({ isError: false })} aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {toast.error}
        </div>
      </div>
      <div>
        <button className={`${(props.isWhite) ? 'btn-twentyOne' : 'start-btn-two'} fw-500 position-relative d-none d-lg-block`} onClick={handleAuth}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectButton;
