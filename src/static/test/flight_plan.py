
# guess what this flightplan will do :)
commands = [
            cmd.down(0.5),
            cmd.right(1),
            cmd.turn_left(45),
            cmd.forward(math.sqrt(2)),
            cmd.turn_right(45),
            cmd.right(1),
            cmd.turn_left(45),
            cmd.forward(math.sqrt(0.5)),
            cmd.turn_left(90),
            cmd.forward(math.sqrt(0.5)),
            cmd.turn_left(45),
            cmd.forward(1),
            cmd.turn_right(45),
            cmd.backward(math.sqrt(2)),
            cmd.turn_left(45),
            cmd.forward(1),
        ]