import styled from "styled-components"
import UserContext from "../contexts/UserContext"
import { useContext } from "react"

function TopBar() {

    const user = useContext(UserContext)

    return (
        <Bar>
            <p>Tracklt</p>
            <img src={user.image} alt="imagem de usuário" />
        </Bar>
    )
}

export default TopBar

const Bar = styled.div`
height: 70px;
width: 100%;
position: fixed;
top: 0;
left: 0;
z-index: 1;
background-color: #126BA5;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px;
p{
    color: #FFFFFF;
    font-family: "Playball";
    font-size: 40px;
    font-weight: 400;
}
img {
    background-color: #FFFFFF;
    border-radius: 100%;
    width: 50px;
    height: 50px;
}
`
