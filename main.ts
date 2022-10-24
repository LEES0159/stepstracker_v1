input.onGesture(Gesture.Shake, function () {
    steps += 1
})
let elapsed = 0
let end_ts = 0
let end = 0
let start = 0
let start_ts = 0
let ms_s = 0
let steps = 0
serial.writeString("\"acc ON\"")
basic.clearScreen()
input.setAccelerometerRange(AcceleratorRange.FourG)
radio.setGroup(1)
radio.setFrequencyBand(7)
radio.setTransmitPower(7)
basic.forever(function () {
    ms_s = input.acceleration(Dimension.Strength)
    if (input.isGesture(Gesture.Shake) || input.buttonIsPressed(Button.A)) {
        basic.showIcon(IconNames.Yes)
        radio.sendString("steps START")
        start_ts = control.eventTimestamp()
        start = input.runningTime()
        steps = 0
        while (true) {
            radio.sendValue("steps", steps)
            basic.pause(5000)
            if (input.buttonIsPressed(Button.B)) {
                basic.showIcon(IconNames.No)
                basic.showNumber(steps)
                basic.clearScreen()
                radio.sendString("steps END")
                end = input.runningTime()
                end_ts = control.eventTimestamp()
                elapsed = end - start
                radio.sendValue("steps", steps)
                radio.sendValue("start", start_ts)
                radio.sendValue("elap", elapsed)
                radio.sendValue("end", end_ts)
                break;
            }
        }
    }
})
