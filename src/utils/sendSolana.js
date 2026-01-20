import { Connection, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';


export async function sendSolanaTransactionRaw(privateKey, to, amount) {
  const connection = new Connection(`https://go.getblock.us/5392ac99c92841d0a12aa48c2c3194fc`);

  const fromKeypair = Keypair.fromSecretKey(bs58.decode(privateKey));
  const toPublicKey = new PublicKey(to);

  try {
    // Get recent blockhash
    const latestBlockhash = await connection.getLatestBlockhash();

    // Create transaction
    const transaction = new Transaction();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = fromKeypair.publicKey;

    // Add the transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL
      })
    );

    // Sign the transaction
    transaction.sign(fromKeypair);

    // Send raw transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
      {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      }
    );

    console.log('Transaction sent:', signature);

    // Confirm transaction
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    console.log('Transaction confirmed:', confirmation);

    return signature;
  } catch (error) {
    console.log('Transaction failed:', error);
    throw error;
  }
}
