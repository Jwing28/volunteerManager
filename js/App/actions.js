//action types
export const My_Test = 'test';

//action creator
export function test(text) {
  return {
    type: My_Test,
    text
  };
}

//export const test = () => ({ type: My_Test, text });
