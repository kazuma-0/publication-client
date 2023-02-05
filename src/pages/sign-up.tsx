import React, {useReducer, useState} from "react";
import {
    Box, Button,
    Container,
    FormControl, FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon, InputRightElement,
    Stack, Tag, useToast
} from "@chakra-ui/react";
import Head from "next/head";
import {FaEnvelope, FaUser} from "react-icons/fa";
import {MdVerifiedUser} from "react-icons/md";
import {act} from "react-dom/test-utils";
import {SiGooglescholar, SiScopus} from "react-icons/si";
import {AiFillIdcard, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {CgPassword} from "react-icons/cg";
import {useMutation} from "@tanstack/react-query";
import {client} from "@/lib";
import {useRouter} from "next/router";
const create_user_form = {
    name: '',
    staff_id: '',
    password: '',
    email: '',
    scopus_id:'',
    google_scholar_id: '',
    clarivate_id: '',
    department: 'Computer Science and Engineering'
}

export default function SignUp() {
    const [show, setShow] = useState<boolean>(false);
    const [state, dispatch] = useReducer((state: any, action: any) => {
        return {...state, [action.type]: action.payload}
    }, create_user_form);

    const router = useRouter()

    const toast = useToast({
        variant: 'top-accent',
        position: 'bottom-right'
    })

    const createUserMutation = useMutation(async ()=>{
        await client.post('/user', {
            ...state
        })
    },{
        onSuccess(){
            toast({
                title: 'Sign up successful',
                description: 'redirecting to dashboard',
                status: 'success'
            })
            setTimeout(()=>router.push('/'), 2e3)
        },
        onError(){
            toast({
                title: 'Failed to sign up',
                status: 'error'
            })
        }
    })
    return <>
        <Head>
            <title>Sign up for a new account</title>
        </Head>
        <Box  h={'100vh'} w={'100vw'} pt={20}>
            <Container maxW={'container.xl'}>
                <Heading>
                    Create a new Account.
                </Heading>
                <Box pt={5}>
                    <form onSubmit={(e)=>{
                    e.preventDefault()
                    createUserMutation.mutate()
                    }
                    }>
                        <Container mx={'unset'}>
                            <Stack>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <FaUser/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'name',
                                                payload: e.target.value
                                            })
                                        }
                                        } type={'text'}></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <FaEnvelope/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'email',
                                                payload: e.target.value
                                            })
                                        }} type={'email'}></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Staff ID
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <MdVerifiedUser/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'staff_id',
                                                payload: e.target.value
                                            })
                                        }} type={'text'}></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                       Department
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <MdVerifiedUser/>
                                        </InputLeftAddon>
                                        <Input  value={'Computer Science and Engineering'} onChange={(e)=>{

                                        }} type={'text'}></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Scopus Id
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <SiScopus/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'scopus_id',
                                                payload: e.target.value
                                            })
                                        }}></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Google Scholar Id
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <SiGooglescholar/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'google_scholar_id',
                                                payload: e.target.value
                                            })
                                        }} ></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Clarivate Id
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <AiFillIdcard/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'clarivate_id',
                                                payload: e.target.value
                                            })
                                        }} ></Input>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>
                                            <CgPassword/>
                                        </InputLeftAddon>
                                        <Input onChange={(e)=>{
                                            dispatch({
                                                type: 'password',
                                                payload: e.target.value
                                            })
                                        }} type={show ? 'text' : 'password'} ></Input>
                                        <InputRightElement w={'5rem'}>
                                            <Tag onClick={()=>setShow((prev) => !prev)} colorScheme={'blackAlpha'}>
                                                {show ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
                                            </Tag>
                                        </InputRightElement>
                                    </InputGroup>

                                </FormControl>
                            <Button colorScheme={'whatsapp'} type={'submit'} mt={"10"}>Sign up</Button>
                            </Stack>
                        </Container>
                    </form>
                </Box>
            </Container>
        </Box>
    </>
}