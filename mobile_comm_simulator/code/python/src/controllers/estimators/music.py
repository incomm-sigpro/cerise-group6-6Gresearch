from scipy.linalg import svd
from src.app.models.entities.music import SignalModel


class MusicController:
    def __init__(
        self, num_antennas, num_snapshots, num_signals, wavelength, spacing, angles
    ):
        self.num_antennas = num_antennas
        self.num_snapshots = num_snapshots
        self.num_signals = num_signals
        self.wavelength = wavelength
        self.spacing = spacing
        self.angles = angles
        self.model = SignalModel(
            num_antennas, num_snapshots, num_signals, wavelength, spacing, angles
        )

    def run(self):
        # Gerar sinais
        X, _ = self.model.generate_signals()

        # Calcular a matriz de covariância
        R = X @ X.conj().T / self.num_snapshots

        # Decomposição em valores singulares (SVD)
        U, S, Vh = svd(R)

        # Separar subespaço de sinal e ruído
        Un = U[:, self.num_signals :]

        # Calcular o espectro MUSIC
        angles_scan = np.linspace(-90, 90, 360)
        spectrum = np.zeros(len(angles_scan))
        for i, angle in enumerate(angles_scan):
            a = np.exp(
                -1j
                * 2
                * np.pi
                * self.spacing
                * np.arange(self.num_antennas)
                * np.sin(np.deg2rad(angle))
                / self.wavelength
            )
            spectrum[i] = 1 / np.linalg.norm(Un.conj().T @ a) ** 2

        return angles_scan, spectrum
