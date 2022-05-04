export const SET_ETH_WALLET_ADDRESS = 'SET_ETH_WALLET_ADDRESS';
export const SET_ETH_WALLET_BALANCE = 'SET_ETH_WALLET_BALANCE';
export const SET_ETH_METAMASK_CONNECTED = 'SET_ETH_METAMASK_CONNECTED';
export const SET_EYE_TOKEN_BALANCE = 'SET_EYE_TOKEN_BALANCE';

export const setEthWalletAddress = ethWalletAddress => ({
    type: SET_ETH_WALLET_ADDRESS,
    ethWalletAddress
});

export const setEthWalletBalance = ethWalletBalance => ({
    type: SET_ETH_WALLET_BALANCE,
    ethWalletBalance
});

export const setEthMetamaskConnected = ethMetamaskConnected => ({
    type: SET_ETH_METAMASK_CONNECTED,
    ethMetamaskConnected
});

export const setEyeTokenBalance = eyeTokenBalance => ({
    type: SET_EYE_TOKEN_BALANCE,
    eyeTokenBalance
});

export default function reducer(state = {
    ethMetamaskConnected: false,
    ethWalletAddress: '',
    ethWalletBalance: 0,
    eyeTokenBalance: 0,
}, action) {
    switch (action.type) {
        case SET_ETH_WALLET_ADDRESS:
            console.log(state);
            return {
                ...state,
                ethWalletAddress: action.ethWalletAddress
            }

        case SET_ETH_WALLET_BALANCE:
            return {
                ...state,
                ethWalletAddress: action.ethWalletBalance
            }

        case SET_ETH_METAMASK_CONNECTED:
            return {
                ...state,
                ethMetamaskConnected: action.ethMetamaskConnected
            }

        case SET_EYE_TOKEN_BALANCE:
            
            return {
                ...state,
                eyeTokenBalance: (parseInt(state.eyeTokenBalance) + parseInt(action.eyeTokenBalance))
            }
    }

    return state;
}