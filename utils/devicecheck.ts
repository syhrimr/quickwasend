interface DeviceCheckOutput {
  isMobile: boolean;
}

export default function devicecheck(): DeviceCheckOutput {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  const isMobile = toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });

  return { isMobile };
}
