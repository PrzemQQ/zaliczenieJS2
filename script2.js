alert("w grę Gramy strzałkami! Powodzenia");
const szerokosc_mapy = 300
const wysokosc_mapy = 600
const liczba_wierszy = 20
const liczba_kolumn = 10
const wielkosc_komorki = szerokosc_mapy / liczba_kolumn
const wielkosc_obramowania = 0.2

const typ_z = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
]

const typ_s = [
  [0, 2, 2],
  [2, 2, 0],
  [0, 0, 0],
]

const typ_i = [
  [0, 3, 0, 0],
  [0, 3, 0, 0],
  [0, 3, 0, 0],
  [0, 3, 0, 0],
]

const typ_l = [
  [4, 0, 0],
  [4, 0, 0],
  [4, 4, 0],
]

const typ_j = [
  [0, 0, 5],
  [0, 0, 5],
  [0, 5, 5],
]

const typ_o = [
  [6, 6],
  [6, 6],
]

const typ_t = [
  [0, 7, 0],
  [7, 7, 7],
  [0, 0, 0],
]

const kolor_blokow = [
  'limegreen',
  'darkorange',
  'mediumorchid',
  'dodgerblue',
  'orangered',
  'cornflowerblue',
  'tomato',
]

const typ_blokow = {
  typ_z,
  typ_s,
  typ_i,
  typ_l,
  typ_j,
  typ_o,
  typ_t,
}




class Block {
  constructor(komorki, x, y) {
    this.komorki = komorki
    this.position = { x, y }
    this.isAlive = true
  }

  rotate() {
    const nowe_komorki = []
    for (let i = 0; i < this.komorki.length; i++) {
      nowe_komorki[i] = []
      for (let j = 0; j < this.komorki.length; j++) {
        nowe_komorki[i][j] = this.komorki[this.komorki.length - 1 - j][i]
      }
    }
    this.komorki = nowe_komorki
  }










  poruszanie_blokow_event(e) {
    switch(e.key) {
      case 'ArrowLeft': {
        this.position.x--
        break
      }
      case 'ArrowRight': {
        this.position.x++
        break
      }
      case 'ArrowDown': {
        if (this.position.y + this.komorki.length < liczba_wierszy) {
          this.position.y++
        }
        break
      }
      case 'ArrowUp': {
        this.rotate()
        break
      }
    }
  }

  znajdz_kolizje_blokow(pole_gry) {
    const { x, y } = this.position
    this.komorki.forEach((wiersze, i) => {
      wiersze.forEach((komorka, j) => {
        if (komorka && ((y + i >= liczba_wierszy) || pole_gry[y + i][x + j])) {
          this.isAlive = false
          return
        }
      })
    })
  }
}
Block.timeToChange = 1000





const poruszanie_lewo = (block, pole_gry) => {
  const { komorki, position } = block
  const { x, y } = position
  return !komorki.some((wiersze, i) => {
    return wiersze.some((komorka, j) => {
      if (
        (komorka && x + j < 0) ||
        (komorka && x + j >= liczba_kolumn) ||
        (komorka && pole_gry[y + i][x + j])
      ) return true
    })
  })
  return true
}






const aktualizuj_wynik = (wynik) => {
  const element_wyniku = document.getElementById('wynik')
  element_wyniku.innerHTML = wynik
}








const narysuj_pole = (pole_gry, ctx) => {
  pole_gry.forEach((wiersz, zaw_kolumn) => {
    wiersz.forEach((komorka, zawartosc_kolumn) => {
      ctx.fillStyle = komorka ? kolor_blokow[komorka - 1] : 'lightblue'
      ctx.strokeStyle = '#555'
      ctx.lineWidth = wielkosc_obramowania

      const argumenty = [
        zawartosc_kolumn * wielkosc_komorki, zaw_kolumn * wielkosc_komorki,
        wielkosc_komorki, wielkosc_komorki,
      ]

      ctx.fillRect(...argumenty)
      ctx.strokeRect(...argumenty)
    })
  })
}

const { requestAnimationFrame } = window
const fps = 24
const czas_do_poruszenia = 500










let licznik_wylaczony = 0
let poprzedni_czas = 0
let poprzednia_pozycja = { x: 0, y: 0 }
let poprzednie_ulozenie_blokow = [[]]

const render = (gra, block, czas) => {
  if (!block) {
    const arrOfTypes = Object.values(typ_blokow)
    const blockType = arrOfTypes[arrOfTypes.length * Math.random() | 0]
    const x = ((liczba_kolumn - blockType.length) / 2) | 0
    block = new Block(blockType, x, 0)
    poprzednia_pozycja = { x, y: 0 }
    console.log('block', block)
    addEventListener('keydown', (e) => block.poruszanie_blokow_event.bind(block)(e))
  }

  const { ctx, pole_gry } = gra
  const { position } = block

  if (czas - poprzedni_czas > 1000 / fps) {
    licznik_wylaczony++
    if (licznik_wylaczony === (fps * czas_do_poruszenia) / 1000) {
      licznik_wylaczony = 0
      if (block && block.isAlive) {
        position.y++
      } else {
        block = null
      }
    }

    poprzedni_czas = czas

    dane_do_tablicy(poprzednie_ulozenie_blokow, pole_gry, poprzednia_pozycja.y, poprzednia_pozycja.x, true)

    const poruszanie = poruszanie_lewo(block, pole_gry)
    if (!poruszanie) {
      position.x = poprzednia_pozycja.x
      block.komorki = poprzednie_ulozenie_blokow
    }

    if (position.y > poprzednia_pozycja.y) {
      position.y = poprzednia_pozycja.y + 1
    }

    block.znajdz_kolizje_blokow(pole_gry)
    if (block.isAlive) {
      dane_do_tablicy(block.komorki, pole_gry, position.y, position.x)
      narysuj_pole(pole_gry, ctx)
      poprzednia_pozycja = Object.assign({}, position)
      poprzednie_ulozenie_blokow = [].concat(block.komorki)
    } else if (poprzednia_pozycja.y > block.komorki.length - 1) {
      dane_do_tablicy(block.komorki, pole_gry, poprzednia_pozycja.y, poprzednia_pozycja.x)
      gra.pole_gry = znajdz_max_wiersz(pole_gry)
      narysuj_pole(gra.pole_gry, ctx)
      block = null
    } else {
      dane_do_tablicy(poprzednie_ulozenie_blokow, pole_gry, poprzednia_pozycja.y, poprzednia_pozycja.x)
      const lastBlock = block.komorki.filter((wiersz) => !wiersz.every((komorka) => !komorka)).slice(-poprzednia_pozycja.y)
      dane_do_tablicy(lastBlock, pole_gry, 0, position.x)
      narysuj_pole(gra.pole_gry, ctx)
      setTimeout(() => { alert('Koniec gry :( spróbuj ponownie :D)') }, 0)
      gra.pole_gry = wygeneruj_pole(liczba_wierszy + 4, liczba_kolumn)
      aktualizuj_wynik(0)
      block = null
    }
  }

  requestAnimationFrame((czas) => render(gra, block, czas))
}

const dane_do_tablicy = (tablica2, tablica3, wiersz, kolumna, wyczysc_dane) => {
  let i = 0
  while(i < tablica2.length) {
    let j = 0
    while(j < tablica2[i].length) {
      tablica3[wiersz + i][kolumna + j] = !wyczysc_dane
        ? tablica2[i][j]
         ? tablica2[i][j]
         : tablica3[wiersz + i][kolumna + j]
        : tablica2[i][j]
          ? 0
          : tablica3[wiersz + i][kolumna + j]
      j++
    }
    i++
  }
}

let wynik = 0
const znajdz_max_wiersz = (pole_gry) => {
  const wyszkuane_pole = pole_gry.filter((wiersz) => wiersz.some((komorka) => (komorka === 0)))
  const siatka = pole_gry.length - wyszkuane_pole.length
  wynik += siatka * 100
  aktualizuj_wynik(wynik)
  const zawartosc_tablicy = wygeneruj_pole(siatka, liczba_kolumn)
  return [...zawartosc_tablicy, ...wyszkuane_pole]
}

const wygeneruj_pole = (wiersze, kolumny) => {
  const pole_gry = Array.from({length: wiersze},
    () => Array.from({length: kolumny}, () => 0))
  return pole_gry
}

window.onload = () => {
  const canvas = document.getElementById('mapa')
  const ctx = canvas.getContext('2d')
  const gra = {
    ctx,
    pole_gry: wygeneruj_pole(liczba_wierszy + 4, liczba_kolumn),
  }
  render(gra)
}
