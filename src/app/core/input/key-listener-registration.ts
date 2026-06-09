export interface KeyListenerRegistration {
  type: 'keydown' | 'keyup';
  listener: (event: KeyboardEvent) => void;
}
