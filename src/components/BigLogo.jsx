import bigLogo from "../assets/bigLogo.png"
import styled from "styled-components"

function BigLogo() {
    return (
        <Logo src={bigLogo} />
    )
}

export default BigLogo

const Logo = styled.img`
margin: 70px 0 30px 0;
`