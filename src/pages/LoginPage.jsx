import BigLogo from "../components/BigLogo"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"
import UserContext from "../contexts/UserContext"

function LoginPage({ setUser }) {

    const user = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/hoje")
        }
    }, [])

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function Login() {
        event.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const body = {
            email: email,
            password: senha
        }

        setLoading(true);

        axios.post(URL, body).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(JSON.parse(localStorage.getItem("user")))
            navigate("/hoje");
        }).catch((err) => {
            switch (err.status) {
                case 422:
                    alert("Email não cadastrado");
                    setLoading(false)
                    break;
                case 401:
                    alert("Senha incorreta")
                    setLoading(false)
                    break;
            }
        })
    }


    return (
        <Page>
            <BigLogo />

            <Formulario onSubmit={Login}>
                <Campo
                    placeholder="email"
                    type="email"
                    id="email"
                    disabled={loading}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Campo
                    placeholder="senha"
                    type="password"
                    id="senha"
                    disabled={loading}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <Entrar variant="contained" type="submit" disabled={loading} sx={{ textTransform: "none", fontFamily: "Lexend Deca", fontSize: "20px", fontWeight: 400, background: "#52B6FF" }}>{loading ? <ThreeDots height={13} width={51} color="#FFFFFF" /> : "Entrar"}</Entrar>
            </Formulario>

            <Cadastrar to="/cadastro">Não tem uma conta? Cadastre-se!</Cadastrar>
        </Page>
    )
}

export default LoginPage

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

const Entrar = styled(Button)`
width: 80%;
height: 45px;
`

const Cadastrar = styled(Link)`
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