interface TrafficLightState {
  next(state: TrafficLightContext): void;
  getColor(): string;
}

class TrafficLightContext {
  private currentState: TrafficLightState;
  constructor() {
    this.currentState = new RedState();
  }

  setState(state: TrafficLightState) {
    this.currentState = state;
  }

  next() {
    this.currentState.next(this);
  }
}

class RedState implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new GreenState());
  }

  getColor(): string {
    return "RED";
  }
}

class GreenState implements TrafficLightState {
  next(context: TrafficLightContext): void {}

  getColor(): string {
    return "GREEN";
  }
}
