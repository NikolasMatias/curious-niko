import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: ${props => props.theme.typography.main.family};
    src: url("${props => props.theme.typography.main.url}");
  }

  @font-face {
    font-family: ${props => props.theme.typography.secondary.family};
    src: url("${props => props.theme.typography.secondary.url}");
  }
  
  body {
    font-family: ${props => props.theme.typography.main.family};
    font-weight: ${props => props.theme.typography.main.weights[1]};
    overflow-x: hidden;
  }
`