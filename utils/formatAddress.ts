const formatAddress = (address: string | null): string => {
  if (!address) {
    return "";
  }

  const address_regex = /^(0x)?[\da-f]{40}$/i;
  if (address.match(address_regex)) {
    return `${address.slice(0, 4)}…${address.slice(
      address.length - 4,
      address.length
    )}`;
  }

  return address;
};

export default formatAddress;
