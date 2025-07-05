import { useState, useContext } from "react"
import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function CreateHabit({ setCreating, loading, setLoading, trigger, setTrigger, setHabitsLoad }) {

    const [nomeHabito, setNomeHabito] = useState("");
    const [dias, setDias] = useState([])

    const diasDaSemana = [
        { letra: 'D', id: '7' },
        { letra: 'S', id: '1' },
        { letra: 'T', id: '2' },
        { letra: 'Q', id: '3' },
        { letra: 'Q', id: '4' },
        { letra: 'S', id: '5' },
        { letra: 'S', id: '6' }
    ];

    const user = useContext(UserContext);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const body = {
        name: nomeHabito,
        days: dias
    };
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };

    function selecionar(dia) {
        event.preventDefault();
        const diaClicado = Number(dia.target.id);
        if (dias.includes(diaClicado)) {
            setDias(dias.filter(d => d !== diaClicado))
        } else {
            setDias([...dias, diaClicado])
        }
    }

    function salvar() {
        event.preventDefault();
        if (dias.length > 0) {
            setLoading(true)
            axios.post(URL, body, config).then((response) => {
                setHabitsLoad(false);
                setTrigger(trigger + 1);
                setCreating(false);
                setLoading(false);
            }).catch(() => {
                alert("Ocorreu um erro de conexão, tente novamente");
                setLoading(false)
            })
        } else {
            alert("Selecione ao menos um dia")
        }
    }

    return (
        <HabitWindow onSubmit={salvar}>
            <input
                id="habit"
                type="text"
                placeholder="nome do hábito"
                required
                disabled={loading}
                value={nomeHabito}
                onChange={e => setNomeHabito(e.target.value)}
            />
            <DayButtonGroup >
                {diasDaSemana.map(dia => (
                    <DayButton key={dia.id} type="button" onClick={selecionar} disabled={loading} id={dia.id} $isSelected={dias.includes(Number(dia.id))}>{dia.letra}</DayButton>
                ))}
            </DayButtonGroup >

            <Cancelar type="button" onClick={() => setCreating(false)}> Cancelar</Cancelar>
            <Salvar type="submit">{loading ? <ThreeDots height={13} width={51} color="#FFFFFF" /> : "Salvar"}</Salvar>
        </HabitWindow>
    )
}

export default CreateHabit

const HabitWindow = styled.form`
position: relative;
height: 180px;
width: 90%;
margin-bottom: 10px;
background-color: #FFFFFF;
border-radius: 5px;
input{
width: 90%;
margin: 5% 5% 0 5%;
height: 45px;
border-radius: 5px;
border: 1px solid #D4D4D4;
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
}`

const DayButtonGroup = styled.div`
  margin: 8px 0 40px 5% ; 
`

const DayButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 0 2px;
  font-family: "Lexend Deca";
  font-size: 20px;
  font-weight: 400;
  transition: all 0.2s ease-in-out; // Transição suave para estados

  // Estilos baseados na prop 'isSelected'
  border: ${props => props.$isSelected ? '1px solid #CFCFCF' : '1px solid #D4D4D4'};
  background-color: ${props => props.$isSelected ? '#CFCFCF' : '#FFFFFF'};
  color: ${props => props.$isSelected ? '#FFFFFF' : '#DBDBDB'};

  // Remover outline de foco padrão do navegador e sombras
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const Cancelar = styled.button`
    position: absolute;
    bottom: 15px;
    right: 123px;
    width: 85px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    font-family: "Lexend Deca";
    color: #52B6FF;
    border: none;
    background-color: #FFFFFF;
    border-radius: 5px;
`
const Salvar = styled.button`
    position: absolute;
    bottom: 15px;
    right: 17px;
    width: 85px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    font-family: "Lexend Deca";
    color: #FFFFFF;
    border: none;
    background-color: #52B6FF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`