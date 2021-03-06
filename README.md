## autonavx_web - interactive exercises for AUTONAVx course

This repository contains the code for the interactive exercises used in the [AUTONAVx](https://www.edx.org/course/tumx/tumx-autonavx-autonomous-navigation-1658) course on edX.

### Build

Make sure you have npm (included in [nodejs](http://nodejs.org/)) and [bower](http://bower.io/) installed. 

Run the following commands in the autonavx_web folder:

```shell
npm install
npm install -g bower
bower install
npm install -g grunt-cli 
grunt shell:make_skulpt
grunt
```

Open http://localhost:8000/ to view a list of all exercise files.

Press play to start simulation and execute plan commands defined in the example python script.


![alt text](https://github.com/ModuFly/autonavx_web/raw/dev/gifs/autonavx.gif "Example")
![alt text](https://github.com/ModuFly/autonavx_web/raw/dev/gifs/autonavx_blockly.gif "Example 2")


## Example

```python
import math
import plot
import time
from simulator.controller import MissionPlanner, PositionController

# TUM autonavx simulator demo code
#
# you can tilt the quadrotor with the w, a, s and d keys
# the z speed (altitude) can be adjusted with arrow up/down.


# set this to True to enable the mission planner
use_planned_mission = True


class InternalCode:
    def __init__(self, simulator):
        print("initializing simulation at %s" % time.time())

        self.simulator = simulator

        if use_planned_mission:
            mission = MissionPlanner()
            self.mission_setup(mission)
            self.controller = PositionController(self.simulator.drone, mission.commands, True)

    def mission_setup(self, planner):
        import quadrotor.command as cmd

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

        planner.add_commands(commands)

    def measurement_callback(self, t, dt, navdata):
        """
        called for each measurement done by the drone
        """

        if use_planned_mission:
            # apply the computed control to as simulation input
            lin_vel, yaw_vel = self.controller.compute_input()
            self.simulator.set_input_world(lin_vel, yaw_vel)

        # plot navdata in 2d graph:

        # callback time step:
        plot.plot("d_time",  dt)

        # onboard speed:
        plot.plot("v_x",  navdata.vx)
        plot.plot("v_y",  navdata.vy)
        plot.plot("v_z",  navdata.vz)

        # rotation measurement:
        #plot.plot("roll",  navdata.rotX)
        #plot.plot("pitch", navdata.rotY)
        #plot.plot("jaw",   navdata.rotZ)

        #print("navdata supplies: %s" % str(dir(navdata)))


def run():
    """
    test function for the python interpreter
    """

    import numpy

    print("available numpy members:")
    print(dir(numpy))


    print("thanks for helping us help you help us all!")


```
