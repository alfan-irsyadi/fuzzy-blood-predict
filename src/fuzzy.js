

export class FuzzyLogic {
    constructor(persediaan, permintaan, kebutuhan) {
        var [a1, b1, c1] = persediaan
        var [a2, b2, c2] = permintaan
        var [a3, b3, c3] = kebutuhan
        this.batasPersediaan = persediaan
        this.batasPermintaan = permintaan
        this.batasKebutuhan = kebutuhan
        this.fuzzySets = {
            'persediaan': this.fuzzySet(a1, b1, c1),
            'permintaan': this.fuzzySet(a2, b2, c2),
            'kebutuhan': this.fuzzySet(a3, b3, c3)
        }

    }

    fuzzyTurun = (x, a, b) => (x <= a ? 1 : (x >= b ? 0 : (b - x) / (b - a)))
    fuzzyNaik = (x, a, b) => (x <= a ? 0 : (x >= b ? 1 : (x - a) / (b - a)))
    fuzzySegitiga = (x, a, b, c) => (x < b ? this.fuzzyNaik(x, a, b) : this.fuzzyTurun(x, b, c))
    invFuzzyTurun = (y, a, b) => b - y * (b - a)
    invFuzzyNaik = (y, a, b) => y * (b - a) + a

    invFuzzySegitiga = (y1, y2, a, b) => {
        let c = (b - a) / 2
        let x1 = this.invFuzzyNaik(y1, a, c)
        let x2 = this.invFuzzyTurun(y2, c, b)
        return [x1, x2]
    }

    setRules = (rules) => this.rules = rules        

    inferensi(input1, input2) {
        var kebutuhan = {
            'sedikit': [],
            'sedang': [],
            'banyak': []
        }
        var mu = {
            'sedikit': [],
            'sedang': [],
            'banyak': []
        }
        this.alpha = {
            'sedikit': [],
            'sedang': [],
            'banyak': []
        }
        this.alphaMax = {
            'sedikit': [],
            'sedang': [],
            'banyak': []
        }
        for (let key in kebutuhan) {
            kebutuhan[key] = this.rules.filter(e => e.kebutuhan == key)
            kebutuhan[key].forEach(e => {
                // print(e)
                let mu1 = this.fuzzySets['persediaan'][e['persediaan']](input1)
                let mu2 = this.fuzzySets['permintaan'][e['permintaan']](input2)
                mu[key].push(Math.min(mu1, mu2))
            });
            // print(mu)
            this.alpha[key] = mu[key]
            this.alphaMax[key] = Math.max(...mu[key])
        }
        
    }

    titikPotong = ()=>{
        var [a, b, c] = this.batasKebutuhan
        var alpha1 = this.alphaMax['sedikit']
        var alpha2 = this.alphaMax['sedang']
        var alpha3 = this.alphaMax['banyak']
        var y = []
        var xPot1 = (a + b) / 2
        var yPot1 = this.fuzzyTurun(xPot1, a, b)
        var xPot2 = (b + c) / 2
        var yPot2 = this.fuzzyTurun(xPot2, b, c)
        var x1 = alpha1 > yPot1 ? this.invFuzzyTurun(alpha1, a, b) : this.invFuzzyNaik(alpha1, a, b)
        var y1 = alpha1
        var x2 = alpha1 > yPot1 ? xPot1 : this.invFuzzyTurun(alpha1, a, b)
        var y2 = alpha1 > yPot1 ? yPot1 : alpha1

        var x3 = alpha2 > yPot1 ? xPot1 : this.invFuzzyNaik(alpha2, a, b)
        var y3 = alpha2 > yPot1 ? yPot1 : alpha2

        var x4 = alpha2 < yPot1 ? this.invFuzzyTurun(alpha2, a, b) : this.invFuzzyNaik(alpha2, a, b)        
        var y4 = alpha2
        
        var xSub1 = alpha1 > alpha2 ? x2 : x3
        var ySub1 = alpha1 > alpha2 ? y2 : y3

        var x5 = alpha2 > yPot2 ? this.invFuzzyTurun(alpha2, b, c) : this.invFuzzyNaik(alpha2, b, c)
        var y5 = alpha2

        var x6 = alpha2 > yPot2 ? xPot2 : this.invFuzzyTurun(alpha2, b, c)
        var y6 = alpha2 > yPot2 ? yPot2 : alpha2

        var x7 = alpha3 > yPot2 ? xPot2 : this.invFuzzyNaik(alpha3, b, c)
        var y7 = alpha3 > yPot2 ? yPot2 : alpha3

        var x8 = alpha3 < yPot2 ? this.invFuzzyTurun(alpha3, b, c) : this.invFuzzyNaik(alpha3, b, c)        
        var y8 = alpha3

        var xSub2 = alpha2 > alpha3 ? x6 : x7        
        var ySub2 = alpha2 > alpha3 ? y6 : y7
        return ([[a, alpha1], 
            [x1, y1], 
            [xSub1, ySub1],             
            [x4, y4], 
            [b, alpha2], 
            [x5, y5], 
            [xSub2, ySub2], 
            [x8, y8], 
            [c, alpha3]])
    }

    linear = (x, A, B)=>{
        let [x1, y1] = A
        let [x2, y2] = B
        return (x2 == x1 ? 0 : (y2-y1)/(x2-x1)*(x - x1) + y1)
    }

    momen = () => {
        var titik = this.titikPotong()
        var hasil = 0
        for(let i = 0; i < titik.length-1 ; i++){
            hasil += this.integral(x=> x*this.linear(x, titik[i], titik[i+1]), [titik[i][0], titik[i+1][0]] )
        }        
        return hasil
    }
    
    luasTrapesium = (alas, atas, t)=>(alas+atas)*t/2

    luas = () => {
        var titik = this.titikPotong()
        print(titik)
        var hasil = 0
        for(let i = 0; i < titik.length-1 ; i++){
            let z = [titik[i][0], titik[i+1][0]]
            hasil += this.integral(x=> this.linear(x, titik[i], titik[i+1]), z)
            print(['Luas ', titik[i], ' dan ', titik[i+1], ' = ', this.integral(x=> this.linear(x, titik[i], titik[i+1]), z)])
        }        
        return hasil
    }

    fuzzySet(a, b, c) {
        return {
            sedikit: (stock) => this.fuzzyTurun(stock, a, b),
            sedang: (stock) => this.fuzzySegitiga(stock, a, b, c),
            banyak: (stock) => this.fuzzyNaik(stock, b, c),
        }
    }

    integral = (f, z, n = 100000) => {
        let [z1, z2] = z
        let dx = (z2 - z1) / n
        let x0 = z1
        var hasil = 0
        let x1
        for (let i = 0; i < n; i++) {
            x1 = x0 + dx
            hasil = hasil + (f(x0) + f(x1)) * dx / 2
            x0 = x1
        }
        return hasil
    }

    // fuzzySets(persediaan, permintaan, kebutuhan) {
    //     var [a1, c1] = persediaan
    //     var [a2, c2] = permintaan
    //     var [a3, c3] = kebutuhan
    //     var b1 = (c1 + a1) / 2
    //     var b2 = (c2 + a2) / 2
    //     var b3 = (c3 + a3) / 2
    //     return {
    //         'persediaan': this.fuzzySet(a1, b1, c1),
    //         'permintaan': this.fuzzySet(a2, b2, c2),
    //         'kebutuhan': this.fuzzySet(a3, b3, c3)
    //     }
    // }

    mamdani(input1, input2){
        this.inferensi(input1, input2)        
        print('Momen : ' + this.momen())
        print('luas : ' + this.luas())
        return this.momen() / this.luas()
    }

    sugeno(input1, input2){
        this.inferensi(input1, input2)        
        var [a, b, c] = this.batasKebutuhan
        var x = {
            'sedikit': a,
            'sedang': b,
            'banyak': c
        }
        var nom = 0
        var dem = 0
        for(let key in this.alpha){
            this.alpha[key].forEach(e=>{
                nom += x[key]*e
                dem += e
            })
        }
        return(nom/dem)
    }

}

const print = (x) => console.log(x)

export const rules = [{
    'persediaan': 'sedikit',
    'permintaan': 'sedikit',
    'kebutuhan': 'sedikit'
},
{
    'persediaan': 'sedikit',
    'permintaan': 'sedang',
    'kebutuhan': 'sedang'
},
{
    'persediaan': 'sedikit',
    'permintaan': 'banyak',
    'kebutuhan': 'banyak'
},
{
    'persediaan': 'sedang',
    'permintaan': 'sedikit',
    'kebutuhan': 'sedikit'
},
{
    'persediaan': 'sedang',
    'permintaan': 'sedang',
    'kebutuhan': 'sedang'
},
{
    'persediaan': 'sedang',
    'permintaan': 'banyak',
    'kebutuhan': 'banyak'
},
{
    'persediaan': 'banyak',
    'permintaan': 'sedikit',
    'kebutuhan': 'sedikit'
},
{
    'persediaan': 'banyak',
    'permintaan': 'sedang',
    'kebutuhan': 'sedang'
},
{
    'persediaan': 'banyak',
    'permintaan': 'banyak',
    'kebutuhan': 'banyak'
},]



