const BREAK_UPGRADES = {
    'money\\1': {
        name: `Real-life Miner`,
        get description() { return `Increase your <b>Miners</b> by <b>+1</b> per level.` },
        cost(i) {
            let x = i.sumBase(1.01).add(1).pow(1.2).sumBase(1.1).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).sumBase(1.1,true).root(1.2).sub(1).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        effect(i) {
            let x = i
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'money\\2': {
        name: `Pickaxe Upgrader`,
        get description() { return `Increase <b>Pickaxe Tier</b> by <b>+1</b> per level.` },
        cost(i) {
            let x = i.sumBase(1.01).pow(1.25).pow_base(2).mul(100)
            return x
        },
        bulk(i) {
            let x = i.div(100).log(2).root(1.25).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        effect(i) {
            let x = i
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'money\\3': {
        name: `Compounding Income`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "money",

        get base() { return Decimal.add(2, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'money\\h1': {
        max: 1,
        unl: () => isModEnabled("hard"),
        get description() { return `Total Cobblestone boosts your <b>income</b>.` },
        cost: () => 1e9,
        curr: "money",

        effect(i) {
            let x = player.break.total.add(10).log10().pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'money\\4': {
        max: 1,
        name: `More Cobblestone`,
        get description() { return `Pickaxe Tier affects Cobblestone at a reduced rate.` },
        cost: () => 1e12,
        curr: "money",

        effect(i) {
            let t = tmp.pickaxe_tier.sub(1).max(0)
            let x = t.pow_base(1.1).mul(t.mul(.1).add(1))
            return x
        },
        effDesc: x => formatMult(x),
    },
    'money\\5': {
        unl: () => tmp.pickaxe_tier.gte(31),
        max: 1,
        name: `Super Stone By Money`,
        get description() { return `Increase Stone By <b>${formatMult(this.base)}</b> Based on your wealth.` },
        cost: () => 1e27,
        curr: "money",

        get base() { return player.break.money.max(1).add(1).root(2.5) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },

    'break\\1': {
        max: 1,
        name: `Better Gold`,
        get description() { return `Improve the formula for Golden Stone.` },
        cost: () => 1,
        curr: "cobble",
    },
    'break\\2': {
        name: `"Breaking" Income`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(2,i.sumBase(1.01).pow(1.25)).mul(10)
            return x
        },
        bulk(i) {
            let x = i.div(10).max(1).log(2).root(1.25).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        get base() { return Decimal.add(isModEnabled("easy") ? 2 : 1.5, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\h1': {
        unl: () => isModEnabled("hard"),
        max: 1,
        get description() { return `<b>Softer Stone H</b> affects the requirement of Quarry Tier at a square-rooted rate.` },
        cost: () => 100,
        curr: "cobble",
    },
    'break\\3': {
        max: 1,
        name: `Worth Quarry`,
        get description() { return `Increase your <b>income</b> by <b>${formatMult(this.base)}</b> per the highest Quarry Tier, starting at <b>2</b>.` },
        cost: () => 1e3,
        curr: "cobble",

        get base() { return 1.1 },
        effect(i) {
            let x = player.t_stone.max.sub(1).pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\4': {
        max: 3,
        name: `Beginner Automation`,
        get description() { return `<b>[1]</b> Automatically enter the next Quarry Tier. <b>[2]</b> Automate <b>Golden Stone Upgrades</b> without spending any resource. <b>[3]</b> Passively generate <b>100%</b> of your Golden Stone gained on reset.` },
        cost(i) {
            return listedCost(i,[1e3,1e4,1e6])
        },
        bulk(i) {
            return listedCost(i,[1e3,1e4,1e6],true)
        },
        curr: "cobble",
    },
    'break\\5': {
        max: 1,
        get description() { return `<b>Miner</b> & <b>Hard Miner</b> are <b>10%</b> stronger.` },
        cost: () => 1e5,
        curr: "cobble",
    },
    'break\\6': {
        name: `More Cobblestone`,

        get description() { return `Increase Cobblestone by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(10,i.sumBase(1.01)).mul(1e6)
            return x
        },
        bulk(i) {
            let x = i.div(1e6).max(1).log(10).sumBase(1.01,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        get base() { return Decimal.add(2, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\7': {
        max: 1,
        get description() { return `<b>Better Miner Cap</b> affects <b>Syngism Miner</b>.` },
        cost: () => 1e7,
        curr: "cobble",
    },
    'break\\8': {
        unl: () => tmp.pickaxe_tier.gte(28),
        max: 1,
        name: `Much More Cobblestone`,

        get description() { return `Increase Cobblestone by <b>${formatMult(this.base)}</b> ,Based on Total Gold Stone.` },
        cost: () => 1e8,
        curr: "cobble",

        get base() { return player.gold.total.add(10).log10().add(1).root(1.6) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\9': {
        unl: () => tmp.pickaxe_tier.gte(29),
        max: 1,
        get description() { return `<b>More Gold</b> are <b>50%</b> stronger.` },
        cost: () => 1e9,
        curr: "cobble",
    },
    'break\\10': {
        unl: () => tmp.pickaxe_tier.gte(29),
        max: 1,
        get description() { return `Unlock The <b>More Upgrades For Gold Stone</b> I Need Reach Pickaxe Tier 30.` },
        cost: () => 1e10,
        curr: "cobble",
    },
    'break\\11': {
        unl: () => tmp.pickaxe_tier.gte(30),
        max: 20,
        name: `Exponent Money`,

        get description() { return `Increase Exponent Money by <b>+0.05</b> per level.` },
        cost(i) {
            let x = Decimal.pow(2,i.sumBase(1.001).pow(1.05)).mul(2e10)
            return x
        },
        bulk(i) {
            let x = i.div(2e10).max(1).log(2).root(1.05).sumBase(1.001,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        effect(i) {
            let x = E(1).add(i.mul(0.05))
            return x
        },
        effDesc: x => "+"+format(x)+" to the exponent",
    },
    'break\\12': {
        unl: () => tmp.pickaxe_tier.gte(43),
        max: 1,
        get description() { return `Passively generate <b>100%</b> of your Cobblestone gained on reset I Need You Reach Pickaxe Tier 44 / Unfountunely There Are No <b>Cobblestone Generation</b>.` },
        cost: () => 1e14,
        curr: "cobble",
    },
    'break\\13': {
        unl: () => tmp.pickaxe_tier.gte(63),
        name: `More More Quarry`,
        max: 999,
        get description() { return `Increase ${tmp.t_stoneName} by <b>${formatMult(this.base)}</b> per level.` },
        cost(i) {
            let x = Decimal.pow(1.02,i.sumBase(1.0025)).mul(1e16)
            return x
        },
        bulk(i) {
            let x = i.div(1e16).max(1).log(1.02).sumBase(1.0025,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        get base() { return Decimal.add(1.05, 0) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\14': {
        unl: () => tmp.pickaxe_tier.gte(68),
        name: `Giant Cobblestone`,
        max: 1,
        get description() { return `Raise Increase Cobblestone By <b>1.5</b>.` },
        cost: () => 1e22,
        curr: "cobble",

        effect(i) {
            let x = E(1).add(i.mul(0.5))
            return x
        },
        effDesc: x => "^"+format(x,1)
    },
    'break\\15': {
        unl: () => tmp.pickaxe_tier.gte(70),
        name: `Give More Cobblestone = Much More Money`,
        max: 1,
        get description() { return `Increase Money by <b>${formatMult(this.base)}</b> ,Based on Total Cobblestone.` },
        cost: () => 1e35,
        curr: "cobble",

        get base() { return player.break.total.add(1).pow(0.4) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\16': {
        unl: () => tmp.pickaxe_tier.gte(86),
        name: `Big Gold Stone`,
        max: 1,
        get description() { return `Raise Increase Gold Stone By <b>1.1</b>.` },
        cost: () => 1e39,
        curr: "cobble",

        effect(i) {
            let x = E(1).add(i.mul(0.1))
            return x
        },
        effDesc: x => "^"+format(x,1)
    },
    'break\\17': {
        unl: () => tmp.pickaxe_tier.gte(90),
        max: 20,
        name: `Fast Quarry Cap`,

        get description() { return `Raise <b>Fast Quarry</b>'s cap by <b>+1</b> per level.` },
        cost(i) {
            let x = Decimal.pow(1.5,i.sumBase(1.001).pow(1.1)).mul(4e39)
            return x
        },
        bulk(i) {
            let x = i.div(4e39).max(1).log(1.5).root(1.1).sumBase(1.001,true)
            return x.add(1).floor()
        },
        curr: "cobble",

        effect(i) {
            let x = i.mul(1)
            return x
        },
        effDesc: x => "+"+format(x,0),
    },
    'break\\18': {
        unl: () => tmp.pickaxe_tier.gte(91),
        name: `Give More Cobblestone = Much More Gold`,
        max: 1,
        get description() { return `Increase Gold Stone by <b>${formatMult(this.base)}</b> ,Based on Total Cobblestone.` },
        cost: () => 5e43,
        curr: "cobble",

        get base() { return player.break.total.add(1).pow(0.2) },
        effect(i) {
            let x = this.base.pow(i)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'break\\???': {
        unl: () => tmp.pickaxe_tier.gte(50),
        name: `THE NEW MAGIC STONE UNIVERSE`,
        max: 1,
        get description() { return `<b>UNLOCK THE NEXT RESET LAYER</b><br>I Need You Give 9.99e999 Cobblestone.` },
        cost: () => "9.99e999",
        curr: "cobble",
    },
}

const BREAK = {
    get miners() {
        let x = Decimal.add(1, upgradeEffect("money\\1"))

        return x
    },
    get miner_effect() {
        let m = tmp.miners.sub(1).max(0)

        let x = m.pow_base(1.1).mul(m.add(1))

        return x
    },

    get pickaxe_tier() {
        let x = Decimal.add(1, upgradeEffect("money\\2"))

        return x
    },
    get pickaxe_tier_effect() {
        let t = tmp.pickaxe_tier.sub(1).max(0)

        let x = t.add(1).mul(t.pow_base(1.5)).mul(t.sqr().pow_base(1.01))

        return x
    },
}

function updateBreakTemp() {
    tmp.miners = BREAK.miners
    tmp.miner_effect = BREAK.miner_effect

    tmp.pickaxe_tier = BREAK.pickaxe_tier
    tmp.pickaxe_tier_effect = BREAK.pickaxe_tier_effect
}