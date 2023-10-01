import styled from "styled-components";



export function Btnoperaciones({titulo, icono, funcion }) {
    return (
        <Btn onClick={funcion}>
            <span>{icono}</span>
            <span>{titulo}</span>
        </Btn>
    );
}

const Btn = styled.button`
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 600;
    font-size: 17px;
    padding: 0.8em 1.3em 0.8em 0.9em;
    color: black;
    background-color: #fbfefc;
    border: none;
    letter-spacing: 0.05em;
    border-radius: 16px;
    svg {
        margin-right: 3px;
        transform: rotate(30deg);
        transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    span {
        transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    &:hover {
        color: #262524;
        svg {
        transform: translateX(5px) rotate(90deg);
        }
        span {
        transform: translateX(7px);
        }
    }
`;