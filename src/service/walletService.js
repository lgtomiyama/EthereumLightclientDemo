import crypto from 'react-native-crypto';
import Web3 from 'web3';
import lightwallet from 'eth-lightwallet';
import HookedWeb3Provider from 'hooked-web3-provider';
import { AsyncStorage} from 'react-native';
import React from 'react';
let instance = null;
let walletAddress = '';
let walletSeed = '';

class WalletService {
    static getInstance() {
        if (instance === null) {
            instance = new WalletService();
        }
        return instance;
    };
    constructor() {
        // this.createAccount();
    }      
    async createAccount(pwd, seedText){
        var password = 'everis@2018';
        var seed = 'hungry gentle confirm before glue office pen tissue accuse fix black thunder';
        lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seed,
            hdPathString: "m/0'/0'/0'"
        }, async function (err, ks ) {
            ks.keyFromPassword(password,async function (err, pwDerivedKey) {
                if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
                    throw new Error("Incorrect derived key!");
                }
                
                try {
                    ks.generateNewAddress(pwDerivedKey, 1);
                } catch (err) {
                    console.log(err);
                    console.trace();
                }
                this.address = ks.getAddresses()[0];
                this.prv_key = ks.exportPrivateKey(this.address, pwDerivedKey);
                await AsyncStorage.setItem('walletAddress', this.address);
                await AsyncStorage.setItem('walletPrivateKey', this.prv_key);
                
                console.log('address and key: ', this.address, this.prv_key);
                var web3Provider = new HookedWeb3Provider({
                    host: "https://net.everchain.tk",
                    transaction_signer: ks
                });
                const web3 = new Web3(web3Provider);
                await web3.eth.getBalance(this.address, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let acBalance = web3.utils.fromWei( data, 'ether');
                    await AsyncStorage.setItem('walletBalance', acBalance);
                }
                });
            });
        });
        const receiveWalletBalance = await AsyncStorage.getItem('walletBalance');
        const receiveWalletWalletAddress = await AsyncStorage.getItem('walletAddress');
        walletAddress = receiveWalletWalletAddress;
        walletBalance = receiveWalletBalance;
        // console.log('balance: '+ JSON.stringify(walletBalance) );
        return walletBalance;
    }
    onSuccess(e) {
        Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    }
    getWalletAdderess() {
        return walletAddress;
    }
    getWalletSeed() {
        return walletSeed;
    }
    getWalletPKey() {
        return WalletPKey;
    }
    getWalletBallance(){
        return this.createAccount();
    }
}
module.exports = WalletService;