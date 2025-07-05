import { Check } from "@mui/icons-material"
import styled from "styled-components"
import axios from "axios";

function TodayHabit({ id, name, done, currentSequence, highestSequence, config, trigger, setTrigger }) {

    const checkURL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
    const uncheckURL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
    const body = {};

    function Selecionar() {
        if (done) {
            axios.post(uncheckURL, body, config).then(() => {
                setTrigger(trigger + 1);
            })
        } else {
            axios.post(checkURL, body, config).then(() => {
                setTrigger(trigger - 1);
            })
        }
    }

    return (
        <Item>
            <div>
                <h2>{name}</h2>
                <p>Sequência atual: {currentSequence} dias</p>
                <p>Seu recorde: {highestSequence} dias</p>
            </div>
            <Botao onClick={Selecionar} $isSelected={done}><Check sx={{ fontSize: 50, color: "#FFFFFF" }} /></Botao>
        </Item>
    )
}

export default TodayHabit

const Item = styled.div`
width: 90%;
min-height: 94px;
margin-bottom: 10px;
background-color: #FFFFFF;
border: 1px solid #E7E7E7;
border-radius: 5px;
display: flex;
position: relative;
div{
    width: calc(100% - 75px);
}
h2{
    margin: 15px;
    font-family: "Lexend Deca";
    font-size: 20px;
    font-weight: 400;
    color: #666666;
}
p{
    margin-left: 15px;
    margin-bottom: 3px;
    font-family: "Lexend Deca";
    font-size: 13px;
    font-weight: 400;
    color: #666666;
}
`

const Botao = styled.button`
height: 70px;
width: 70px;
border-radius: 5px;
border: ${props => props.$isSelected ? 'none' : '1px solid #E7E7E7'};
background-color: ${props => props.$isSelected ? '#8FC549' : '#EBEBEB'};
position: absolute;
right: 13px;
top: 13px
`