// import React, { useState, useEffect } from 'react';
// import * as anchor from '@project-serum/anchor';
// import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
// import idl from './myproject.json'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNote } from '../hooks/note';
import Loading from '../components/Loading';
import NoteSection from '../components/note/NoteSection';
import styles from '../styles/Home.module.css'
import { PlusSmIcon } from '@heroicons/react/solid'
import Link from 'next/link';


const Home = () => {
    const { initialized, anchorWallet, loading, transactionPending, completedTodos, incompleteTodos, input, content,  handleChange, initializeUser, addNote, updateNote, removeNote } = useNote()


    return (
        <div className={styles.container}>
            {initialized && anchorWallet ? (
                <div className={styles.actionsContainer}>
                    <div className={styles.todoInput}>
                        <div className={`${styles.todoCheckbox} ${styles.checked}`} />
                        <div className={styles.inputContainer}>
                            <form onSubmit={addNote}>
                                <input value = {input} onChange={handleChange} id={styles.inputField} type="text" placeholder='Add a new note...' />
                            </form>
                        </div>
                        <div className={styles.iconContainer}>
                            <PlusSmIcon 
                                className={styles.plusIcon}
                                onClick={addNote}
                            />
                        </div>
                    </div>
                    <WalletMultiButton />
                </div>  
                ) : (
                    <div className={styles.actionsContainer}>
                    </div>
                )} 
           
            {initialized && anchorWallet ? (
            <div className={styles.mainContainer}>
                <Loading loading={loading}>
                    <NoteSection 
                        title="Notes" 
                        todos={incompleteTodos} 
                        actionUpdate={updateNote} 
                        actionRemove={removeNote}
                    />

                    {/* <NoteSection title="Completed" todos={completedTodos} action={removeTodo} /> */}
                </Loading>
            </div>
            ):(
                <div className={styles.subContainer}>
                    <h2 className={styles.header}>Daoist Note dApp</h2>     

                    <div className={styles.landingActionsContainer}>

                        <WalletMultiButton />
                        { !initialized && anchorWallet ? (
                        <button
                        type="button"
                        className={styles.button}
                        onClick={() => initializeUser()}
                        disabled={transactionPending}
                        >
                        {transactionPending ? 'Loading...' : 'Initialize'}
                        </button>
                        ):(<></>)}
                 
                    </div>
                </div>
            )}

            {initialized && anchorWallet ? (
                <></>
            ):(
                <div className={styles.footer}>
                <div className={styles.imageContainer}>
                    <Link href="https://theblokc.com">
                        <a target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                        <img 
                            src="/theBlokc.png" 
                            alt="theBlock.icon" 
                            width={200} 
                            height={100} 
                            style={{ filter: 'drop-shadow(0 0 0.075em #fbfdfdda)' }} 
                         />
                        </a>
                    </Link>
                    <Link href="https://solana.org/">
                        <a target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                        <img 
                            src="/solana-foundation.png" 
                            alt="solana-foundation.icon" 
                            width={360} 
                            height={95} 
                            style={{ filter: 'drop-shadow(0 0 0.15em #fbfdfdda)' }} 
                         />
                        </a>
                    </Link>
                </div>
            </div>
            )}
        </div>
    )
}

export default Home



// const { SystemProgram, Keypair } = anchor.web3;

// let myAccount = Keypair.generate();

// const programID = new PublicKey(idl.metadata.address);
// console.log('program Id set correctly:', programID);

// const network = clusterApiUrl('devnet');

// const opts = {
//     preflightCommitment: 'processed',
// }

// function App() {
//     const [walletAddress, setWalletAddres] = useState(null);
//     const [retrieveValue, setRetrieveValue] = useState(null);
//     const [inputValue, setInputValue] = useState('');

//     useEffect(() => {
//         async function checkWallet() {
//             try {
//                 if (window.solana) {
//                     const solana = window.solana;
//                     if (solana.isPhantom) {
//                         console.log('wallet detected!');
//                         alert('Phantom wallet found!');
//                         const res = await solana.connect({ onlyIfTrusted: true });
//                         console.log('connected with publicKey:', res.publicKey.toString());
//                         setWalletAddres(res.publicKey.toString());
//                         await retrieve();
//                         if (retrieveValue === null) {
//                             await createAccount();
//                         }
//                     }
//                 } else {
//                     alert('wallet not found!');
//                     console.log('wallet not found!');
//                 }
//             } catch (error) {
//                 alert('connect your Phantom wallet');
//                 console.log('wallet not yet authorized');
//             }
//         }

//         checkWallet();
//     }, []);

//     const connectWallet = async () => {
//         try {
//             if (window.solana) {
//                 const solana = window.solana;
//                 const res = await solana.connect();
//                 setWalletAddres(res.publicKey.toString());
//                 await retrieve();
//                 if (retrieveValue === null) {
//                     await createAccount();
//                 }
//             } else {
//                 alert('please install phantom wallet!')
//             }
//         } catch (error) {
//             alert('the user has rejected the request!')
//             console.log(error);
//         }
//     }

//     const getProvider = () => {
//         const connection = new Connection(network, opts.preflightCommitment);
//         const provider = new anchor.AnchorProvider(
//             connection,
//             window.solana,
//             opts.preflightCommitment,
//         )
//         console.log(provider, 'provider is set correctly');
//         return provider;
//     }

//     const retrieve = async () => {
//         try {
//             const provider = getProvider();
//             const program = new anchor.Program(idl, programID, provider);
//             const account = await program.account.init.fetch(myAccount.publicKey);
//             setRetrieveValue(account.value.toString());
//             console.log('retrieve value is:', retrieveValue);
//         } catch (error) {
//             console.log('Error in fetching:', error);
//             setRetrieveValue(null)
//         }
//     }

//     const createAccount = async () => {
//         try {
//             const provider = getProvider();
//             const program = new anchor.Program(idl, programID, provider);
//             let tx = await program.rpc.initialize({
//                 accounts: {
//                     initialAccount: myAccount.publicKey,
//                     user: provider.wallet.publicKey,
//                     systemProgram: SystemProgram.programId,
//                 },
//                 signers: [myAccount],
//             })
//             console.log('Created a new account w/ address:', myAccount.publicKey.toString(),
//             )
//         } catch (error) {
//             console.log('Error in creating account:', error)
//         }
//     }

//     const onInputChange = (event) => {
//         const { value } = event.target
//         setInputValue(value)
//     }

//     const UpdateValue = async () => {
//         try {
//             const provider = getProvider();
//             const program = new anchor.Program(idl, programID, provider);
//             const value = inputValue;

//             let tx2 = await program.rpc.updateValue(value, {
//                 accounts: {
//                     storageAccount: myAccount.publicKey,
//                 },
                
//             }) 
//             console.log('Message stored sucessfully! tx:', tx2)
//         } catch (error) {
//             console.log('error in tx2!:', error);
//         }
//     }

//     return (
//         <div className='App'>
//             <div>
//                 <h2 className="header" >Daoist&apos;s Note DApp</h2>

//                 {!walletAddress ? (
//                     <div>

//                         <button className='btn' onClick={connectWallet}>
//                             Connect Wallet
//                         </button>
//                         <WalletMultiButton />
//                     </div>
//                 ) : (
//                     <div>
//                         <p>
//                             Connected Account :{' '}
//                             <span className='address'>{walletAddress}</span>
//                         </p>
//                         <div className="grid-container">
//                             {/* set value column one */}
//                             <div className="grid-item">
//                                 <input
//                                     placeholder="Type here..."
//                                     value={inputValue}
//                                     onChange={onInputChange}
//                                 ></input>
//                                 <br></br>
//                                 <button className="btn2" onClick={UpdateValue} >
//                                     Save
//                                 </button>
//                             </div>
//                             {/* set value column two*/}
//                             <div className="grid-item">
//                                 <button className="btn2" onClick={retrieve} >
//                                     Retrieve
//                                 </button>
//                                 <p>{retrieveValue}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );

// }

// export default App;
