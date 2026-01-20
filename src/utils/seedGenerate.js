import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';

const bip32 = BIP32Factory(ecc);

function deriveEthereumWallet(seed) {
    const ethPath = "m/44'/60'/0'/0/0";
    const rootNode = ethers.HDNodeWallet.fromSeed(seed);
    const ethNode = rootNode.derivePath(ethPath);

    const ethereum = {
        pubkey: ethNode.publicKey,
        pvtKey: ethNode.privateKey,
        pubAddress: ethNode.address
    }

    return ethereum;
}

function deriveBitcoinWallet(seed) {
    const btcPath = "m/44'/0'/0'/0/0";
    const rootNode = bip32.fromSeed(seed);
    const btcNode = rootNode.derivePath(btcPath);
    const btcAddress = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(btcNode.publicKey),
    }).address;

    const publicKey = Buffer.from(btcNode.publicKey).toString('hex');

    const btc = {
        pubkey: publicKey,
        pvtKey: btcNode.toWIF(),
        pubAddress: btcAddress
    }

    return btc;
}

function deriveSolanaWallet(seed) {
    const solanaPath = "m/44'/501'/0'/0'";
    // Convert seed to hex string if it's a Buffer
    const seedHex = seed instanceof Buffer ? seed.toString('hex') : Buffer.from(seed).toString('hex');
    const solanaDerivedSeed = derivePath(solanaPath, seedHex).key;
    const solanaKeypair = Keypair.fromSeed(solanaDerivedSeed);
    const solanaAddress = solanaKeypair.publicKey.toBase58();
    const solanaPrivateKey = bs58.encode(solanaKeypair.secretKey);

    const solana = {
        pubkey: solanaAddress,
        pvtKey: solanaPrivateKey,
        pubAddress: solanaAddress
    }

    return solana;
}


export async function main() {
    const wallet = {};
    const mnemonic = bip39.generateMnemonic();
    wallet.mnemonic = mnemonic;

    const seed = await bip39.mnemonicToSeed(mnemonic);
    wallet.seed = seed.toString('hex'); // Store as hex string for consistency

    const et = deriveEthereumWallet(seed);
    const bt = deriveBitcoinWallet(seed);
    const so = deriveSolanaWallet(seed);

    wallet.ethereum = et;
    wallet.bitcoin = bt;
    wallet.solana = so;


    return wallet; // Return the wallet for potential use
}