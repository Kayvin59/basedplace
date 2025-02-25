"use client"

import {
  Address,
  Avatar,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';


export default function ConnectWalletBtn() {

  return (
    <>
      <div className="flex">
        <Wallet>
          <ConnectWallet  className='w-fit inline-flex text-white text-base bg-footer hover:bg-foreground py-2 px-4 rounded-md'>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name /> 
              <Address />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </>
  );
}
