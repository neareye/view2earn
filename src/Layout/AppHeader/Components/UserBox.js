import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';

import {
    faCalendarAlt,
    faAngleDown,
    faEye

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import 'react-toastify/dist/ReactToastify.css';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

import {
    setEthMetamaskConnected,
    setEthWalletAddress,
    setEyeTokenBalance
} from '../../../reducers/WalletOptions';
import Web3 from 'web3';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.detectCurrentProvider = this.detectCurrentProvider.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.checkConnectedWallet = this.checkConnectedWallet.bind(this);
        this.checkConnectedWallet();
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    checkConnectedWallet = () => {
        let {ethWalletAddress, setEthWalletAddress, setEyeTokenBalance} = this.props;
        const userData = JSON.parse(localStorage.getItem('nyinf'));
        if (userData != null) {
          setEthWalletAddress(userData.account);
          setEyeTokenBalance(userData.eyeTokenBalance);
        }
    }

    detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
          provider = window.ethereum;
        } else if (window.web3) {
          // eslint-disable-next-line
          provider = window.web3.currentProvider;
        } else {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
        }
        return provider;
    };

    onConnect = async () => {
        try {
          let {ethWalletAddress, setEthWalletAddress} = this.props;
          
          const currentProvider = this.detectCurrentProvider();
          if (currentProvider) {
            if (currentProvider !== window.ethereum) {
              console.log(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
              );
            }

            await currentProvider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(currentProvider);
            const userAccount = await web3.eth.getAccounts();
            const chainId = await web3.eth.getChainId();
            let account = userAccount[0];
            let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
            ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei

            const usrInfo = {
                // account: account,
                account: account,
                balance: ethBalance,
                connectionid: chainId,
                eyeTokenBalance: 0
            };
            window.localStorage.setItem('nyinf', JSON.stringify(usrInfo));
            
            // saveUserInfo(ethBalance, account, chainId);
            console.log('userinfo: ', ethBalance, account, chainId);
            setEthWalletAddress(account);

            if (userAccount.length === 0) {
              console.log('Please connect to meta mask');
            }
          }
        } catch (err) {
          console.log(
            'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
          );
        }
    };
    
    onDisconnect = () => {
        let {ethWalletAddress, setEthWalletAddress, eyeTokenBalance} = this.props;
        window.localStorage.removeItem('nyinf');
        setEthWalletAddress('');
    };

    render() {
        // get state here
        let {
            ethWalletAddress,
            eyeTokenBalance
        } = this.props;

        return (
            <Fragment>
                <div className="header-btn-lg pe-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                Balance:
                            </div>

                            <div className="widget-content-left  ms-3 header-user-info">
                                <div className="widget-heading">
                                     {eyeTokenBalance} <FontAwesomeIcon className="me-2 ms-2" icon={faEye} />
                                </div>
                            </div>

                            <div className="widget-content-right header-user-info ms-3">
                                {!ethWalletAddress && (
                                    <Button className="btn-shadow p-1" size="sm" onClick={this.onConnect} color="info">
                                        Connect Wallet
                                    </Button>
                                )}

                                {ethWalletAddress && (
                                    <>
                                        <span>{ethWalletAddress}</span>
                                        <Button className="btn-shadow p-1 m-2" size="sm" onClick={this.onDisconnect} color="danger">
                                            Disconnect
                                        </Button>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    ethMetamaskConnected: state.WalletOptions.ethMetamaskConnected,
    ethWalletAddress: state.WalletOptions.ethWalletAddress,
    eyeTokenBalance: state.WalletOptions.eyeTokenBalance,
});

const mapDispatchToProps = dispatch => ({
    setEthMetamaskConnected: connected => dispatch(setEthMetamaskConnected(connected)),
    setEthWalletAddress: add => dispatch(setEthWalletAddress(add)),
    setEyeTokenBalance: add => dispatch(setEyeTokenBalance(add)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);