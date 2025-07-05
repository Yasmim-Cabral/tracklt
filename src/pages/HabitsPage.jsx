import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"
import styled from "styled-components"
import CreateHabit from "../components/CreateHabit"
import Habit from "../components/Habit"
import { useState, useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"

function HabitsPage() {

    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [habits, setHabits] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [habitsLoad, setHabitsLoad] = useState(false);

    const user = useContext(UserContext)
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };

    useEffect(() => {
        axios.get(URL, config).then(response => {
            setHabitsLoad(true)
            setHabits(response.data)
        })
    }, [trigger])

    return (
        <>
            <TopBar />
            <Page>
                <AddHabito>
                    <h1>Meus hábitos</h1>
                    <button onClick={() => setCreating(true)}>+</button>
                </AddHabito>
                {creating ? <CreateHabit setCreating={setCreating} loading={loading} setLoading={setLoading} trigger={trigger} setTrigger={setTrigger} setHabitsLoad={setHabitsLoad} /> : ""}
                {habitsLoad ? (habits.length > 0 ? "" : <NenhumHabito>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NenhumHabito>) : <ThreeDots height={25} width={100} color="#126BA5" />}
                {habits.map(habit => <Habit key={habit.id} name={habit.name} days={habit.days} />)}
            </Page>
            <BottomBar hoje={false} loading={loading} />
        </>
    )
}

export default HabitsPage

const Page = styled.div`
margin: 70px 0 65px 0;
min-height: calc(100vh - 135px);
background-color: #F2F2F2;
display: flex;
flex-direction: column;
align-items: center;
`

const AddHabito = styled.div`
width: 90%;
display: flex;
justify-content: space-between;
align-items: center;
font-family: "Lexend Deca";
margin-bottom: 22px;
h1{
    margin-top: 22px;
    color: #126BA5;
    font-size: 23px;
}
button{
    margin-top: 22px;
    width: 40px;
    height: 35px;
    font-size: 27px;
    color: #FFFFFF;
    border: none;
    background-color: #52B6FF;
    border-radius: 5px;
}
`

const NenhumHabito = styled.p`
width: 90%;
font-family: "Lexend Deca";
font-weight: 400;
font-size: 18px;
color: #666666;
margin-top: 25px;
`