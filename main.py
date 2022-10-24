def on_gesture_shake():
    global steps
    steps += 1
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

elapsed = 0
end = 0
start = 0
logging = False
ms_s = 0
steps = 0
serial.write_string("\"acc ON\"")
basic.clear_screen()
input.set_accelerometer_range(AcceleratorRange.FOUR_G)
radio.set_group(1)
radio.set_frequency_band(7)
radio.set_transmit_power(7)

def on_forever():
    global ms_s, logging, start, steps, end, elapsed
    ms_s = input.acceleration(Dimension.STRENGTH)
    if input.is_gesture(Gesture.SHAKE) and input.button_is_pressed(Button.A):
        logging = True
        start = input.running_time()
        steps = 0
        basic.show_icon(IconNames.YES)
        while ms_s > 1050 and logging:
            if ms_s <= 1023 or input.button_is_pressed(Button.B):
                basic.show_icon(IconNames.NO)
                logging = False
                end = input.running_time()
                elapsed = end - start
                break
basic.forever(on_forever)
