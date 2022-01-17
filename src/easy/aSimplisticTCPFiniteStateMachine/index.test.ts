import aSimplisticTCPFiniteStateMachine from ".";

test("traverseTCPStates", () => {
  expect(
    aSimplisticTCPFiniteStateMachine([
      "APP_ACTIVE_OPEN",
      "RCV_SYN_ACK",
      "RCV_FIN",
    ])
  ).toBe("CLOSE_WAIT");
  expect(
    aSimplisticTCPFiniteStateMachine(["APP_PASSIVE_OPEN", "RCV_SYN", "RCV_ACK"])
  ).toBe("ESTABLISHED");
  expect(
    aSimplisticTCPFiniteStateMachine([
      "APP_ACTIVE_OPEN",
      "RCV_SYN_ACK",
      "RCV_FIN",
      "APP_CLOSE",
    ])
  ).toBe("LAST_ACK");
  expect(aSimplisticTCPFiniteStateMachine(["APP_ACTIVE_OPEN"])).toBe(
    "SYN_SENT"
  );
  expect(
    aSimplisticTCPFiniteStateMachine([
      "APP_PASSIVE_OPEN",
      "RCV_SYN",
      "RCV_ACK",
      "APP_CLOSE",
      "APP_SEND",
    ])
  ).toBe("ERROR");
});
