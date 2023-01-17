const $btnPrint = document.querySelector("#btnPrint");
$btnPrint.addEventListener("click", () => {
    window.print();
});

const $btnClose = document.querySelector("#btnClose");
$btnClose.addEventListener("click", () => {
   window.close();
});


