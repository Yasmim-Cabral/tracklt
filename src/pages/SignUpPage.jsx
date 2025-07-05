import BigLogo from "../components/BigLogo"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function SignUp() {
        event.preventDefault();

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const body = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        }

        setLoading(true);

        axios.post(URL, body).then(() => navigate("/")
        ).catch((err) => {
            switch (err.status) {
                case 422:
                    alert("Email inválido. Insira um email válido");
                    setLoading(false);
                    break;
                case 409:
                    alert("Já existe um usuário cadastrado com este email");
                    setLoading(false);
                    break;
            }
        })
    }


    return (
        <Page>
            <BigLogo />

            <Formulario onSubmit={SignUp}>
                <Campo
                    placeholder="email"
                    id="email"
                    required
                    type="email"
                    disabled={loading}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Campo
                    placeholder="senha"
                    id="senha"
                    required
                    type="password"
                    disabled={loading}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <Campo
                    placeholder="nome"
                    id="nome"
                    required
                    type="text"
                    disabled={loading}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <Campo
                    placeholder="foto"
                    id="foto"
                    required
                    type="url"
                    disabled={loading}
                    value={foto}
                    onChange={e => setFoto(e.target.value)}
                />
                <Cadastrar variant="contained" type="submit" disabled={loading} sx={{ textTransform: "none", fontFamily: "Lexend Deca", fontSize: "20px", fontWeight: 400, background: "#52B6FF" }}>{loading ? <ThreeDots height={13} width={51} color="#FFFFFF" /> : "Cadastrar"}</Cadastrar>
            </Formulario>

            <Logar to="/">Já tem uma conta? Faça login!</Logar>
        </Page>
    )
}

export default SignUpPage

const Formulario = styled.form`
width: 100%;
min-height: 150px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
gap: 6px;
font-family: "Lexend Deca";
`

const Campo = styled.input`
width: 80%;
height: 45px;
border: 1px solid #D4D4D4;
border-radius: 5px;
font-family: "Lexend Deca";
font-size: 20px;
font-weight: 400;
padding: 10px;
color: #666666;
&::placeholder {
    color: #DBDBDB;
}
&:focus {
    outline: none;
    border: 2px solid #52B6FF;
}
`

const Cadastrar = styled(Button)`
width: 80%;
height: 45px;
`

const Logar = styled(Link)`
margin-top: 25px;
color: #52B6FF;
font-family: "Lexend Deca";
font-weight: 400;
font-size: 14px;
`

const Page = styled.div`
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`