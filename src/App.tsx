import DiceBox from '@3d-dice/dice-box';
import DiceParser from '@3d-dice/dice-box/dice-parser-interface';
import { useEffect } from 'react';
import './App.css';


export default function App() {
  let diceBox: DiceBox;
  let diceParser: DiceParser;

  useEffect(() => {
    initDiceBox();
  }, []);

  const initDiceBox = async () => {
    if (document.querySelector("#dice-box canvas")) return;
    const newDiceBox = new DiceBox("#dice-box", {
      assetPath: '/assets/',
      scale: 4.5,
      throwForce: 10,
      spinForce: 8,
      gravity: 4,
      themeColor: '#421B71',
    });
    await newDiceBox.init();
    const newDiceParser = new DiceParser();
    diceBox = newDiceBox;
    diceParser = newDiceParser;
  };

  const rollDice = async (amount: number, type: number, mod: number, advDis?: 'adv' | 'dis') => {
    const input = diceParser.parseNotation(`${amount}d${type}kh1`);

    if (advDis === 'adv') {
      let prevValue = -Infinity;
      let result = null;
      for (let i = 0; i < 1; i++) {
        await diceBox.roll(input);
        const group = diceBox.rollGroupData[0];
        const rolls: any = Object.values(group.rolls);
        const value = rolls.reduce((acc: number, roll: any) => acc + roll.value, 0);
        if (value > prevValue) {
          prevValue = value;
          result = {
            type: group.sides,
            amount: group.qty,
            mod: mod,
            value: value,
            rolls: rolls,
            total: value + mod,
          };
        }
      }
      return result;
    } else if (advDis === 'dis') {
      let prevValue = Infinity;
      let result = null;
      for (let i = 0; i < 1; i++) {
        await diceBox.roll(input);
        const group = diceBox.rollGroupData[0];
        const rolls: any = Object.values(group.rolls);
        const value = rolls.reduce((acc: number, roll: any) => acc + roll.value, 0);
        if (value < prevValue) {
          prevValue = value;
          result = {
            type: group.sides,
            amount: group.qty,
            mod: mod,
            value: value,
            rolls: rolls,
            total: value + mod,
          };
        }
      }
      return result;
    } else {
      await diceBox.roll(input);
      const group = diceBox.rollGroupData[0];
      const rolls: any = Object.values(group.rolls);
      const value = rolls.reduce((acc: number, roll: any) => acc + roll.value, 0);
      return {
        type: group.sides,
        amount: group.qty,
        mod: mod,
        value: value,
        rolls: rolls,
        total: value + mod,
      };
    }
  };

  const handleDiceRoller = () => {
    console.log(rollDice(1, 20, 0, 'adv'));
  };


  return (
    <>
      <h1>Dice Roller</h1>
      <button onClick={handleDiceRoller}>Roll</button>
      <div id="dice-box"></div>
    </>
  );
}
