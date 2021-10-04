import React, {ReactElement} from "react";
import TitleDefault, {SubTitle, TitleManagement} from "./styled";
import {VARIANT} from "../../themes/DefaultTheme";

interface ITitle {
    subtitle?: ReactElement|string,
    variant?: VARIANT,
    grid?: boolean
}

const Title: React.FC<ITitle> = ({children, subtitle, grid, variant}) => {
    return (
        <TitleManagement grid={grid} variant={variant}>
            <TitleDefault>{children}</TitleDefault>
            {subtitle && <SubTitle >{subtitle}</SubTitle>}
        </TitleManagement>
    );
}

export default Title;