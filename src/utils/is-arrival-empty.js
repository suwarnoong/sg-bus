const isArrivalEmpty = nextBus => {
  return (
    nextBus == null ||
    (nextBus.originCode === '' &&
      nextBus.destinationCode === '' &&
      nextBus.estimatedArrival === '')
  );
};

export default isArrivalEmpty;
