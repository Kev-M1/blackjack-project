const blackjackModule = (() => {
  "use strict"; let e = [], t = ["H", "D", "S", "C"], r = ["A", "K", "Q", "J"], a = [], n = document.querySelector("#btnNewGame"), l = document.querySelector("#btnAskForCard"), s = document.querySelector("#btnStop"), d = document.querySelectorAll(".score"), u = document.querySelectorAll(".cards-div"), o = (e = 2) => { a = []; for (let t = 0; t < e; t++)a.push(0); return a }, c = () => { for (let a = 2; a <= 10; a++)for (let n of t) e.push(a + n); for (let l of r) for (let s of t) e.push(l + s); return _.shuffle(e) }, i = () => e.pop(), P = e => { let t = e.substring(0, e.length - 1), a; return r.includes(t) ? a = "A" === t ? 11 : 10 : (t *= 1, a = t), console.log({ card: e }, { cardValue: t }, { points: a }), a }, j = (e, t, r) => { a[e] = a[e] + t, d[r].textContent = `${a[e]}` }, g = (e, t) => { u[e].innerHTML += `<img class="card" src="assets/cards/${t}.png" alt="card">` }, f = () => { l.disabled = !0, s.disabled = !0 }, $ = () => { l.disabled = !1, s.disabled = !1 }, h = e => { for (; a[a.length - 1] < 17;) { let t = i(), r = P(t); j(a.length - 1, r, d.length - 1), g(u.length - 1, t) } p() }, p = () => {
    let e, t;[e, t] = a, e > 21 ? alert(`
      Pierdes!! Te pasaste de 21, gana la PC
      Puntaje jugador: ${e}
      Puntaje PC: ${t}
      `) : t > 21 ? alert(`
      Ganaste!! el PC se paso de 21
      Puntaje jugador: ${e}
      Puntaje PC: ${t}`) : e > t ? alert(`
      Ganaste!!
      Puntaje jugador: ${e}
      Puntaje PC: ${t}`) : t > e ? alert(`
      Perdiste!!
      Puntaje jugador: ${e}
      Puntaje PC: ${t}`) : alert(`
      Empate!!
      Puntaje jugador: ${e}
      Puntaje PC: ${t}`)
  }, C = () => { d.forEach(e => { e.innerHTML = "" }), u.forEach(e => { e.innerHTML = "" }) }; l.addEventListener("click", e => { let t = i(), r = P(t); j(0, r, 0), g(0, t), a[0] > 21 && (f(), h(a[0])) }), s.addEventListener("click", e => { f(), h() }), n.addEventListener("click", e => { b() }); let b = () => { $(), e = c(), a = o(), C() }; b()
})();