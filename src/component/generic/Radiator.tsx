import {styled} from "./styled"
import {Style} from "../../util/Style"

export const Radiator = styled("div", () => ({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Style.color.background,
    color: Style.color.font,
    fontFamily: "sans-serif",
}))

export const Muted = styled("span", () => ({
    color: Style.color.muted,
}))
