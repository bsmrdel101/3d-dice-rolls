declare module '@3d-dice/dice-box' {
  interface DiceBoxConfig {
    assetPath: string;
    scale?: number;
    throwForce?: number;
    spinForce?: number;
    gravity?: number;
    mass?: number;
    friction?: number;
    restitution?: number;
    themeColor?: string;
  }

  export default class DiceBox {
    constructor(selector: string, options: DiceBoxConfig);
    init(): Promise<void>;
    roll(dice: string[]): Promise<void>;
    rollGroupData: any;
    rollDiceData: any;
    onDiceRolled: any
  }
}

declare module '@3d-dice/dice-box/dice-parser-interface' {
  export default class DiceParser {
    parseNotation(notation: string): string[];
  }
}
