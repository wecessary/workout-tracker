import Spinner from "./Spinner";

interface StatusMessages {
  loading: string;
  complete: string;
}

const StatusIndicator = ({
  statusMessages,
  loadingStatus,
  completeStatus,
}: {
  statusMessages: StatusMessages;
  loadingStatus: boolean;
  completeStatus: boolean;
}) => {
  if (completeStatus) {
    return (
      <>
        <span>{statusMessages.complete}</span>
      </>
    );
  }
  if (loadingStatus) {
    return (
      <>
        <span>
          {statusMessages.loading}
        </span>
      </>
    );
  }

  return null;
};

export default StatusIndicator;
