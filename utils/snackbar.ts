export default function snackbar() {
  function alert(message: string | undefined) {
    console.log("kepanggil kok")
    const snackbar = document.createElement("div");
    const messageNode = document.createTextNode(message || "Something is not right!");
    snackbar.appendChild(messageNode);
    snackbar.setAttribute("id", "snackbar");
    snackbar.className = "show";
    document.body.appendChild(snackbar);
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }

  return {
    alert
  }
}