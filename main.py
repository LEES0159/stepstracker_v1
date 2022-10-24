def on_gesture_shake():
    global steps
    steps += 1
    basic.show_number(steps)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

elapsed = 0
end_ts = 0
end = 0
start = 0
start_ts = 0
ms_s = 0
steps = 0
serial.write_string("\"acc ON\"")
basic.clear_screen()
input.set_accelerometer_range(AcceleratorRange.FOUR_G)
radio.set_group(1)
radio.set_frequency_band(7)
radio.set_transmit_power(7)

def on_forever():
    global ms_s, start_ts, start, steps, end, end_ts, elapsed
    ms_s = input.acceleration(Dimension.STRENGTH)
    if input.is_gesture(Gesture.SHAKE) and input.button_is_pressed(Button.A):
        basic.show_icon(IconNames.YES)
        radio.send_string("steps START")
        start_ts = control.event_timestamp()
        start = input.running_time()
        steps = 0
        while True:
            radio.send_value("steps", steps)
            basic.pause(5000)
            if input.button_is_pressed(Button.B):
                basic.show_icon(IconNames.NO)
                basic.clear_screen()
                radio.send_string("steps END")
                end = input.running_time()
                end_ts = control.event_timestamp()
                elapsed = end - start
                radio.send_value("steps", steps)
                radio.send_value("start", start_ts)
                radio.send_value("end", end_ts)
                break
basic.forever(on_forever)
