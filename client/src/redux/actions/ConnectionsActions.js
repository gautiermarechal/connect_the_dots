export const requestConnections = () => ({
  type: "REQUEST_CONNECTIONS",
});

export const receiveConnections = (data) => ({
  type: "RECEIVE_CONNECTIONS",
  data: data,
});

export const errorConnections = () => ({
  type: "ERROR_CONNECTIONS",
});
