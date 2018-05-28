import crypto from 'react-native-crypto';
import Web3 from 'web3';
import lightwallet from 'eth-lightwallet';
import HookedWeb3Provider from 'hooked-web3-provider';
import { AsyncStorage} from 'react-native';
import React from 'react';
let instance = null;
let walletAddress = '';
let walletSeed = '';
let web3 = null;
class WalletService {
    static getInstance() {
        if (instance === null) {
            instance = new WalletService();
        }
        
        return instance;
    };
    constructor() {
         
    }
    async getLogged(){
        const receiveWalletBalance = await AsyncStorage.getItem('walletBalance');
        const receiveWalletWalletAddress = await AsyncStorage.getItem('walletAddress');
        const logged = {
            account: receiveWalletWalletAddress,
            balance: receiveWalletBalance   
        };
        return logged;
    }      
    async getWalletAdderess(){
        var cAddress = await AsyncStorage.getItem('walletAddress');
        console.log(cAddress != null);
        return cAddress;
    }
    async createAccount(password, seedText){
        password = 'everis@2018';
        seedText = 'hungry gentle confirm before glue office pen tissue accuse fix black thunder';
        if(seedText === null){
            seedText = lightwallet.keystore.generateRandomSeed();
        }
        lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seedText,
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
                await AsyncStorage.setItem('walletPassword', password);
                await AsyncStorage.setItem('walletPrivateKey', this.prv_key);
                await AsyncStorage.setItem('walletSeed', seedText);
                console.log('address and key: ', this.address, this.prv_key);
                var web3Provider = new HookedWeb3Provider({
                    host: "https://net.everchain.tk",
                    transaction_signer: ks
                });
                web3 = new Web3(web3Provider);

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
        console.log(receiveWalletBalance);
        return walletBalance;
    }
    onSuccess(e) {
        Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    }
    // getWalletAdderess() {
    //     return walletAddress;
    // }
    getWalletSeed() {
        return walletSeed;
    }
    getWalletPKey() {
        return WalletPKey;
    }
    async getWalletBallance(){
        let acBalance;
        let nweb3;
        if(web3 === null){
            console.log('web3 null');
            nweb3 = await this.createWeb3();
            console.log(nweb3);
        }else{
            nweb3 = web3;
        }
        
        await nweb3.eth.getBalance(walletAddress, async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                acBalance = nweb3.utils.fromWei( data, 'ether');
                await AsyncStorage.setItem('walletBalance', acBalance);
                return acBalance;
            }
        });
        return acBalance;
    }
    async transfer(toAccount,transferValue){
        const password = await AsyncStorage.getItem('walletPassword');
        const seedText = await AsyncStorage.getItem('walletSeed');
        console.log('senha' + password);
        console.log('seedText' + seedText);
        await lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seedText,
            hdPathString: "m/0'/0'/0'"
        }, function (err, ks ) {
            ks.keyFromPassword(password, function (err, pwDerivedKey) {
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
                console.log('Created w3: ', this.address, this.prv_key);
                var web3Provider = new HookedWeb3Provider({
                    host: "https://net.everchain.tk",
                    transaction_signer: ks
                });
                console.log('to: '+toAccount);
                console.log('v: '+transferValue);
                web3.eth.sendTransaction({                    
                    from: this.address,
                    to: toAccount, 
                    value: transferValue}, async (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
            });
        });
    }
    async createWeb3(){
        const password = await AsyncStorage.getItem('walletPassword');
        const seedText = await AsyncStorage.getItem('walletSeed');
        console.log('senha' + password);
        console.log('seedText' + seedText);
        
        await lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seedText,
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
                await AsyncStorage.setItem('walletSeed', seedText);
                console.log('Created w3: ', this.address, this.prv_key);
                var web3Provider = new HookedWeb3Provider({
                    host: "https://net.everchain.tk",
                    transaction_signer: ks
                });
                web3 = new Web3(web3Provider);
                console.log('inside w3'+ web3);

            });
        });
        return web3;
    }
}
module.exports = WalletService;