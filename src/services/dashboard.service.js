
export const dashboardService = {
    getInvByLabel,
}

function getInvByLabel(labels, toys) {

    var invByLabel = labels.map(label => {
        let amount = 0
        let inStock = 0

        toys.forEach(toy => {
            var isLabel = toy.labels.some(toyLabel => toyLabel === label)
            if (isLabel) {
                amount++
                if (toy.inStock) inStock++
            }
        })
        var labelData = { amount, inStock }
        return labelData
    })
    invByLabel = invByLabel.map(data => data.inStock / data.amount || 0)

    return invByLabel
}

function getPricePerLabel(){
    return 
}