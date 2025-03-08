import numpy as np
from utils.convert_angle_to_frequency import convert_angle_to_frequency

class SignalGenerator:

    def __init__(self, **kwargs):
        self._params = kwargs

    def signal_generator_composer(self):
        if "num_sensors" not in self._params.keys():
            raise ValueError("Number of sensors is undefined.")
        if "num_snapshots" not in self._params.keys():
            raise ValueError("Number of snapshots is undefined.")
        if "angles" not in self._params.keys():
            raise ValueError("Steering angles are undefined.")
        if "frequencies" not in self._params.keys():
            self._params["frequencies"] = convert_angle_to_frequency(
                angles = self._params["angles"]
            )
        if "wavelength" not in self._params.keys():
            raise ValueError("Wavelength is undefined.")
        if "light_speed" not in self._params.keys():
            raise ValueError("Light speed is undefined.")

        signals = np.zeros((self._params["num_sensors"], self._params["num_snapshots"]))
        self._params["signal_freq"] = self._params["frequencies"]
        for i in range(self._params["num_sensors"]):
            signals[i] = np.sin(2 * np.pi * self._params["signal_freq"][i] * np.arange(self._params["num_snapshots"]))

        return signals

    def __str__(self):
        if "num_sensors" not in self._params.keys():
            raise ValueError("Number of sensors is undefined.")
        if "num_snapshots" not in self._params.keys():
            raise ValueError("Number of snapshots is undefined.")
        if "angles" not in self._params.keys():
            raise ValueError("Steering angles are undefined.")

        return f"SignalGenerator(num_sensors={self._params['num_sensors']}, num_snapshots={self._params['num_snapshots']}, signal_freq={self._params['angles']})"
