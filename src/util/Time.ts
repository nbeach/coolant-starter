import moment, {Moment} from "moment/moment"

export const timeElapsed = (startTime: Moment): string => {
    const timeDifference = moment().diff(startTime)
    const elapsedMinutes =  moment.duration(timeDifference).asMinutes()

    const days = Math.floor(elapsedMinutes / (60 * 24))
    const daysRemainder = elapsedMinutes % (60 * 24)
    const hours = Math.floor(daysRemainder / 60)
    const hoursRemainder = daysRemainder % 60
    const minutes = Math.floor(hoursRemainder)

    const formattedDays = days > 0 ? `${days}d ` : ""
    const formattedHours = hours > 0 ? `${hours}h ` : ""
    const formattedMinutes = minutes > 0 ? `${minutes}m` : ""

    return formattedDays + formattedHours + formattedMinutes
}
