import {styled} from "./styled"
import {Style} from "../../util/Style"

export const Radiator = styled("div", () => ({
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
