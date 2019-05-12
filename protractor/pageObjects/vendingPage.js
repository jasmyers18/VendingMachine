var vendingPage = function() {
    browser.get('https://glitchitsystem.com/vendingmachine/')
}

vendingPage.prototype = Object.create({}, {
    onesLabel: { get: function() { return element(by.css('body > form > span:nth-child(1)'))}},
    fivesLabel: { get: function() { return element(by.css('body > form > span:nth-child(4)'))}},
    nickelsLabel: { get: function() { return element(by.css('body > form > span:nth-child(7)'))}},
    dimesLabel: { get: function() { return element(by.css('body > form > span:nth-child(10)'))}},
    quartersLabel: { get: function() { return element(by.css('body > form > span:nth-child(13)'))}},

    onesFld: { get: function() { return element(by.id('ones'))}},
    fivesFld: { get: function() { return element(by.id('fives'))}},
    nickelsFld: { get: function() { return element(by.id('nickels'))}},
    dimesFld: { get: function() { return element(by.id('dimes'))}},
    quartersFld: { get: function() { return element(by.id('quarters'))}},

    messageTxt: { get: function() { return element(by.id('message'))}},
    totalTxt: { get: function() { return element(by.css('body > h2:nth-child(9)'))}},
    headingTxt: { get: function() { return element(by.css('body > h1'))}},

    cokeBtn: { get: function() { return element(by.buttonText('Coke'))}},
    moxieBtn: { get: function() { return element(by.buttonText('Moxie'))}},
    frescaBtn: { get: function() { return element(by.buttonText('Fresca'))}},
    tabBtn: { get: function() { return element(by.buttonText('TaB'))}},
    cancelBtn: { get: function() { return element(by.buttonText('Cancel'))}},

    calculateTotalPaid: { value: function (ones, fives, nickels, dimes, quarters) { 

        var one = ones * 1
        var five = fives * 5
        var nickel = nickels * .05
        var dime = dimes * .1
        var quarter = quarters * .25

        var total = one + five + nickel + dime + quarter
        return total.toFixed(2)
    }}
})

module.exports = vendingPage