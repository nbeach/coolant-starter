export const playSound = (soundPath: string) => {
    new Audio(soundPath).play()
}
