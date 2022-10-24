input.onGesture(Gesture.Shake, function () {
    steps += 1
})
let elapsed = 0
let end = 0
let start = 0
let logging = false
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
    if (input.isGesture(Gesture.Shake) && input.buttonIsPressed(Button.A)) {
        let ms_y = 0
        let ms_z = 0
        logging = true
        start = input.runningTime()
        steps = 0
        basic.showIcon(IconNames.Yes)
        while (ms_s > 1050 && logging) {
            if (ms_s <= 1023 || input.buttonIsPressed(Button.B)) {
                basic.showIcon(IconNames.No)
                logging = false
                end = input.runningTime()
                elapsed = end - start
                break;
            }
        }
        serial.writeValue("time", elapsed)
        serial.writeValue("steps", steps)
        radio.sendValue("ms_z", ms_z)
        radio.sendValue("ms_y", ms_y)
    }
})
