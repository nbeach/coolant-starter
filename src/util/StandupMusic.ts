import moment from "moment"

const runPeriodically = (action: () => void) => {
    setInterval(action, 1000)
}

export const playStandupSound = (soundPath: string, standupTime: string) => {
    let playing = false

    runPeriodically(() => {
        const standupMoment = moment(standupTime, "hh:mm")
        const isStandupTime = moment().isSame(standupMoment, "minute")

        if (isStandupTime && !playing) {
            playing = true
            new Audio(soundPath).play()
        } else if (!isStandupTime) {
            playing = false
        }
    })

}
