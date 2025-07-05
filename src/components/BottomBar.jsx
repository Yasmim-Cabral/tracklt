import styled from "styled-components"
import { Button } from "@mui/material"
import { CalendarMonth, EventAvailable } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

function BottomBar({ hoje, loading }) {

    const navigate = useNavigate();

    function Hoje() { loading ? "" : (!hoje ? navigate("/hoje") : "") }
    function Habitos() { loading ? "" : (hoje ? navigate("/habitos") : "") }


    return (
        <Bar>
            <Botao onClick={Habitos} sx={{ textTransform: "none", fontFamily: "Lexend Deca", fontSize: "20px", fontWeight: 400, color: hoje ? "#D4D4D4" : "#FFFFFF", borderRadius: 0, background: hoje ? "#FFFFFF" : "#52B6FF" }}><CalendarMonth />Habitos</Botao>
            <Botao onClick={Hoje} sx={{ textTransform: "none", fontFamily: "Lexend Deca", fontSize: "20px", fontWeight: 400, color: hoje ? "#FFFFFF" : "#D4D4D4", borderRadius: 0, background: hoje ? "#52B6FF" : "#FFFFFF" }}><EventAvailable />Hoje</Botao>
        </Bar>
    )
}

export default BottomBar

const Bar = styled.div`
height: 65px;
width: 100%;
position: fixed;
bottom: 0;
left: 0;
`

const Botao = styled(Button)`
width: 50%;
height: 65px;
`