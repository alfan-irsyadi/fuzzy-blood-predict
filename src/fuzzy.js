

export class FuzzyLogic {
    constructor(persediaan, permintaan, penerimaan) {
        var [a1, b1, c1] = persediaan
        this.batasPersediaan = persediaan
        this.batasPermintaan = permintaan
        this.batasPenerimaan = penerimaan
        var [a2, b2, c2] = permintaan
        var [a3, b3, c3] = penerimaan
        this.fuzzySets = {
            'persediaan': this.fuzzySet(a1, b1, c1),
            'permintaan': this.fuzzySet(a2, b2, c2),
            'penerimaan': this.fuzzySet(a3, b3, c3)
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
        var penerimaan = {
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
        for (let key in penerimaan) {
            penerimaan[key] = this.rules.filter(e => e.penerimaan == key)
            penerimaan[key].forEach(e => {
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

    momen = () => {
        var alpha1 = this.alphaMax['sedikit']
        var alpha2 = this.alphaMax['sedang']
        var alpha3 = this.alphaMax['banyak']

        var xA1, xB1, xB2, xB3, xB4, xC1
        var luasA, luasB, luasC
        var [a, b, c] = this.batasPenerimaan
        // var [x1, x2, x3, x4 ] =  [invFuzzyTurun(alpha1, a, b), invFuzzyNaik(alpha2, a, b), invFuzzyTurun(alpha2, b, c), invFuzzyNaik(alpha3, b, c)]
        // var alpha1 = 0.2
        var xPot1 = (a + b) / 2
        var yPot1 = this.fuzzyTurun(xPot1, a, b)
        var xPot2 = (b + c) / 2
        var yPot2 = this.fuzzyTurun(xPot2, b, c)
        var luas = 0
        var x1 = alpha1 < yPot1 ? this.invFuzzyNaik(alpha1, a, b) : this.invFuzzyTurun(alpha1, a, b)
        var x2 = alpha2 > yPot1 ? this.invFuzzyNaik(alpha2, a, b) : this.invFuzzyTurun(alpha2, a, b)
        var x3 = alpha2 < yPot2 ? this.invFuzzyNaik(alpha2, b, c) : this.invFuzzyTurun(alpha2, b, c)
        var x4 = alpha3 > yPot2 ? this.invFuzzyNaik(alpha3, b, c) : this.invFuzzyTurun(alpha3, b, c)

        luas = this.integral(x => alpha1 * x, [a, x1]) + this.integral(x => alpha2 * x, [x2, b])
        luas += this.integral(x => (alpha1 < yPot1 ? x * this.fuzzyNaik(x, a, b) : x * this.fuzzyTurun(x, a, b)), [x1, xPot1])
        luas += this.integral(x => (alpha2 > yPot1 ? x * this.fuzzyNaik(x, a, b) : x * this.fuzzyTurun(x, a, b)), [xPot1, x2])
        luas += this.integral(x => x * alpha2, [b, x3]) + this.integral(x => x * alpha3, [x4, c])
        luas += this.integral(x => (alpha2 < yPot2 ? x * this.fuzzyNaik(x, b, c) : x * this.fuzzyTurun(x, b, c)), [x3, xPot2])
        luas += this.integral(x => (alpha3 > yPot2 ? x * this.fuzzyNaik(x, b, c) : x * this.fuzzyTurun(x, b, c)), [xPot2, x4])
        /*
        (b - x)/(b-a) = (x - a)/(b - a)
        b - x = x - a
    
        */
        return luas
    }

    luas = () => {
        // alpha = this.alpha
        // print(this.alpha)
        var alpha1 = this.alphaMax['sedikit']
        var alpha2 = this.alphaMax['sedang']
        var alpha3 = this.alphaMax['banyak']
        var xA1, xB1, xB2, xB3, xB4, xC1
        var luasA, luasB, luasC
        var [a, b, c] = this.batasPenerimaan        
        // var [x1, x2, x3, x4 ] =  [this.invFuzzyTurun(alpha1, a, b), this.invFuzzyNaik(alpha2, a, b), this.invFuzzyTurun(alpha2, b, c), this.invFuzzyNaik(alpha3, b, c)]
        // var alpha1 = 0.2
        var xPot1 = (a + b) / 2
        var yPot1 = this.fuzzyTurun(xPot1, a, b)        
        var xPot2 = (b + c) / 2
        var yPot2 = this.fuzzyTurun(xPot2, b, c)

        var luas = 0
        var x1 = alpha1 < yPot1 ? this.invFuzzyNaik(alpha1, a, b) : this.invFuzzyTurun(alpha1, a, b)        
        var x2 = alpha2 > yPot1 ? this.invFuzzyNaik(alpha2, a, b) : this.invFuzzyTurun(alpha2, a, b)
        var x3 = alpha2 < yPot2 ? this.invFuzzyNaik(alpha2, b, c) : this.invFuzzyTurun(alpha2, b, c)
        var x4 = alpha3 > yPot2 ? this.invFuzzyNaik(alpha3, b, c) : this.invFuzzyTurun(alpha3, b, c)
        print([alpha1, yPot1])

        luas = this.integral(x => alpha1, [a, x1]) + this.integral(x => alpha2, [x2, b])
        luas += this.integral(x => (alpha1 < yPot1 ? this.fuzzyNaik(x, a, b) : this.fuzzyTurun(x, a, b)), [x1, xPot1])
        luas += this.integral(x => (alpha2 > yPot1 ? this.fuzzyNaik(x, a, b) : this.fuzzyTurun(x, a, b)), [xPot1, x2])
        luas += this.integral(x => alpha2, [b, x3]) + this.integral(x => alpha3, [x4, c])
        luas += this.integral(x => (alpha2 < yPot2 ? this.fuzzyNaik(x, b, c) : this.fuzzyTurun(x, b, c)), [x3, xPot2])
        luas += this.integral(x => (alpha3 > yPot2 ? this.fuzzyNaik(x, b, c) : this.fuzzyTurun(x, b, c)), [xPot2, x4])
        /*
        (b - x)/(b-a) = (x - a)/(b - a)
        b - x = x - a
    
        */
        
        return luas
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

    // fuzzySets(persediaan, permintaan, penerimaan) {
    //     var [a1, c1] = persediaan
    //     var [a2, c2] = permintaan
    //     var [a3, c3] = penerimaan
    //     var b1 = (c1 + a1) / 2
    //     var b2 = (c2 + a2) / 2
    //     var b3 = (c3 + a3) / 2
    //     return {
    //         'persediaan': this.fuzzySet(a1, b1, c1),
    //         'permintaan': this.fuzzySet(a2, b2, c2),
    //         'penerimaan': this.fuzzySet(a3, b3, c3)
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
        var [a, b, c] = this.batasPenerimaan
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
    'penerimaan': 'sedikit'
},
{
    'persediaan': 'sedikit',
    'permintaan': 'sedang',
    'penerimaan': 'sedang'
},
{
    'persediaan': 'sedikit',
    'permintaan': 'banyak',
    'penerimaan': 'banyak'
},
{
    'persediaan': 'sedang',
    'permintaan': 'sedikit',
    'penerimaan': 'sedikit'
},
{
    'persediaan': 'sedang',
    'permintaan': 'sedang',
    'penerimaan': 'sedang'
},
{
    'persediaan': 'sedang',
    'permintaan': 'banyak',
    'penerimaan': 'banyak'
},
{
    'persediaan': 'banyak',
    'permintaan': 'sedikit',
    'penerimaan': 'sedikit'
},
{
    'persediaan': 'banyak',
    'permintaan': 'sedang',
    'penerimaan': 'sedang'
},
{
    'persediaan': 'banyak',
    'permintaan': 'banyak',
    'penerimaan': 'banyak'
},]


