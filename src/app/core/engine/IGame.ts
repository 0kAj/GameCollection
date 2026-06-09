export interface IGame {

  start(): void;

  update(delta: number): void;

  render(): void;

  destroy?(): void;
}
