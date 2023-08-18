import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { NOTE_PROGRAM_PUBKEY } from '../constants'
import noteIDL from '../constants/notedapp.json'
import toast from 'react-hot-toast'
import { SystemProgram } from '@solana/web3.js'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { authorFilter } from '../utils'

export function useNote() {
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()

    const [initialized, setInitialized] = useState(false)
    const [lastNote, setLastNote] = useState(0)
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [transactionPending, setTransactionPending] = useState(false)
    const [input, setInput] = useState("")


    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(noteIDL, NOTE_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        // Fetch a userProfile IF there is a profile then get its NoteAccounts
        const findProfileAccounts = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true)
                    const [profilePda, profileBump] = await findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                    const profileAccount = await program.account.userProfile.fetch(profilePda)

                    if(profileAccount) {
                        console.log("ACCOUNT ALREADY INITALIZED!")
                        setLastNote(profileAccount.lastNote)
                        setInitialized(true)

                        const noteAccounts = await program.account.noteAccount.all([authorFilter(publicKey.toString())])
                        setTodos(noteAccounts)
                    } else {
                        console.log("NOT YET INITIALIZED")
                        setInitialized(false)
                    }
                } catch (error) {
                    console.log(error)
                    setInitialized(false)
                    setTodos([])
                } finally {
                    setLoading(false)
                }
            }
        }

        findProfileAccounts()

    }, [publicKey, program, transactionPending])

    const handleChange = (e)=> {
        setInput(e.target.value)
    }

    const initializeUser = async () => {
        // Check if the program exist & wallet is connected
        if(program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                // Initialize transaction -> to connect to the blockchain
                const tx = await program.methods
                .initializeUser()
                .accounts({
                    userProfile: profilePda,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

                // Succesfully initialize -> .initializeUser from program in blockchain
                setInitialized(true)
                toast.success('Succesfully Initialized')

            } catch(error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const addNote = async (e) => {
        e.preventDefault()
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                // Connect to profilePda in blockchain
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                // Connect to notePda in blockchain
                const [notePda, todoBump] = findProgramAddressSync([utf8.encode('NOTE_STATE'), publicKey.toBuffer(), Uint8Array.from([lastNote])], program.programId)

                // Takes input and set as content
                if (input) {
                    await program.methods
                    .addNote(input)
                    .accounts({
                        userProfile: profilePda,
                        noteAccount: notePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId
                    })
                    .rpc()
                    toast.success('Successfully added Note.')
                }
            } catch(error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
                setInput("")
            }
        }
    }

    const updateNote = async (notePda, noteIdx, content) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode(['USER_STATE']), publicKey.toBuffer()], program.programId)

                await program.methods
                .updateNote(noteIdx, content)
                .accounts({
                    userProfile: profilePda,
                    noteAccount: notePda,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()
                toast.success('Successfully updated!')
            } catch(error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

    const removeNote = async (notePda, noteIdx) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
    
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode(['USER_STATE']), publicKey.toBuffer()], program.programId)
    
                await program.methods
                .removeNote(noteIdx)
                .accounts({
                    userProfile: profilePda,
                    noteAccount: notePda,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()
                toast.success('Successfully removed!')
            } catch(error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
               
            }
        }
    }


    const incompleteTodos = useMemo(() => todos.filter((todo) => !todo.account.marked), [todos])
    const completedTodos = useMemo(() => todos.filter((todo) => todo.account.marked), [todos])

    return { initialized, anchorWallet, loading, transactionPending, completedTodos, incompleteTodos, input, setInput, handleChange, initializeUser, addNote, updateNote, removeNote }
}
