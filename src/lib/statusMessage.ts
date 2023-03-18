interface StatusMessages {
  loadingMessage: string;
  completeMessage: string;
}

const getStatusMessage = (
  statusMessages: StatusMessages,
  loadingStatus: boolean,
  completeStatus: boolean
) => {
  if (completeStatus) {
    return statusMessages.completeMessage;
  }
  if (loadingStatus) {
    return statusMessages.loadingMessage;
  }

  return null;
};

export default getStatusMessage;
