import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"
import styled from "styled-components"
import TodayHabit from "../components/TodayHabit"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import { useState, useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"

function TodayPage() {

    dayjs.locale('pt-br');
    const dataAtual = dayjs();
    const diaDaSemanaCompleto = dataAtual.format('dddd');
    const dataNumerica = dataAtual.format('DD/MM');
    const nomeDiaCurto = diaDaSemanaCompleto.includes('-feira') ? diaDaSemanaCompleto.replace('-feira', '') : diaDaSemanaCompleto;
    const nomeDia = primeiraMaiuscula(nomeDiaCurto);

    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);
    const user = useContext(UserContext);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };

    const [todayHabits, setTodayHabits] = useState([]);

    useEffect(() => {
        axios.get(URL, config).then((response) => {
            setTodayHabits(response.data)
            setLoading(false)
        })
    }, [trigger])


    function primeiraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <TopBar />
            <Page>
                <h1>{nomeDia}, {dataNumerica}</h1>
                {loading ? <ThreeDots height={25} width={100} color="#126BA5" /> : todayHabits.map(habit => <TodayHabit key={habit.id} id={habit.id} name={habit.name} done={habit.done} currentSequence={habit.currentSequence} highestSequence={habit.highestSequence} config={config} trigger={trigger} setTrigger={setTrigger} />)}
            </Page>
            <BottomBar hoje={true} loading={loading} />
        </>
    )
}

export default TodayPage

const Page = styled.div`
margin: 70px 0 65px 0;
min-height: calc(100vh - 135px);
background-color: #F2F2F2;
display: flex;
flex-direction: column;
align-items: center;
h1{
    width: 90%;
    margin: 28px 0 13px 0;
    font-family: "Lexend Deca";
    font-size: 23px;
    font-weight: 400;
    color: #126BA5;
}
`