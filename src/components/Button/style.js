import styled from "styled-components";

export const StyledButton = styled.button`
  grid-area: ${props => props.gridArea};
  width: ${props => {
    switch (props.size) {
      case "small":
        return "200px";
      case "large":
        return "300px";
      case "big":
        return "400px";
      default:
        return "300px";
    }
  }};
  height: 35px;
  background: ${({ color }) => {
    if (color) {
      switch (color) {
        case "red":
          return "var(--gradientLeft2)";
        case "black":
          return "black";
        case "gray":
          return "gray";
        default:
          return "var(--gradientLeft1)";
      }
    }
  }};
  background-color: ${({ bcg }) => bcg};
  align-self: ${props => props.alignSelf};
  border-radius: 8px;
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    filter: brightness(1.15);
    transform: scale(1.02);
  }

  :active {
    filter: brightness(1.2);
    transform: scale(1.05);
  }
`;
