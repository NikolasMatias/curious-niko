import styled from "styled-components";
import {IProps, VARIANT} from "../../themes/DefaultTheme";

interface ITitleManagement {
    grid?: boolean
}

export const TitleManagement = styled.div<IProps & ITitleManagement>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  & .invisible {
    display: none;
  }
  
  & .primary {
    color: ${props => props.theme.palette.neutral.grayishBlue};
  }
  
  & .secondary {
    color: ${props => props.theme.palette.neutral.white};
  }

  @media (min-width: 992px) {
    & {
      
    }
    
    ${props => {
        //grid-column: 1 / -1;
      if (props.grid)
        return `
        grid-area: sectionTitle;
        align-items: center;
        margin-bottom: 20vh;
        font-size: 1.5rem;
        `
      
      switch (props.variant) {
        case VARIANT.PRIMARY:
          return `
                align-items: flex-start;
            `
        case VARIANT.SECONDARY:
          return `
                font-size: 1.5rem;
                align-items: flex-start;
            `
        case VARIANT.THIRD:
            return `
                align-items: flex-start;
            `
        default: 
            return `align-items: center;`
    }
    }
  };
`

const TitleDefault = styled.h1<IProps>`
    width: 80vw;
    margin-bottom: 10px;
  
  @media (min-width: 992px) {
    width: auto;
  }
`

export const SubTitle = styled.p<IProps>`
  margin-top: 10px;
  width: 80vw;

  @media (min-width: 992px) {
    width: auto;
  }
`

export default TitleDefault