const fakeDataBaseUsers = [
  {
    name: "Rafael",
    surname: "Simas",
    email: "rafasimashm@gmail.com",
    password: "123456",
  },
  {
    name: "Hudna",
    surname: "Mendonça",
    email: "hudnam@gmail.com",
    password: "1234567",
  },
]

const dataValues = [
  {
    name: "Música",
    amount: 200,
    date: new Date().toLocaleDateString("pt-BR"),
    reference: "entrada",
  },
  {
    name: "Estágio",
    amount: 1600,
    date: new Date().toLocaleDateString("pt-BR"),
    reference: "entrada",
  },
  {
    name: "almoço",
    amount: 35.0,
    date: new Date().toLocaleDateString("pt-BR"),
    reference: "saida",
  },
]

let verifyLogin

const boxHome1 = document.querySelector(".box-home-l")
const boxLogin = document.querySelector(".box-login-s")
const boxAllData = document.querySelector(".box-register-d")
const boxGhostInsertData = document.querySelector(".box-register-ghost")

const loadingScreenHome = () => {
  setTimeout(() => {
    boxHome1.classList.add("displayHidden")
    boxLogin.classList.remove("displayHidden")
  }, 2000)
}
loadingScreenHome()

const login = () => {
  const inputEmail = document.querySelector("#emailUser").value
  const inputPassword = document.querySelector("#passwordUser").value

  verifyLogin = fakeDataBaseUsers.find(
    (user) => user.email === inputEmail && user.password === inputPassword,
  )

  if (verifyLogin) {
    boxLogin.classList.add("displayHidden")
    boxAllData.classList.remove("displayHidden")
    welcomeDisplay()
    renderDataOnScreen()
  } else {
    console.log("Credenciais inválidas")
  }
}

const welcomeDisplay = () => {
  const displayUserName = document.querySelector(".screen-allData-Display")
  displayUserName.innerHTML = `
          <div class="dataUserIdentification">Olá <strong>${verifyLogin.name}!</strong></div>
          <div>Bem vindo(a)</div>
         `
}

const renderDataOnScreen = () => {
  const ulList = document.querySelector(".ulListData")
  ulList.innerHTML = ""

  dataValues.forEach((data) => {
    ulList.innerHTML += `
      <li>
          <div>${data.name}</div>
          <div>R$${data.amount}</div>
          <div>${data.date}</div>
          <div><ion-icon name="create-outline"></ion-icon></div>
          <div class="${data.reference}">${data.reference}</div>
        </li>
    `
    sumAllValues()
  })
}

const sumAllValues = () => {
  const total = dataValues.reduce((acc, item) => {
    const amount = Number(item?.amount)
    if (Number.isNaN(amount)) return acc // ignora valores inválidos

    if (item?.reference === "entrada") return acc + amount
    if (item?.reference === "saida") return acc - amount

    // se a referência não for reconhecida, ignora
    return acc
  }, 0)

  displyAmount(total) // (corrigi o nome da função)
}

const displyAmount = (total) => {
  const displayAmoutValue = document.querySelector(".display")
  displayAmoutValue.innerHTML = `
        <h3>SALDO ATUAL</h3>
        <strong>R$${total}</strong>
  `
}

const openGhostDrawer = () => {
  boxGhostInsertData.classList.remove("displayHidden")
}

const insertData = () => {
  const nameTransaction = document.querySelector("#nameTransaction").value
  const valueTransaction = document.querySelector("#valueTransaction").value

  const newTransaction = {
    name: nameTransaction,
    amount: valueTransaction,
    date: new Date().toLocaleDateString("pt-BR"),
    reference: "saida",
  }

  dataValues.push(newTransaction)
  boxGhostInsertData.classList.add("displayHidden")
  renderDataOnScreen()
}
