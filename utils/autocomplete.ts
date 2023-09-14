type AutoCompleteCallback = (t: string) => void

export default function autocomplete(
  inp: HTMLInputElement,
  arr: string[],
  cb: AutoCompleteCallback
) {
  let currentFocus: number;

  inp.addEventListener("input", function () {
    let a: HTMLElement, b: HTMLElement;
    const val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", `${this.id}autocomplete-list`);
    a.setAttribute("class", "autocomplete-items");
    
    this.parentNode?.appendChild(a);
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase().startsWith(val.toUpperCase())) {
        b = document.createElement("DIV");
        b.innerHTML = `<strong>${arr[i].substring(0, val.length)}</strong>`;
        b.innerHTML += arr[i].substring(val.length);
        b.innerHTML += `<input type='hidden' value='${arr[i]}'>`;
        b.addEventListener("click", function () {
          inp.value = this.getElementsByTagName("input")[0].value;
          cb(inp.value);
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e: KeyboardEvent) {
    let x = document.getElementById(`${this.id}autocomplete-list`);
    let y: NodeList<HTMLDivElement>;
    if (x) y = x.querySelectorAll("div");
    
    if (e.key === "ArrowDown") {
      currentFocus++;
      addActive(y);
    } else if (e.key === "ArrowUp") {
      currentFocus--;
      addActive(y);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentFocus > -1) {
        if (y) y[currentFocus]?.click();
      }
    }
  });

  function addActive(x: HTMLDivElement[] | undefined) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x: HTMLDivElement[] | undefined) {
    if (!x) return;
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt?: HTMLElement) {
    const x = document.getElementsByClassName("autocomplete-items") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode?.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e: MouseEvent) {
    closeAllLists(e.target as HTMLElement);
  });
}
