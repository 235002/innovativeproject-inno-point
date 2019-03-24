import styled, { keyframes } from "styled-components";
import Color from "color";

const show = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0.4;
  }
`;

export const Container = styled.div`
  height: 120px;
  display: grid;
  grid-template: "panel table" / 120px auto;
  width: calc(100% - var(--projectMargin));
  border-radius: 8px;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  transition: all 0.1s ease-in-out;
  margin-top: var(--blockMargin);
  animation: ${show} 0.3s;
  background-color: white;

  div.Main {
    display: grid;
    background-color: white;
    grid-template: "title" 40px "table";
    grid-gap: 20px;
    padding: 20px;

    div.Title {
      letter-spacing: 1px;
      border-bottom: solid 1px hsl(0, 0%, 90%);
      font-size: 25px;
    }
  }

  > div.Panel {
    width: 150px;
    height: 100%;
    background: var(--gradientLeft1);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-align: center;
    font-size: 24px;
    color: white;
  }

  > div.MembersContainer {
    height: 100%;
    display: flex;
    justify-content: space-around;

    > div.Member {
      align-items: center;
      display: grid;
      grid-template: "icon" 80px "name" 20px;

      > div.Data {
        text-align: center;
      }
    }
  }
`;

export const Panel = styled.div`
  background: ${({ theme_color }) =>
    theme_color
      ? `linear-gradient(to left, ${theme_color}, ${Color(theme_color).darken(
          0.2
        )})`
      : "var(--gradientLeft1)"};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const tableStyle = {
  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1) !important",
  fontSize: "18px"
};

export const iconStyle = {
  width: "40px",
  height: "40px",
  fontWeight: "100",
  justifySelf: "center"
};