import styled from "styled-components"

function Habit({ name, days }) {

    const diasDaSemana = [
        { letra: 'D', id: '7' },
        { letra: 'S', id: '1' },
        { letra: 'T', id: '2' },
        { letra: 'Q', id: '3' },
        { letra: 'Q', id: '4' },
        { letra: 'S', id: '5' },
        { letra: 'S', id: '6' }
    ];

    return (
        <Item>
            <h1>{name}</h1>
            <DayButtonGroup >
                {diasDaSemana.map(dia => (
                    <DayButton key={dia.id} type="button" id={dia.id} $isSelected={days.includes(Number(dia.id))}>{dia.letra}</DayButton>
                ))}
            </DayButtonGroup >
        </Item>
    )
}

export default Habit

const Item = styled.div`
height: 90px;
width: 90%;
background-color: #FFFFFF;
border-radius: 5px;
margin-bottom: 10px;
h1{
    margin: 15px 15px 8px;
    font-family: "Lexend Deca";
    font-size: 20px;
    font-weight: 400;
    color: #666666;
}
`
const DayButtonGroup = styled.div`
 margin: 0 11px;
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