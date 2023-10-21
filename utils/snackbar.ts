/* eslint-disable @typescript-eslint/strict-boolean-expressions */

interface Snackbar {
  alert: (message: string | undefined) => void;
}

export default function snackbar(): Snackbar {
  function alert(message: string | undefined): void {
    console.log("kepanggil kok");
    const snackbar = document.createElement("div");
    const messageNode = document.createTextNode(
      message ?? "Something is not right!"
    );
    snackbar.appendChild(messageNode);
    snackbar.setAttribute("id", "snackbar");
    snackbar.className = "show";
    document.body.appendChild(snackbar);
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }

  return {
    alert,
  };
}
