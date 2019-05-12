var VendingPage = require('../pageObjects/vendingPage')

describe('Vending Machine Tests', function () {

    var vendingPage

    beforeEach(function () {
        browser.ignoreSynchronization = true
        vendingPage = new VendingPage()
    })

    // smoke test
    it('should diplay all content', function () {
        expect(vendingPage.onesLabel.getText()).toEqual('Ones')
        expect(vendingPage.fivesLabel.getText()).toEqual('Fives')
        expect(vendingPage.nickelsLabel.getText()).toEqual('Nickels')
        expect(vendingPage.dimesLabel.getText()).toEqual('Dimes')
        expect(vendingPage.quartersLabel.getText()).toEqual('Quarters')

        expect(vendingPage.onesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.fivesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.nickelsFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.dimesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.quartersFld.getAttribute('value')).toEqual('0')

        expect(vendingPage.messageTxt.getText()).toEqual('Insert money first. Select a soda.')
        expect(vendingPage.totalTxt.getText()).toEqual('Total Entered: $0')
        expect(vendingPage.headingTxt.getText()).toEqual('Vending Machine')

        expect(vendingPage.cokeBtn.isDisplayed()).toBe(true)
        expect(vendingPage.moxieBtn.isDisplayed()).toBe(true)
        expect(vendingPage.frescaBtn.isDisplayed()).toBe(true)
        expect(vendingPage.tabBtn.isDisplayed()).toBe(true)
        expect(vendingPage.cancelBtn.isDisplayed()).toBe(true)
    })

    it('should tell you to enter money first', function () {
        var sodaButtons = [vendingPage.cokeBtn, vendingPage.moxieBtn, vendingPage.frescaBtn, vendingPage.tabBtn]

        // Try clicking on all the soda buttons
        for (let i = 0; i <= 3; i++) {
            sodaButtons[i].click()
            expect(vendingPage.messageTxt.getText()).toEqual('Please pay before you select a soda.')

            // Just to reset the message
            vendingPage.cancelBtn.click()
        }
    })

    it('should reset the fields and refund money on cancel', function () {
        // Clear out the content
        vendingPage.onesFld.clear()
        vendingPage.fivesFld.clear()
        vendingPage.nickelsFld.clear()
        vendingPage.dimesFld.clear()
        vendingPage.quartersFld.clear()

        var ones = 1
        var fives = 2
        var nickels = 3
        var dimes = 4
        var quarters = 5

        var totalPaid = vendingPage.calculateTotalPaid(ones, fives, nickels, dimes, quarters)

        // Enter the numbers
        vendingPage.onesFld.sendKeys(ones)
        vendingPage.fivesFld.sendKeys(fives)
        vendingPage.nickelsFld.sendKeys(nickels)
        vendingPage.dimesFld.sendKeys(dimes)
        vendingPage.quartersFld.sendKeys(quarters)

        // Verify the numbers entered
        expect(vendingPage.onesFld.getAttribute('value')).toEqual(ones.toString())
        expect(vendingPage.fivesFld.getAttribute('value')).toEqual(fives.toString())
        expect(vendingPage.nickelsFld.getAttribute('value')).toEqual(nickels.toString())
        expect(vendingPage.dimesFld.getAttribute('value')).toEqual(dimes.toString())
        expect(vendingPage.quartersFld.getAttribute('value')).toEqual(quarters.toString())

        vendingPage.cancelBtn.click()

        // Verify it was reset
        expect(vendingPage.onesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.fivesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.nickelsFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.dimesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.quartersFld.getAttribute('value')).toEqual('0')

        expect(vendingPage.messageTxt.getText()).toEqual('Transaction cancelled. $' + totalPaid + ' has been returned to the coin return.')
    })

    it('should reset the fields and refund when you gave too little', function () {
        // Clear out the content
        vendingPage.onesFld.clear()

        var ones = 1
        var fives = 0
        var nickels = 0
        var dimes = 0
        var quarters = 0

        // Enter the number
        vendingPage.onesFld.sendKeys(ones)

        var totalPaid = vendingPage.calculateTotalPaid(ones, fives, nickels, dimes, quarters)

        vendingPage.cokeBtn.click()

        // Verify it was reset
        expect(vendingPage.onesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.fivesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.nickelsFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.dimesFld.getAttribute('value')).toEqual('0')
        expect(vendingPage.quartersFld.getAttribute('value')).toEqual('0')

        expect(vendingPage.messageTxt.getText()).toEqual("You did not pay enough. $" + totalPaid + " has been returned to the coin return.")
    })

    it('should vend the soda and return change when overpaid', function () {
        var sodaButtons = [vendingPage.cokeBtn, vendingPage.moxieBtn, vendingPage.frescaBtn, vendingPage.tabBtn]
        var sodas = ["Coke", "Moxie", "Fresca", "TaB"]

        // Try clicking on all the soda buttons
        for (let i = 0; i <= 3; i++) {

            // Clear out the content
            vendingPage.onesFld.clear()
            vendingPage.fivesFld.clear()
            vendingPage.nickelsFld.clear()
            vendingPage.dimesFld.clear()
            vendingPage.quartersFld.clear()

            var ones = 1
            var fives = 2
            var nickels = 3
            var dimes = 4
            var quarters = 5

            var totalPaid = vendingPage.calculateTotalPaid(ones, fives, nickels, dimes, quarters)
            var change = totalPaid - 1.30

            // Enter the numbers
            vendingPage.onesFld.sendKeys(ones)
            vendingPage.fivesFld.sendKeys(fives)
            vendingPage.nickelsFld.sendKeys(nickels)
            vendingPage.dimesFld.sendKeys(dimes)
            vendingPage.quartersFld.sendKeys(quarters)

            // Verify the numbers entered
            expect(vendingPage.onesFld.getAttribute('value')).toEqual(ones.toString())
            expect(vendingPage.fivesFld.getAttribute('value')).toEqual(fives.toString())
            expect(vendingPage.nickelsFld.getAttribute('value')).toEqual(nickels.toString())
            expect(vendingPage.dimesFld.getAttribute('value')).toEqual(dimes.toString())
            expect(vendingPage.quartersFld.getAttribute('value')).toEqual(quarters.toString())

            sodaButtons[i].click()

            // Verify it was reset
            expect(vendingPage.onesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.fivesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.nickelsFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.dimesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.quartersFld.getAttribute('value')).toEqual('0')

            expect(vendingPage.messageTxt.getText()).toEqual(sodas[i] + " has been dispensed. $" + change.toFixed(2) + " has been returned to the coin return.")
        }
    })

    it('should vend the soda and return no change when exact amount paid', function () {
        var sodaButtons = [vendingPage.cokeBtn, vendingPage.moxieBtn, vendingPage.frescaBtn, vendingPage.tabBtn]
        var sodas = ["Coke", "Moxie", "Fresca", "TaB"]

        // Try clicking on all the soda buttons
        for (let i = 0; i <= 3; i++) {

            // Clear out the content
            vendingPage.onesFld.clear()
            vendingPage.fivesFld.clear()
            vendingPage.nickelsFld.clear()
            vendingPage.dimesFld.clear()
            vendingPage.quartersFld.clear()

            var ones = 1
            var fives = 0
            var nickels = 1
            var dimes = 0
            var quarters = 1

            // Enter the numbers
            vendingPage.onesFld.sendKeys(ones)
            vendingPage.fivesFld.sendKeys(fives)
            vendingPage.nickelsFld.sendKeys(nickels)
            vendingPage.dimesFld.sendKeys(dimes)
            vendingPage.quartersFld.sendKeys(quarters)

            // Verify the numbers entered
            expect(vendingPage.onesFld.getAttribute('value')).toEqual(ones.toString())
            expect(vendingPage.fivesFld.getAttribute('value')).toEqual(fives.toString())
            expect(vendingPage.nickelsFld.getAttribute('value')).toEqual(nickels.toString())
            expect(vendingPage.dimesFld.getAttribute('value')).toEqual(dimes.toString())
            expect(vendingPage.quartersFld.getAttribute('value')).toEqual(quarters.toString())

            sodaButtons[i].click()

            // Verify it was reset
            expect(vendingPage.onesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.fivesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.nickelsFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.dimesFld.getAttribute('value')).toEqual('0')
            expect(vendingPage.quartersFld.getAttribute('value')).toEqual('0')

            expect(vendingPage.messageTxt.getText()).toEqual(sodas[i] + " has been dispensed.")
        }
    })

    // This will fail. There is no code inplemented for this
    it('should tell you your money inserted is invalid', function () {
        var fields = [vendingPage.onesFld, vendingPage.fivesFld, vendingPage.nickelsFld, vendingPage.dimesFld, vendingPage.quartersFld]
        var values = ["a", 0.1, -1, [1, 2, 3], {name: "Jason"}, false]

        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j < values.length; j++) {

                // Clear out the content
                fields[i].clear()

                // Enter the numbers
                fields[i].sendKeys(values[j])

                // Verify the numbers entered
                expect(fields[i].getAttribute('value')).toEqual(values[j].toString())

                // Verify it was reset
                expect(fields[i].getAttribute('value')).toEqual('0')

                expect(vendingPage.messageTxt.getText()).toEqual("Invalid currency entered. Invalid currency returned.")

                // Just to reset the message
                vendingPage.cancelBtn.click()
            }
        }
    })

    // This will fail. There is no code inplemented for this
    fit('should tell you there is no more soda of that type', function () {
    })
})