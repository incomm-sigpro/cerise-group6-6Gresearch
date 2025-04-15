from models.interfaces.signal_repository import SignalRepositoryInterface
from controllers.interfaces.signal.create_signal import CreateSignalInterface


class CreateSignal(CreateSignalInterface):
    def __init__(self, signal_repository: SignalRepositoryInterface) -> None:
        self.signal_repository = signal_repository

    def create(self, _, __):
        return self.signal_repository.create_signal()
