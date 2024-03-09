let inp = document.querySelector("#file-input")
inp.addEventListener("change", (e) => {
if (e.target.files[0]) {
document.querySelector('#file-label').style = `
background-color:#49d35cff
`
} else {
document.querySelector('#file-label').style = `
background-color:#025bee
`
}
})