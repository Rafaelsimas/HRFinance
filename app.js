const loadingScreenHome = () => {
  const boxHome1 = document.querySelector(".box-home-l")
  const boxLogin = document.querySelector(".box-login-s")

  setTimeout(() => {
    boxHome1.classList.add("displayHidden")
    boxLogin.classList.remove("displayHidden")
  }, 2000)
}

loadingScreenHome()
